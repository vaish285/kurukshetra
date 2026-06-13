"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Eye, Heart, MessageCircle, Share2, Clock, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { cn } from "@/lib/utils";
import PlatformBadge from "@/components/shared/PlatformBadge";

const timeRanges = ["7 days", "30 days", "90 days", "All time"];

const viewsData = [
  { day: "May 1", views: 3200 }, { day: "May 5", views: 4800 }, { day: "May 8", views: 3900 },
  { day: "May 10", views: 6200 }, { day: "May 12", views: 5100 }, { day: "May 15", views: 8400 },
  { day: "May 18", views: 7200 }, { day: "May 21", views: 9800 },
];

const engagementData = [
  { day: "Mon", rate: 4.2 }, { day: "Tue", rate: 6.8 }, { day: "Wed", rate: 5.1 },
  { day: "Thu", rate: 7.3 }, { day: "Fri", rate: 5.9 }, { day: "Sat", rate: 4.4 }, { day: "Sun", rate: 3.8 },
];

const topPosts = [
  {
    title: "How I Grew 10K Followers in 30 Days",
    platform: "instagram",
    views: "18.4K",
    likes: "2.1K",
    comments: "342",
    watchTime: "—",
    insight: "Your question-format hook drove 4.1× more saves than your average post. The 'How I...' format consistently outperforms for your audience.",
    nextStep: "Use 'How I...' hooks for your next 3 Instagram posts and track the save rate.",
    delta: "+124%",
    positive: true,
  },
  {
    title: "5 AI Tools That Changed My Workflow",
    platform: "youtube",
    views: "12.4K",
    likes: "891",
    comments: "156",
    watchTime: "4m 32s",
    insight: "This video had your highest average watch time this month. The listicle format with numbered sections kept viewers watching 40% longer than your usual content.",
    nextStep: "Create a follow-up listicle — 'Top 5 AI Tools for [specific niche]' — within the next 7 days while the topic is trending.",
    delta: "+67%",
    positive: true,
  },
  {
    title: "Morning Routine for Creators",
    platform: "youtube",
    views: "8.1K",
    likes: "612",
    comments: "89",
    watchTime: "3m 12s",
    insight: "Views were 23% below your average for YouTube. The hook didn't create a strong curiosity gap — viewers dropped off in the first 15 seconds at a higher rate than usual.",
    nextStep: "Rewrite your next video hook as a question or bold claim. Your question-hooks average 2.8× more watch time.",
    delta: "-23%",
    positive: false,
  },
];

const patterns = [
  { type: "Hook Style", value: "Question format", lift: "+3.2×", color: "text-violet-400", bg: "bg-violet-500/10" },
  { type: "Best Day", value: "Tuesday", lift: "+2.4×", color: "text-blue-400", bg: "bg-blue-500/10" },
  { type: "Content Format", value: "Listicle (Top 5)", lift: "+1.8×", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { type: "Best Time", value: "6:30 PM", lift: "+2.1×", color: "text-yellow-400", bg: "bg-yellow-500/10" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-lg px-3 py-2 border border-white/10 text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-white font-medium">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30 days");
  const [expandedPost, setExpandedPost] = useState<number | null>(0);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ChakraLens</h1>
              <p className="text-white/40 text-sm">Plain-language explanations of what's working and why</p>
            </div>
          </div>
          <div className="flex rounded-lg border border-white/10 overflow-hidden">
            {timeRanges.map(r => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-all",
                  timeRange === r ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Views", value: "48.2K", change: "+23%", icon: Eye, positive: true },
          { label: "Total Likes", value: "4.6K", change: "+18%", icon: Heart, positive: true },
          { label: "Comments", value: "587", change: "+31%", icon: MessageCircle, positive: true },
          { label: "Avg Watch Time", value: "3m 52s", change: "-4%", icon: Clock, positive: false },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/40">{stat.label}</span>
              <stat.icon className="w-3.5 h-3.5 text-white/20" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className={cn("text-xs flex items-center gap-1", stat.positive ? "text-emerald-400" : "text-red-400")}>
              {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {stat.change} vs last period
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Views Over Time</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={viewsData}>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="views" stroke="#7c3aed" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Engagement Rate by Day</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={engagementData}>
              <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Creator Patterns */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-white/70">Your Top-Performing Patterns</h3>
          <span className="text-xs text-white/25 ml-auto">Auto-applied to Content Brain</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {patterns.map(p => (
            <div key={p.type} className={cn("rounded-lg p-3 border border-white/5", p.bg)}>
              <div className="text-xs text-white/40 mb-1">{p.type}</div>
              <div className="text-sm font-semibold text-white mb-1">{p.value}</div>
              <div className={cn("text-xs font-bold", p.color)}>{p.lift} engagement</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Post Insights */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Top Posts — Plain Language Insights</h2>
        <div className="space-y-3">
          {topPosts.map((post, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center gap-4 p-4 hover:bg-white/2 transition-colors text-left"
                onClick={() => setExpandedPost(expandedPost === i ? null : i)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-medium text-white truncate">{post.title}</span>
                    <PlatformBadge platform={post.platform} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{post.comments}</span>
                    {post.watchTime !== "—" && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.watchTime}</span>}
                  </div>
                </div>
                <div className={cn("text-sm font-bold flex items-center gap-1 flex-shrink-0", post.positive ? "text-emerald-400" : "text-red-400")}>
                  {post.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {post.delta}
                </div>
              </button>

              {expandedPost === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="border-t border-white/5 p-4 space-y-3"
                >
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/3">
                    <BarChart3 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-white/50 mb-1">Why it performed this way</div>
                      <p className="text-sm text-white/70 leading-relaxed">{post.insight}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-violet-500/5 border border-violet-500/15">
                    <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-semibold text-violet-400 mb-1">Next Step</div>
                      <p className="text-sm text-white/70 leading-relaxed">{post.nextStep}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
