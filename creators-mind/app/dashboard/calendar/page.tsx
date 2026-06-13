"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, Zap, Plus, Check, X, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import PlatformBadge from "@/components/shared/PlatformBadge";

// ─── Smart posting schedule by content category ───────────────────────────────
const postingSchedule = [
  { category: "Fitness & Workout", emoji: "💪", bestTime: "6:00 AM", days: ["Mon", "Wed", "Fri"], reason: "Audience checks fitness content before their morning workout", color: "border-emerald-500/30 bg-emerald-500/5", tag: "text-emerald-400", score: 94 },
  { category: "Food & Recipes", emoji: "🍳", bestTime: "6:00 PM", days: ["Tue", "Thu", "Sun"], reason: "People plan dinner and browse recipes in the early evening", color: "border-orange-500/30 bg-orange-500/5", tag: "text-orange-400", score: 91 },
  { category: "Dance & Entertainment", emoji: "💃", bestTime: "8:00 PM", days: ["Fri", "Sat", "Sun"], reason: "Peak entertainment scroll time — weekend evenings", color: "border-pink-500/30 bg-pink-500/5", tag: "text-pink-400", score: 89 },
  { category: "Skincare & Beauty", emoji: "✨", bestTime: "9:00 PM", days: ["Mon", "Wed", "Fri"], reason: "Nighttime routine browsing — audience applies skincare before bed", color: "border-violet-500/30 bg-violet-500/5", tag: "text-violet-400", score: 87 },
  { category: "Productivity & Mindset", emoji: "🧠", bestTime: "7:00 AM", days: ["Mon", "Tue", "Thu"], reason: "Morning motivation — people seek inspiration before starting their day", color: "border-blue-500/30 bg-blue-500/5", tag: "text-blue-400", score: 85 },
  { category: "Travel & Lifestyle", emoji: "✈️", bestTime: "12:00 PM", days: ["Sat", "Sun"], reason: "Weekend lunch scroll — people dream about travel during downtime", color: "border-cyan-500/30 bg-cyan-500/5", tag: "text-cyan-400", score: 82 },
  { category: "Finance & Business", emoji: "💰", bestTime: "8:00 AM", days: ["Mon", "Tue", "Wed"], reason: "Morning commute — professionals consume finance content on the way to work", color: "border-yellow-500/30 bg-yellow-500/5", tag: "text-yellow-400", score: 80 },
  { category: "Fashion & Style", emoji: "👗", bestTime: "7:00 PM", days: ["Thu", "Fri", "Sat"], reason: "Pre-weekend outfit planning — audience browses fashion before going out", color: "border-rose-500/30 bg-rose-500/5", tag: "text-rose-400", score: 78 },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const scheduledPosts = [
  { id: 1, title: "Morning workout — 5 moves", platform: "instagram", score: 82, status: "published", day: 5, time: "6:00 AM", category: "Fitness & Workout" },
  { id: 2, title: "High protein meal prep", platform: "instagram", score: 91, status: "scheduled", day: 8, time: "6:00 PM", category: "Food & Recipes" },
  { id: 3, title: "Skincare routine for oily skin", platform: "instagram", score: 67, status: "draft", day: 10, time: "9:00 PM", category: "Skincare & Beauty" },
  { id: 4, title: "My 5 AM morning routine", platform: "instagram", score: 78, status: "published", day: 12, time: "7:00 AM", category: "Productivity & Mindset" },
  { id: 5, title: "Dance reel — trending audio", platform: "instagram", score: 85, status: "scheduled", day: 15, time: "8:00 PM", category: "Dance & Entertainment" },
  { id: 6, title: "Budget travel tips India", platform: "instagram", score: 73, status: "scheduled", day: 18, time: "12:00 PM", category: "Travel & Lifestyle" },
  { id: 7, title: "Full body home workout", platform: "instagram", score: 88, status: "scheduled", day: 21, time: "6:00 AM", category: "Fitness & Workout" },
];

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  published: { label: "Published", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" },
  scheduled: { label: "Scheduled", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", dot: "bg-blue-400" },
  draft: { label: "Draft", color: "text-white/40 bg-white/5 border-white/10", dot: "bg-white/30" },
};

export default function CalendarPage() {
  const [view, setView] = useState<"timeline" | "calendar">("timeline");
  const [currentMonth] = useState(4);
  const [currentYear] = useState(2026);
  const [selectedPost, setSelectedPost] = useState<typeof scheduledPosts[0] | null>(null);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const getPostsForDay = (day: number) => scheduledPosts.filter(p => p.day === day);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ChakraFlow</h1>
              <p className="text-white/40 text-sm">Smart posting schedule — right content at the right time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-white/10 overflow-hidden">
              {(["timeline", "calendar"] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  className={cn("px-3 py-1.5 text-xs font-medium capitalize transition-all",
                    view === v ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70")}>
                  {v}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Schedule Post
            </button>
          </div>
        </div>
      </motion.div>

      {view === "timeline" ? (
        <div className="space-y-6">
          {/* AI Schedule Banner */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass rounded-xl p-4 border-l-2 border-blue-500 flex items-start gap-3">
            <Clock className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white/80 font-medium mb-1">AI-Optimised Posting Schedule</p>
              <p className="text-xs text-white/40">Based on your audience activity data and platform algorithm patterns. Post at these exact times for maximum reach.</p>
            </div>
          </motion.div>

          {/* Category schedule grid */}
          <div>
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Best Time by Content Category</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {postingSchedule.map((item, i) => (
                <motion.div key={item.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className={cn("rounded-xl p-4 border", item.color)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <div>
                        <div className="text-sm font-semibold text-white">{item.category}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {item.days.map(d => (
                            <span key={d} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-white/40">{d}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={cn("text-lg font-bold", item.tag)}>{item.bestTime}</div>
                      <div className="text-xs text-white/25">{item.score}% reach score</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Info className="w-3 h-3 text-white/20 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-white/35 leading-relaxed">{item.reason}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming scheduled posts */}
          <div>
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Upcoming Posts</h2>
            <div className="space-y-2">
              {scheduledPosts.filter(p => p.status !== "published").map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedPost(post)}>
                  <div className="text-center w-10 flex-shrink-0">
                    <div className="text-lg font-bold text-white">{post.day}</div>
                    <div className="text-xs text-white/30">May</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate mb-1">{post.title}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <PlatformBadge platform={post.platform} />
                      <span className="text-xs text-white/30 flex items-center gap-1"><Clock className="w-3 h-3" />{post.time}</span>
                      <span className="text-xs text-white/20">{post.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                      post.score >= 80 ? "bg-emerald-500/20 text-emerald-400" : post.score >= 70 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400")}>
                      {post.score}
                    </div>
                    <span className={cn("text-xs px-2 py-0.5 rounded-full border", statusConfig[post.status].color)}>
                      {statusConfig[post.status].label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Calendar view */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">{MONTHS[currentMonth]} {currentYear}</h2>
          </div>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="grid grid-cols-7 border-b border-white/5">
              {DAYS.map(d => <div key={d} className="py-3 text-center text-xs font-medium text-white/30">{d}</div>)}
            </div>
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} className="min-h-20 border-b border-r border-white/5 bg-white/1" />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayPosts = getPostsForDay(day);
                const isToday = day === 21;
                return (
                  <div key={day} className={cn("min-h-20 border-b border-r border-white/5 p-2 hover:bg-white/2 transition-colors", isToday && "bg-violet-500/5")}>
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1", isToday ? "bg-violet-600 text-white font-bold" : "text-white/40")}>{day}</div>
                    <div className="space-y-1">
                      {dayPosts.slice(0, 2).map(post => (
                        <button key={post.id} onClick={() => setSelectedPost(post)} className="w-full text-left">
                          <div className={cn("text-xs px-1.5 py-1 rounded-md truncate flex items-center gap-1",
                            post.status === "published" ? "bg-emerald-500/15 text-emerald-300" :
                            post.status === "scheduled" ? "bg-blue-500/15 text-blue-300" : "bg-white/5 text-white/40")}>
                            <span className={cn("w-1 h-1 rounded-full flex-shrink-0", statusConfig[post.status].dot)} />
                            <span className="truncate">{post.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Post modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPost(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white mb-1">{selectedPost.title}</h3>
                <div className="flex items-center gap-2">
                  <PlatformBadge platform={selectedPost.platform} />
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border", statusConfig[selectedPost.status].color)}>{statusConfig[selectedPost.status].label}</span>
                </div>
              </div>
              <button onClick={() => setSelectedPost(null)} className="text-white/30 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 mb-4">
              {[
                { label: "Scheduled Time", value: `May ${selectedPost.day}, 2026 · ${selectedPost.time}` },
                { label: "Category", value: selectedPost.category },
                { label: "AI Suggested", value: "✓ Optimal engagement window" },
                { label: "ChakraScore", value: `${selectedPost.score}/100` },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-white/3">
                  <span className="text-xs text-white/40">{item.label}</span>
                  <span className="text-sm text-white">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-colors">Reschedule</button>
              <button className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">Edit Post</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
