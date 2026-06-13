"use client";

import { motion } from "framer-motion";
import { BadgeDollarSign, Star, TrendingUp, Shield, CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const brandScore = 72;
const metrics = [
  { label: "Engagement Quality", score: 84, max: 100, desc: "Real, active audience — low bot ratio", status: "good" },
  { label: "Content Consistency", score: 78, max: 100, desc: "Posting 4–5x/week consistently", status: "good" },
  { label: "Niche Authority", score: 71, max: 100, desc: "Strong in fitness & lifestyle", status: "good" },
  { label: "Audience Trust Score", score: 88, max: 100, desc: "High save & share rate", status: "good" },
  { label: "Follower Growth Rate", score: 62, max: 100, desc: "Steady but could be faster", status: "warning" },
  { label: "Brand Safety", score: 95, max: 100, desc: "No controversial content detected", status: "good" },
];

const opportunities = [
  { brand: "Fitness Supplement Co.", category: "Health & Fitness", fit: 94, budget: "₹15,000–₹40,000/post", status: "ready" },
  { brand: "Activewear Brand", category: "Fashion & Fitness", fit: 89, budget: "₹10,000–₹25,000/post", status: "ready" },
  { brand: "Meal Prep Service", category: "Food & Health", fit: 82, budget: "₹8,000–₹20,000/post", status: "ready" },
  { brand: "Productivity App", category: "Tech & Lifestyle", fit: 71, budget: "₹5,000–₹15,000/post", status: "almost" },
  { brand: "Premium Skincare", category: "Beauty", fit: 65, budget: "₹20,000–₹60,000/post", status: "almost" },
];

const improvements = [
  "Grow to 50K followers to unlock premium brand deals (currently 48.2K — you're close)",
  "Increase posting frequency to 5x/week to improve consistency score",
  "Add a media kit to your bio link — brands look for this first",
  "Create 2–3 dedicated 'brand-friendly' posts showing product integration naturally",
];

export default function BrandPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
            <BadgeDollarSign className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraBrand</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">Brand Readiness</span>
        </div>
        <p className="text-white/40 text-sm ml-12">Your sponsorship readiness score, engagement quality, and brand collaboration opportunities.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Brand Score */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-4">
            <svg width="128" height="128" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle cx="64" cy="64" r="54" fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={339} strokeDashoffset={339 - (brandScore / 100) * 339} transform="rotate(-90 64 64)"
                style={{ transition: "stroke-dashoffset 1.5s ease-out" }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-white">{brandScore}</span>
              <span className="text-xs text-white/30">/100</span>
            </div>
          </div>
          <div className="text-sm font-semibold text-amber-400 mb-1">Brand Ready</div>
          <p className="text-xs text-white/40 text-center">You qualify for mid-tier brand deals. 3 improvements to reach premium tier.</p>
        </motion.div>

        {/* Metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-2 glass rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white/70 mb-4">Sponsorship Readiness Breakdown</h3>
          <div className="space-y-3">
            {metrics.map((m, i) => (
              <div key={m.label} className="flex items-center gap-3">
                {m.status === "good" ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" /> :
                 m.status === "warning" ? <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" /> :
                 <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-white/70">{m.label}</span>
                    <span className={cn("text-xs font-bold", m.score >= 80 ? "text-emerald-400" : m.score >= 65 ? "text-yellow-400" : "text-red-400")}>{m.score}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${m.score}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
                      className={cn("h-full rounded-full", m.score >= 80 ? "bg-emerald-500" : m.score >= 65 ? "bg-yellow-500" : "bg-red-500")} />
                  </div>
                  <p className="text-xs text-white/25 mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Brand Opportunities */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-xl p-5 mb-6">
        <h3 className="text-sm font-semibold text-white/70 mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400" /> Brand Collaboration Opportunities
        </h3>
        <div className="space-y-3">
          {opportunities.map((opp, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/3 border border-white/5 hover:border-white/10 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                <BadgeDollarSign className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">{opp.brand}</div>
                <div className="text-xs text-white/30">{opp.category} · {opp.budget}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={cn("text-sm font-bold", opp.fit >= 85 ? "text-emerald-400" : "text-yellow-400")}>{opp.fit}% fit</div>
                <span className={cn("text-xs px-2 py-0.5 rounded-full border",
                  opp.status === "ready" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20")}>
                  {opp.status === "ready" ? "Ready to pitch" : "Almost ready"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Improvements */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass rounded-xl p-5 border-l-2 border-amber-500">
        <h3 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> To Reach Premium Brand Tier
        </h3>
        <div className="space-y-2">
          {improvements.map((imp, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-white/60">
              <span className="text-amber-400 font-bold flex-shrink-0">{i + 1}.</span>
              <span>{imp}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
