# Creators Mind — Technical Design Document

## 1. System Overview

Creators Mind is a web-based SaaS platform built on a modern full-stack architecture. The system is composed of a React frontend, a Node.js/Express API layer, a PostgreSQL relational database, and a set of AI/ML microservices. All four features (AI Content Brain, Smart Content Calendar, Analytics & Insight Dashboard, Predictive Virality Score) are served from a single unified dashboard.

---

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│              React + TypeScript (Next.js App Router)        │
│   Dashboard │ Content Brain │ Calendar │ Analytics │ Score  │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / REST + WebSocket
┌──────────────────────────▼──────────────────────────────────┐
│                       API GATEWAY                           │
│              Node.js + Express (REST API)                   │
│         Auth Middleware │ Rate Limiting │ Logging           │
└───┬──────────┬──────────┬──────────────┬────────────────────┘
    │          │          │              │
┌───▼───┐ ┌───▼───┐ ┌────▼────┐ ┌──────▼──────┐
│Content│ │Sched- │ │Analytics│ │  Virality   │
│ Brain │ │ uler  │ │ Service │ │Score Service│
│Service│ │Service│ │         │ │             │
└───┬───┘ └───┬───┘ └────┬────┘ └──────┬──────┘
    │          │          │              │
┌───▼──────────▼──────────▼──────────────▼──────┐
│                  DATA LAYER                    │
│   PostgreSQL (primary) │ Redis (cache/queue)   │
└───────────────────────────────────────────────┘
    │                          │
┌───▼──────────┐    ┌──────────▼──────────────────┐
│  OpenAI API  │    │  Social Platform APIs        │
│  (GPT-4o)    │    │  YouTube │ Instagram │ TikTok│
└──────────────┘    │  LinkedIn                    │
                    └─────────────────────────────┘
```

---

## 3. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript | SSR, file-based routing, performance |
| Styling | Tailwind CSS + shadcn/ui | Rapid UI, consistent design system |
| State Management | Zustand + React Query (TanStack) | Lightweight global state + server state caching |
| Backend API | Node.js + Express + TypeScript | Familiar, fast, large ecosystem |
| Database | PostgreSQL (via Prisma ORM) | Relational data, strong typing with Prisma |
| Cache / Queue | Redis (Upstash) | Job queues for scheduling, caching AI responses |
| AI / LLM | OpenAI GPT-4o API | Content generation, insight summaries, fix suggestions |
| Job Scheduler | BullMQ (Redis-backed) | Reliable post scheduling and publishing jobs |
| Auth | NextAuth.js (JWT + OAuth 2.0) | Google SSO + email/password, social OAuth |
| File Storage | AWS S3 | Thumbnail assets, content kit exports |
| Hosting | Vercel (frontend) + Railway (backend) | Fast deploys, managed infra |
| Monitoring | Sentry + Vercel Analytics | Error tracking, performance monitoring |

---

## 4. Database Schema

### Users
```sql
users
  id            UUID PRIMARY KEY
  email         VARCHAR UNIQUE NOT NULL
  name          VARCHAR
  avatar_url    VARCHAR
  created_at    TIMESTAMP
  updated_at    TIMESTAMP
```

### Platform Connections
```sql
platform_connections
  id              UUID PRIMARY KEY
  user_id         UUID REFERENCES users(id)
  platform        ENUM('youtube','instagram','tiktok','linkedin')
  access_token    TEXT (encrypted)
  refresh_token   TEXT (encrypted)
  token_expires   TIMESTAMP
  platform_user_id VARCHAR
  connected_at    TIMESTAMP
```

### Content Kits (AI Content Brain output)
```sql
content_kits
  id              UUID PRIMARY KEY
  user_id         UUID REFERENCES users(id)
  topic           TEXT NOT NULL
  platform        ENUM('youtube','instagram','tiktok','linkedin')
  hook            TEXT
  script          TEXT
  caption_short   TEXT
  caption_long    TEXT
  hashtags        TEXT[]
  thumbnail_texts TEXT[]
  created_at      TIMESTAMP
```

### Posts (Smart Content Calendar)
```sql
posts
  id                UUID PRIMARY KEY
  user_id           UUID REFERENCES users(id)
  content_kit_id    UUID REFERENCES content_kits(id)
  platforms         ENUM[] (array of target platforms)
  status            ENUM('draft','scheduled','published','failed')
  scheduled_at      TIMESTAMP
  published_at      TIMESTAMP
  ai_suggested_time TIMESTAMP
  virality_score    INTEGER
  created_at        TIMESTAMP
  updated_at        TIMESTAMP
