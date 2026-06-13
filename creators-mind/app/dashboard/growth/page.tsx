"use client";

import { motion } from "framer-motion";
import { LineChart as LineChartIcon, TrendingUp, Target, Calendar, Flame, Award, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";

const followerGrowth = [
  { month: "Dec", followers: 28000 }, { month: "Jan", followers: 31000 }, { month: "Feb", followers: 34500 },
  { month: "Mar", followers: 38000 }, { month: "Apr", followers: 43000 }, { month: "May", followers: 48200 },
];
const consistencyData = [
  { week: "W1", posts: 4 }, { week: "W2", posts: 5 }, { week: "W3", posts: 3 },
  { week: "W4", posts: 5 }, { week: "W5", posts: 4 }, { week: "W6", posts: 5 },
  { week: "W7", posts: 2 }, { week: "W8", posts: 5 },
];
const milestones = [
  { label: "First 1K followers", date: "Aug 2023", done: true },
  { label: "First viral post (100K+ views)", date: "Oct 2023", done: true },
  { label: "10K followers", date: "Dec 2023", done: true },
  { label: "First brand deal", date: "Feb 2024", done: true },
  { label: "50K followers", date: "Jun 2024 (projected)", done: false },
  { label: "100K followers", date: "Dec 2024 (projected)", done: false },
];
const weeklyGoals = [
  { goal: "Post 5 times this week", done: true, progress: 5, target: 5 },
  { goal: "Reply to 20 comments", done: false, progress: 14, target: 20 },
  { goal: "Try 1 new content format", done: true, progress: 1, target: 1 },
  { goal: "Analyse last week's top post", done: false, progress: 0, target: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) return (
    <div className="glass rounded-lg px-3 py-2 border border-white/10 text-xs">
      <p className="text-white/50 mb-1">{label}</p>
      <p className="text-white font-medium">{typeof payload[0].value === "number" && payload[0].value > 1000 ? `${(payload[0].value / 1000).toFixed(1)}K` : payload[0].value}</p>
    </div>
  );
  return null;
};

export default function GrowthPage() {
  const streak = 14;
  const nextMilestone = milestones.find(m => !m.done);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center">
            <LineChartIcon className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraGrowth</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-lime-500/15 text-lime-400 border border-lime-500/20">Growth AI</span>
        </div>
        <p className="text-white/40 text-sm ml-12">Your personal AI growth assistant — consistency tracking, performance trends, and long-term audience growth.</p>
      </motion.div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Current Streak", value: `${streak} days`, sub: "Keep going!", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
          { label: "Followers (30d)", value: "+5,200", sub: "+12% growth", icon: TrendingUp, color: "text-lime-400", bg: "bg-lime-500/10" },
          { label: "Next Milestone", value: "50K", sub: "1,800 away", icon: Target, color: "text-violet-400", bg: "bg-violet-500/10" },
          { label: "Posts This Month", value: "18", sub: "Goal: 20", icon: Calendar, color: "text-blue-400", bg: "bg-blue-500/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/40">{s.label}</span>
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", s.bg)}>
                <s.icon className={cn("w-3.5 h-3.5", s.color)} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-xs text-white/30">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Follower growth chart */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Follower Growth — 6 Months</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={followerGrowth}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="followers" stroke="#84cc16" strokeWidth={2} fill="url(#growthGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Consistency chart */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Posting Consistency — Last 8 Weeks</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={consistencyData}>
              <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 7]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="posts" stroke="#7c3aed" strokeWidth={2} dot={{ fill: "#7c3aed", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-white/25 text-center mt-2">Target: 5 posts/week · Avg: 4.1/week</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly goals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-lime-400" /> This Week's Goals
          </h3>
          <div className="space-y-3">
            {weeklyGoals.map((g, i) => (
              <div key={i} className="flex items-center gap-3">
                {g.done ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <Clock className="w-4 h-4 text-white/20 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn("text-xs font-medium", g.done ? "text-white/60 line-through" : "text-white/80")}>{g.goal}</span>
                    <span className="text-xs text-white/30">{g.progress}/{g.target}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", g.done ? "bg-emerald-500" : "bg-violet-500")}
                      style={{ width: `${(g.progress / g.target) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Creator Milestones
          </h3>
          <div className="space-y-3">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", m.done ? "bg-emerald-400" : "bg-white/15")} />
                <div className="flex-1">
                  <span className={cn("text-sm", m.done ? "text-white/60" : "text-white font-medium")}>{m.label}</span>
                </div>
                <span className={cn("text-xs flex-shrink-0", m.done ? "text-white/25" : "text-lime-400")}>{m.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Growth Tip */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 glass rounded-xl p-4 border-l-2 border-lime-500">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-lime-400 mb-1">ChakraGrowth Recommendation</div>
            <p className="text-sm text-white/60">You're <span className="text-white font-medium">1,800 followers away from 50K</span>. At your current growth rate of +1,200/week, you'll hit it in <span className="text-white font-medium">~2 weeks</span>. Post your best-performing format (question-hook reels) 3x this week to accelerate. Your Tuesday 6 PM slot has the highest reach — don't miss it.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
