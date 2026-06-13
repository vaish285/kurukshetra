"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Flame, Clock, ArrowUpRight, Hash, Play, RefreshCw, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import PlatformBadge from "@/components/shared/PlatformBadge";

const platforms = ["All", "Instagram", "TikTok", "YouTube", "LinkedIn"];

const trends = [
  { id: 1, topic: "75 Hard Challenge", category: "Fitness", platforms: ["instagram","tiktok"], velocity: 98, views: "2.4B", growth: "+340%", age: "2 days ago", format: "Transformation reel", hook: "I did 75 Hard for 75 days — here's what nobody tells you", hashtags: ["#75Hard","#75HardChallenge","#FitnessChallenge","#MindsetChallenge"], hot: true },
  { id: 2, topic: "Quiet Luxury Aesthetic", category: "Fashion & Lifestyle", platforms: ["instagram","tiktok"], velocity: 94, views: "890M", growth: "+210%", age: "4 days ago", format: "GRWM / Outfit reel", hook: "Quiet luxury is the aesthetic that's replacing loud branding — here's how to do it", hashtags: ["#QuietLuxury","#OldMoney","#AestheticOutfit","#LuxuryLifestyle"], hot: true },
  { id: 3, topic: "AI Tools for Creators", category: "Tech & Productivity", platforms: ["youtube","linkedin","tiktok"], velocity: 91, views: "1.1B", growth: "+180%", age: "1 week ago", format: "Tutorial / List video", hook: "5 AI tools that replaced my entire content team", hashtags: ["#AITools","#ContentCreator","#AIForCreators","#ProductivityHacks"], hot: true },
  { id: 4, topic: "Gut Health & Bloating", category: "Health & Wellness", platforms: ["instagram","tiktok"], velocity: 87, views: "670M", growth: "+155%", age: "5 days ago", format: "Educational reel", hook: "Your bloating isn't random — here's exactly what's causing it", hashtags: ["#GutHealth","#Bloating","#HealthTips","#WellnessTips"], hot: false },
  { id: 5, topic: "Day in My Life — Realistic", category: "Lifestyle", platforms: ["youtube","instagram"], velocity: 83, views: "450M", growth: "+120%", age: "3 days ago", format: "Vlog / Day-in-life", hook: "A realistic day in my life — no filters, no aesthetic, just real", hashtags: ["#DayInMyLife","#RealLife","#Vlog","#LifestyleCreator"], hot: false },
  { id: 6, topic: "Salary Transparency", category: "Finance & Career", platforms: ["linkedin","tiktok"], velocity: 79, views: "320M", growth: "+98%", age: "1 week ago", format: "Talking head / Story", hook: "I'm sharing my exact salary at 26 — because nobody talks about this", hashtags: ["#SalaryTransparency","#MoneyTalk","#CareerAdvice","#FinanceTok"], hot: false },
  { id: 7, topic: "Sourdough & Home Baking", category: "Food", platforms: ["instagram","youtube"], velocity: 74, views: "280M", growth: "+87%", age: "2 weeks ago", format: "Process reel / Recipe", hook: "I baked sourdough every day for 30 days — here's what I learned", hashtags: ["#Sourdough","#HomeBaking","#BreadBaking","#FoodReels"], hot: false },
  { id: 8, topic: "Morning Routine Aesthetic", category: "Productivity & Lifestyle", platforms: ["instagram","tiktok","youtube"], velocity: 71, views: "510M", growth: "+76%", age: "ongoing", format: "GRWM / Routine reel", hook: "My 5 AM morning routine that changed my entire life", hashtags: ["#MorningRoutine","#5AMClub","#ProductiveMorning","#RoutineReel"], hot: false },
];

export default function TrendPage() {
  const [platform, setPlatform] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = trends.filter(t =>
    platform === "All" || t.platforms.some(p => p === platform.toLowerCase())
  );

  const refresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1500));
    setRefreshing(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">ChakraTrend</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">Live</span>
              </div>
              <p className="text-white/40 text-sm">Real-time viral topics, hashtags, and content formats across platforms.</p>
            </div>
          </div>
          <button onClick={refresh} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm transition-all">
            <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
            {refreshing ? "Refreshing..." : "Refresh Trends"}
          </button>
        </div>
      </motion.div>

      {/* Last updated */}
      <div className="flex items-center gap-2 mb-6 text-xs text-white/25">
        <Clock className="w-3 h-3" />
        <span>Last updated: 12 minutes ago · Data from Instagram, TikTok, YouTube, LinkedIn</span>
      </div>

      {/* Platform filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {platforms.map(p => (
          <button key={p} onClick={() => setPlatform(p)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
              platform === p ? "bg-orange-600/30 border-orange-500/50 text-orange-300" : "bg-white/5 border-white/10 text-white/40 hover:text-white/70")}>
            {p}
          </button>
        ))}
      </div>

      {/* Trend list */}
      <div className="space-y-3">
        {filtered.map((trend, i) => (
          <motion.div key={trend.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
            className="glass rounded-xl overflow-hidden">
            <button className="w-full text-left p-4 hover:bg-white/2 transition-colors" onClick={() => setExpanded(expanded === trend.id ? null : trend.id)}>
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 text-center flex-shrink-0">
                  <span className="text-lg font-bold text-white/20">#{i + 1}</span>
                </div>

                {/* Velocity bar */}
                <div className="w-1 h-10 rounded-full bg-white/5 flex-shrink-0 overflow-hidden">
                  <div className="w-full rounded-full bg-gradient-to-t from-orange-500 to-red-400 transition-all"
                    style={{ height: `${trend.velocity}%` }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-semibold text-white">{trend.topic}</span>
                    {trend.hot && (
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/20">
                        <Flame className="w-3 h-3" /> Hot
                      </span>
                    )}
                    <span className="text-xs text-white/30">{trend.category}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {trend.platforms.map(p => <PlatformBadge key={p} platform={p} />)}
                    <span className="text-xs text-white/25">{trend.age}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden md:block">
                    <div className="text-sm font-bold text-white">{trend.views}</div>
                    <div className="text-xs text-white/30">total views</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" />{trend.growth}
                    </div>
                    <div className="text-xs text-white/30">7-day growth</div>
                  </div>
                </div>
              </div>
            </button>

            {/* Expanded detail */}
            {expanded === trend.id && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-white/5 p-4 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                    <div className="text-xs font-semibold text-orange-400 mb-1.5 flex items-center gap-1"><Play className="w-3 h-3" /> Best Content Format</div>
                    <p className="text-sm text-white/70">{trend.format}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                    <div className="text-xs font-semibold text-yellow-400 mb-1.5 flex items-center gap-1"><Zap className="w-3 h-3" /> Suggested Hook</div>
                    <p className="text-sm text-white/70 italic">"{trend.hook}"</p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/3 border border-white/5">
                  <div className="text-xs font-semibold text-white/40 mb-2 flex items-center gap-1"><Hash className="w-3 h-3" /> Top Hashtags</div>
                  <div className="flex flex-wrap gap-2">
                    {trend.hashtags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20">{tag}</span>
                    ))}
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" /> Create Content on This Trend in ChakraBrain
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
