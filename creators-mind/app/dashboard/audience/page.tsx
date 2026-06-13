"use client";

import { motion } from "framer-motion";
import { PieChart, Clock, Heart, Users, TrendingUp, MapPin, Smartphone } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { cn } from "@/lib/utils";

const ageData = [
  { group: "13–17", pct: 8 }, { group: "18–24", pct: 34 }, { group: "25–34", pct: 31 },
  { group: "35–44", pct: 16 }, { group: "45–54", pct: 8 }, { group: "55+", pct: 3 },
];
const activeHours = [
  { hour: "6AM", score: 30 }, { hour: "9AM", score: 55 }, { hour: "12PM", score: 70 },
  { hour: "3PM", score: 60 }, { hour: "6PM", score: 95 }, { hour: "9PM", score: 88 }, { hour: "12AM", score: 40 },
];
const interestData = [
  { subject: "Fitness", A: 85 }, { subject: "Food", A: 72 }, { subject: "Travel", A: 68 },
  { subject: "Tech", A: 60 }, { subject: "Finance", A: 55 }, { subject: "Fashion", A: 78 },
];
const topLocations = [
  { city: "Mumbai", pct: 18 }, { city: "Delhi", pct: 15 }, { city: "Bangalore", pct: 13 },
  { city: "Hyderabad", pct: 9 }, { city: "Chennai", pct: 7 }, { city: "Others", pct: 38 },
];
const COLORS = ["#7c3aed","#a855f7","#ec4899","#3b82f6","#10b981","#f59e0b"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) return (
    <div className="glass rounded-lg px-3 py-2 border border-white/10 text-xs">
      <p className="text-white/50 mb-1">{label}</p>
      <p className="text-white font-medium">{payload[0].value}{payload[0].name === "score" ? "%" : "%"}</p>
    </div>
  );
  return null;
};

export default function AudiencePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
            <PieChart className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraAudience</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/20">Audience Intel</span>
        </div>
        <p className="text-white/40 text-sm ml-12">Deep analysis of your audience — who they are, when they're active, what they care about.</p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Audience", value: "48.2K", sub: "across all platforms", icon: Users, color: "text-violet-400", bg: "bg-violet-500/10" },
          { label: "Avg Engagement", value: "7.4%", sub: "+1.2% this month", icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10" },
          { label: "Peak Active Time", value: "6–9 PM", sub: "weekdays", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Top Age Group", value: "18–34", sub: "65% of your audience", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
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
        {/* Active hours */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white/70">When Your Audience is Most Active</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={activeHours}>
              <XAxis dataKey="hour" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                {activeHours.map((entry, i) => (
                  <Cell key={i} fill={entry.score >= 90 ? "#7c3aed" : entry.score >= 70 ? "#a855f7" : "#3b82f6"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-white/30 mt-2 text-center">Best time to post: <span className="text-violet-400 font-semibold">6–9 PM weekdays</span></p>
        </motion.div>

        {/* Interests radar */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-pink-400" />
            <h3 className="text-sm font-semibold text-white/70">Audience Interests</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={interestData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} />
              <Radar name="Interest" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Age breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-white/70">Age Distribution</h3>
          </div>
          <div className="space-y-3">
            {ageData.map((a, i) => (
              <div key={a.group} className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-12">{a.group}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${a.pct}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.8 }}
                    className="h-full rounded-full" style={{ background: COLORS[i] }} />
                </div>
                <span className="text-xs font-semibold text-white/60 w-8 text-right">{a.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top locations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white/70">Top Locations</h3>
          </div>
          <div className="space-y-3">
            {topLocations.map((l, i) => (
              <div key={l.city} className="flex items-center gap-3">
                <span className="text-xs text-white/40 w-20">{l.city}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${l.pct * 2}%` }} transition={{ delay: 0.4 + i * 0.05, duration: 0.8 }}
                    className="h-full rounded-full bg-emerald-500" />
                </div>
                <span className="text-xs font-semibold text-white/60 w-8 text-right">{l.pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insight */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6 glass rounded-xl p-4 border-l-2 border-rose-500">
        <div className="flex items-start gap-3">
          <Smartphone className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-rose-400 mb-1">ChakraAudience Insight</div>
            <p className="text-sm text-white/60">Your audience is <span className="text-white font-medium">65% aged 18–34</span>, most active on <span className="text-white font-medium">weekday evenings (6–9 PM)</span>, and most interested in <span className="text-white font-medium">Fitness and Fashion</span>. Post fitness content on Tuesday and Thursday evenings for maximum reach.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