```

### Post Metrics (Analytics)
```sql
post_metrics
  id              UUID PRIMARY KEY
  post_id         UUID REFERENCES posts(id)
  platform        ENUM
  views           INTEGER
  likes           INTEGER
  comments        INTEGER
  shares          INTEGER
  watch_time_sec  INTEGER
  ctr             DECIMAL
  follower_change INTEGER
  collected_at    TIMESTAMP
```

### Insights
```sql
insights
  id              UUID PRIMARY KEY
  post_id         UUID REFERENCES posts(id)
  user_id         UUID REFERENCES users(id)
  summary         TEXT        -- plain-language explanation
  next_step       TEXT        -- one actionable recommendation
  pattern_tags    TEXT[]      -- e.g. ['question-hook', 'tuesday-post']
  generated_at    TIMESTAMP
```

### Creator Patterns
```sql
creator_patterns
  id              UUID PRIMARY KEY
  user_id         UUID REFERENCES users(id)
  pattern_type    VARCHAR     -- 'hook_style', 'post_day', 'content_format', 'topic'
  pattern_value   VARCHAR     -- e.g. 'question-hook', 'tuesday', 'listicle'
  avg_views       INTEGER
  avg_engagement  DECIMAL
  sample_count    INTEGER
  updated_at      TIMESTAMP
```

### Virality Score History
```sql
virality_score_history
  id                UUID PRIMARY KEY
  post_id           UUID REFERENCES posts(id)
  score             INTEGER
  hook_score        INTEGER
  trend_score       INTEGER
  pattern_score     INTEGER
  fix_suggestion    TEXT
  scored_at         TIMESTAMP
```

---

## 5. Feature Technical Design

### 5.1 AI Content Brain

**Flow:**
1. User submits topic + platform selection via `POST /api/content/generate`
2. API validates input, fetches creator's top patterns from `creator_patterns` table
3. Constructs a structured prompt injecting: topic, platform, creator's top patterns
4. Calls OpenAI GPT-4o with a JSON-mode response schema
5. Streams response back to frontend via Server-Sent Events (SSE) for real-time feel
6. Saves completed content kit to `content_kits` table
7. Creates a `draft` post in `posts` table linked to the content kit

**Prompt Structure:**
```
System: You are a viral content strategist for {platform}. 
        This creator's top-performing patterns: {creator_patterns}.
        Always respond in valid JSON matching the ContentKit schema.

User: Generate a complete content kit for the topic: "{topic}"
```

**ContentKit JSON Schema (OpenAI response_format):**
```json
{
  "hook": "string",
  "script": { "intro": "string", "body": "string", "cta": "string" },
  "caption_short": "string",
  "caption_long": "string",
  "hashtags": ["string"],
  "thumbnail_texts": ["string", "string", "string"]
}
```

**Regenerate Single Element:**
- `POST /api/content/regenerate` with `{ kit_id, element: 'hook' | 'script' | ... }`
- Only re-prompts for the specific element, preserves rest of kit in DB

**API Endpoints:**
```
POST   /api/content/generate          → generate full content kit
POST   /api/content/regenerate        → regenerate single element
GET    /api/content/history           → list user's content kits
GET    /api/content/:id               → get single content kit
PATCH  /api/content/:id               → update (inline edit)
```

---

### 5.2 Smart Content Calendar

**Scheduling Flow:**
1. Draft post arrives from Content Brain (status: `draft`)
2. `POST /api/calendar/suggest-time` analyzes audience activity data
3. Returns AI-suggested time; user accepts or overrides
4. `POST /api/calendar/schedule` sets `scheduled_at`, status → `scheduled`
5. BullMQ job is created with a delay until `scheduled_at`
6. At publish time, job calls the relevant platform API
7. On success: status → `published`, triggers analytics data collection job
8. On failure: status → `failed`, sends notification, retries up to 3×

**Optimal Time Algorithm:**
```
1. Fetch last 90 days of post_metrics for this user + platform
2. Group by hour-of-day and day-of-week
3. Calculate average engagement rate per slot
4. Return top 3 slots ranked by engagement rate
5. If < 10 posts exist → fall back to platform best-practice defaults
```

**BullMQ Job Structure:**
```typescript
interface PublishJob {
  postId: string;
  platforms: Platform[];
  contentKitId: string;
  scheduledAt: Date;
}
```

**Platform API Abstraction:**
```typescript
interface PlatformPublisher {
  publish(post: Post, credentials: PlatformConnection): Promise<PublishResult>
}

