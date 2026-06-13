"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Star, TrendingUp, Heart, MessageCircle, ExternalLink, Filter, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import PlatformBadge from "@/components/shared/PlatformBadge";

const creators = [
  { id: 1, name: "Priya Sharma", handle: "@priyacreates", avatar: "PS", niche: "Fitness & Wellness", platforms: ["instagram","youtube"], followers: "84K", engagement: "6.2%", matchScore: 96, style: "Educational, motivational", collab: "Workout challenges, product reviews", mutual: 3, verified: true, color: "from-pink-500 to-rose-600" },
  { id: 2, name: "Arjun Mehta", handle: "@arjuntalks", avatar: "AM", niche: "Personal Finance", platforms: ["youtube","linkedin"], followers: "120K", engagement: "4.8%", matchScore: 91, style: "Data-driven, analytical", collab: "Finance tips, investment guides", mutual: 1, verified: true, color: "from-blue-500 to-indigo-600" },
  { id: 3, name: "Sneha Kapoor", handle: "@snehavibes", avatar: "SK", niche: "Dance & Lifestyle", platforms: ["instagram","tiktok"], followers: "210K", engagement: "8.1%", matchScore: 88, style: "Energetic, trendy", collab: "Dance collabs, lifestyle vlogs", mutual: 5, verified: false, color: "from-violet-500 to-purple-600" },
  { id: 4, name: "Rohan Das", handle: "@rohanbuilds", avatar: "RD", niche: "Tech & Startups", platforms: ["youtube","linkedin"], followers: "56K", engagement: "5.4%", matchScore: 84, style: "Technical, storytelling", collab: "Product reviews, startup stories", mutual: 2, verified: true, color: "from-emerald-500 to-teal-600" },
  { id: 5, name: "Kavya Nair", handle: "@kavyacooks", avatar: "KN", niche: "Food & Recipes", platforms: ["instagram","youtube"], followers: "95K", engagement: "7.3%", matchScore: 79, style: "Warm, instructional", collab: "Recipe collabs, kitchen tours", mutual: 0, verified: false, color: "from-orange-500 to-amber-600" },
  { id: 6, name: "Dev Patel", handle: "@devmindset", avatar: "DP", niche: "Productivity & Mindset", platforms: ["youtube","linkedin"], followers: "43K", engagement: "9.2%", matchScore: 76, style: "Philosophical, practical", collab: "Mindset series, morning routines", mutual: 1, verified: false, color: "from-cyan-500 to-blue-600" },
];

const niches = ["All", "Fitness", "Finance", "Dance", "Tech", "Food", "Mindset"];

export default function ConnectPage() {
  const [search, setSearch] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [connected, setConnected] = useState<number[]>([]);
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [selected, setSelected] = useState<typeof creators[0] | null>(null);

  const filtered = creators.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.niche.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase());
    const matchNiche = selectedNiche === "All" || c.niche.toLowerCase().includes(selectedNiche.toLowerCase());
    return matchSearch && matchNiche && !dismissed.includes(c.id);
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraConnect</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20">Collaboration</span>
        </div>
        <p className="text-white/40 text-sm ml-12">AI matches you with creators who share your niche, audience, and content style.</p>
      </motion.div>

      {/* Your profile card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-xl p-4 mb-6 border-l-2 border-pink-500 flex items-center gap-4 flex-wrap">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">C</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white">Your Profile</div>
          <div className="text-xs text-white/40">Niche: Content Creation & Growth · Avg engagement: 7.4% · ChakraScore: 74</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-pink-400">
          <Star className="w-3.5 h-3.5" />
          <span>AI found {filtered.length} matches for you</span>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search creators, niches..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-pink-500/50 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {niches.map(n => (
            <button key={n} onClick={() => setSelectedNiche(n)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                selectedNiche === n ? "bg-pink-600/30 border-pink-500/50 text-pink-300" : "bg-white/5 border-white/10 text-white/40 hover:text-white/70")}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Creator cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((creator, i) => (
          <motion.div key={creator.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="glass rounded-xl overflow-hidden hover:border-white/10 transition-all">
            {/* Match score bar */}
            <div className="h-1 w-full bg-white/5">
              <div className={cn("h-full bg-gradient-to-r", creator.color)} style={{ width: `${creator.matchScore}%` }} />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm flex-shrink-0", creator.color)}>
                    {creator.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-white">{creator.name}</span>
                      {creator.verified && <Check className="w-3 h-3 text-blue-400" />}
                    </div>
                    <div className="text-xs text-white/30">{creator.handle}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className={cn("text-sm font-bold", creator.matchScore >= 90 ? "text-emerald-400" : creator.matchScore >= 80 ? "text-yellow-400" : "text-white/60")}>
                    {creator.matchScore}%
                  </div>
                  <div className="text-xs text-white/25">match</div>
                </div>
              </div>

              <div className="text-xs text-white/50 mb-3 px-2 py-1.5 rounded-lg bg-white/3 border border-white/5">
                {creator.niche}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-center p-2 rounded-lg bg-white/3">
                  <div className="text-sm font-bold text-white">{creator.followers}</div>
                  <div className="text-xs text-white/30">Followers</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/3">
                  <div className="text-sm font-bold text-emerald-400">{creator.engagement}</div>
                  <div className="text-xs text-white/30">Engagement</div>
                </div>
              </div>

              <div className="flex gap-1 mb-3 flex-wrap">
                {creator.platforms.map(p => <PlatformBadge key={p} platform={p} />)}
                {creator.mutual > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    {creator.mutual} mutual
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button onClick={() => setDismissed(d => [...d, creator.id])}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all">
                  <X className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setSelected(creator)}
                  className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-medium transition-all">
                  View Profile
                </button>
                <button
                  onClick={() => setConnected(c => connected.includes(creator.id) ? c : [...c, creator.id])}
                  className={cn("flex-1 py-2 rounded-lg text-xs font-medium transition-all",
                    connected.includes(creator.id)
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-pink-600 hover:bg-pink-500 text-white")}>
                  {connected.includes(creator.id) ? "✓ Requested" : "Connect"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Profile modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-6 max-w-md w-full border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn("w-14 h-14 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-xl", selected.color)}>
                  {selected.avatar}
                </div>
                <div>
                  <div className="font-bold text-white text-lg">{selected.name}</div>
                  <div className="text-sm text-white/40">{selected.handle}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 mb-4">
              {[
                { label: "Niche", value: selected.niche },
                { label: "Content Style", value: selected.style },
                { label: "Best for Collab", value: selected.collab },
                { label: "Followers", value: selected.followers },
                { label: "Engagement Rate", value: selected.engagement },
                { label: "AI Match Score", value: `${selected.matchScore}% — ${selected.matchScore >= 90 ? "Excellent fit" : selected.matchScore >= 80 ? "Great fit" : "Good fit"}` },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-white/3">
                  <span className="text-xs text-white/40">{item.label}</span>
                  <span className="text-sm text-white font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 text-sm transition-colors">Message</button>
              <button
                onClick={() => { setConnected(c => [...c, selected.id]); setSelected(null); }}
                className="flex-1 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-sm font-medium transition-colors">
                Send Collab Request
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