// Implementations: YouTubePublisher, InstagramPublisher, TikTokPublisher, LinkedInPublisher
```

**API Endpoints:**
```
GET    /api/calendar/posts            → list all posts (with filters)
POST   /api/calendar/suggest-time     → get AI-suggested posting time
POST   /api/calendar/schedule         → schedule a post
PATCH  /api/calendar/posts/:id        → reschedule / edit post
DELETE /api/calendar/posts/:id        → delete scheduled post
GET    /api/calendar/queue            → view content queue
```

---

### 5.3 Analytics & Insight Dashboard

**Data Collection Flow:**
1. After publish confirmation, a BullMQ job is queued to collect metrics
2. Job runs immediately, then again at +1h, +6h, +24h, +7d intervals
3. Metrics fetched from platform APIs and stored in `post_metrics`
4. After each collection, insight generation is triggered

**Insight Generation:**
1. Fetch post metrics + creator's historical average metrics
2. Calculate performance delta (e.g. this post's watch time vs. creator average)
3. Identify which signal drove the delta (hook style, post day, topic, format)
4. Call GPT-4o to generate plain-language summary + next step
5. Store in `insights` table

**Insight Prompt:**
```
System: You are a data analyst for content creators. 
        Be concise, specific, and actionable. Max 2 sentences for summary, 1 for next step.

User: Post metrics: {metrics}
      Creator average: {averages}
      Top performing pattern detected: {pattern}
      Generate a plain-language insight and one next step.
```

**Pattern Detection:**
- After every 5 new posts, re-run pattern analysis
- Update `creator_patterns` table with latest averages
- Patterns feed into Content Brain prompt context and Virality Score

**API Endpoints:**
```
GET    /api/analytics/overview        → summary stats for dashboard header
GET    /api/analytics/posts           → paginated post list with metrics
GET    /api/analytics/posts/:id       → single post metrics + insight
GET    /api/analytics/trends          → time-series data for charts
GET    /api/analytics/top-posts       → top 3 posts for time range
GET    /api/analytics/patterns        → creator's identified patterns
```

---

### 5.4 Predictive Virality Score

**Scoring Flow:**
1. User requests score via `POST /api/virality/score`
2. System fetches: draft content, creator patterns, current trending topics
3. Three sub-scores calculated in parallel:
   - **Hook Score (0–40):** GPT-4o evaluates hook against engagement principles
   - **Trend Score (0–30):** Keyword/topic match against platform trending data (cached, refreshed every 6h)
   - **Pattern Score (0–30):** Similarity of this content to creator's top-performing patterns
4. Total score = hook_score + trend_score + pattern_score
5. If total < 70: GPT-4o generates one specific fix suggestion targeting the lowest sub-score
6. Result stored in `virality_score_history`
7. Score badge updated on calendar card via WebSocket push

**Hook Scoring Prompt:**
```
System: You are a viral content expert. Score this hook from 0-40 based on:
        - Curiosity gap (0-15)
        - Emotional trigger (0-15)  
        - Clarity and specificity (0-10)
        Return JSON: { score: number, reasoning: string }

User: Hook: "{hook}" | Platform: {platform}
```

**Fix Suggestion Prompt (triggered if score < 70):**
```
System: Give ONE specific, actionable rewrite suggestion for the weakest element.
        Reference the creator's data: {creator_patterns}
        Be specific — include an example rewrite. Max 2 sentences.

User: Lowest scoring element: {element} | Current content: {content} | Score breakdown: {breakdown}
```

**Trend Data Pipeline:**
- Cron job runs every 6 hours per platform
- Fetches trending topics/hashtags from platform APIs
- Stores in Redis with 24h TTL
- Used as lookup during scoring

**API Endpoints:**
```
POST   /api/virality/score            → score a draft post
GET    /api/virality/score/:postId    → get latest score for a post
GET    /api/virality/history/:postId  → get score history (all versions)
```

---

## 6. Authentication & Authorization

- **Auth Provider:** NextAuth.js
- **Strategies:** Email/password (bcrypt hashed) + Google OAuth 2.0
- **Session:** JWT stored in httpOnly cookie (7-day expiry)
- **Social Platform OAuth:** Separate OAuth 2.0 flow per platform, tokens stored encrypted in `platform_connections`
- **Middleware:** All `/api/*` routes protected by auth middleware; users can only access their own data (row-level filtering by `user_id`)

---

## 7. Real-Time Updates

- **WebSocket (Socket.io):** Used for:
  - Streaming content generation progress (Content Brain)
  - Live virality score updates on calendar cards
  - Publish success/failure notifications
- **Server-Sent Events (SSE):** Used for streaming AI text generation token-by-token

---

## 8. Frontend Component Architecture

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── signup/page.tsx
├── dashboard/
│   ├── layout.tsx              ← Sidebar + nav shell
│   ├── page.tsx                ← Overview / home
│   ├── brain/
│   │   └── page.tsx            ← AI Content Brain
│   ├── calendar/
│   │   └── page.tsx            ← Smart Content Calendar
│   ├── analytics/
│   │   └── page.tsx            ← Analytics Dashboard
│   └── settings/
│       └── page.tsx            ← Platform connections, profile
│
components/
├── brain/
│   ├── TopicInput.tsx
│   ├── ContentKitCard.tsx
│   ├── HookCard.tsx
│   ├── ScriptEditor.tsx
│   └── HashtagCloud.tsx
├── calendar/
│   ├── CalendarGrid.tsx
│   ├── PostCard.tsx            ← Shows virality score badge
│   ├── ScheduleModal.tsx
│   └── TimeSlotPicker.tsx
├── analytics/
│   ├── MetricsSummary.tsx
│   ├── InsightCard.tsx
│   ├── TrendChart.tsx
│   └── TopPostsList.tsx
├── virality/
│   ├── ScoreGauge.tsx
│   ├── ScoreBreakdown.tsx
│   └── FixSuggestion.tsx
└── shared/
    ├── Sidebar.tsx
    ├── Notification.tsx
    └── PlatformBadge.tsx
```

---

## 9. API Error Handling

All API responses follow a consistent envelope:

```typescript
// Success
{ success: true, data: T }

// Error
{ success: false, error: { code: string, message: string } }
```

Standard error codes:
- `VALIDATION_ERROR` — invalid input
- `AUTH_REQUIRED` — unauthenticated
- `NOT_FOUND` — resource doesn't exist
- `PLATFORM_API_ERROR` — upstream platform API failure
- `AI_TIMEOUT` — LLM response exceeded time limit
- `RATE_LIMITED` — user hit usage limits

---

## 10. Environment Variables

```env
# App
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Database
DATABASE_URL=

# Redis
REDIS_URL=

# OpenAI
OPENAI_API_KEY=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Platform APIs
YOUTUBE_CLIENT_ID=
YOUTUBE_CLIENT_SECRET=
INSTAGRAM_APP_ID=
INSTAGRAM_APP_SECRET=
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```

---

## 11. Deployment Architecture

```
Vercel (Frontend - Next.js)
    └── Edge Network CDN
    └── Serverless API Routes (auth, lightweight endpoints)

Railway (Backend Services)
    └── Express API Server
    └── BullMQ Worker (scheduling jobs)
    └── PostgreSQL (managed)
    └── Redis (Upstash managed)

AWS S3
    └── Static assets, thumbnails, exports
```

---

## 12. Cross-Feature Data Flow Summary

```
[User types topic]
      │
      ▼
[AI Content Brain] ──generates──► [ContentKit saved to DB]
      │                                      │
      │                              [Draft Post created]
      │                                      │
      ▼                                      ▼
[Creator Patterns]              [Smart Content Calendar]
  (personalize)                   │ suggest optimal time
      ▲                           │ schedule post
      │                           │ auto-publish
      │                           ▼
      │                    [Post Published]
      │                           │
      │                           ▼
      │                  [Metrics Collected]
      │                           │
      │                           ▼
      └──────────────[Analytics & Insight Dashboard]
                              │ identify patterns
                              │ generate insights
                              ▼
                     [Creator Patterns updated]
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
            [Content Brain]    [Virality Score]
            (personalized)     (pattern signal)
```
