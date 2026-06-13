"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, TrendingUp, Lightbulb, Heart, AlertCircle, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";

const comments = [
  { id: 1, text: "Can you do a full tutorial on this? I've been struggling with this for months!", sentiment: "positive", intent: "content request", post: "Fitness Routine Reel" },
  { id: 2, text: "This is exactly what I needed. More of this please!", sentiment: "positive", intent: "encouragement", post: "Skincare Tips" },
  { id: 3, text: "What camera do you use? The quality is amazing", sentiment: "positive", intent: "gear question", post: "Morning Routine Vlog" },
  { id: 4, text: "I tried this and it didn't work for me at all", sentiment: "negative", intent: "feedback", post: "Fitness Routine Reel" },
  { id: 5, text: "Please make a video about meal prep for beginners", sentiment: "positive", intent: "content request", post: "Healthy Eating Reel" },
  { id: 6, text: "How long did it take you to see results?", sentiment: "neutral", intent: "question", post: "Fitness Routine Reel" },
  { id: 7, text: "The music in this video is so good, what's the song?", sentiment: "positive", intent: "music question", post: "Dance Reel" },
  { id: 8, text: "I wish you posted more often, I check every day", sentiment: "positive", intent: "loyalty signal", post: "Morning Routine Vlog" },
];

const contentIdeas = [
  { idea: "Full beginner workout tutorial (no equipment)", source: "12 comments requested this", confidence: 94, tag: "High Demand" },
  { idea: "Meal prep for beginners — step by step", source: "8 comments requested this", confidence: 88, tag: "High Demand" },
  { idea: "Camera & gear setup tour", source: "6 comments asked about gear", confidence: 76, tag: "Audience Curious" },
  { idea: "'Results after 30 days' follow-up video", source: "Audience asking about results", confidence: 82, tag: "Follow-up" },
  { idea: "Song/music playlist I use in reels", source: "Multiple music questions", confidence: 71, tag: "Easy Win" },
];

const sentimentBreakdown = [
  { label: "Positive", pct: 72, color: "bg-emerald-500", text: "text-emerald-400" },
  { label: "Neutral", pct: 18, color: "bg-yellow-500", text: "text-yellow-400" },
  { label: "Negative", pct: 10, color: "bg-red-500", text: "text-red-400" },
];

export default function VoicePage() {
  const [activeTab, setActiveTab] = useState<"comments" | "ideas">("ideas");

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraVoice</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/20">Comment Intel</span>
        </div>
        <p className="text-white/40 text-sm ml-12">AI reads your comments, detects what your audience wants, and turns it into future content ideas.</p>
      </motion.div>

      {/* Sentiment overview */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-pink-400" />
          <h3 className="text-sm font-semibold text-white/70">Audience Sentiment — Last 30 Days</h3>
          <span className="ml-auto text-xs text-white/25">Based on {comments.length * 12} comments analysed</span>
        </div>
        <div className="flex gap-4 mb-3">
          {sentimentBreakdown.map(s => (
            <div key={s.label} className="flex-1 text-center">
              <div className={cn("text-2xl font-bold mb-1", s.text)}>{s.pct}%</div>
              <div className="text-xs text-white/30">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="h-2 rounded-full overflow-hidden flex gap-0.5">
          {sentimentBreakdown.map(s => (
            <motion.div key={s.label} initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 1, ease: "easeOut" }}
              className={cn("h-full rounded-full", s.color)} />
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex rounded-lg border border-white/10 overflow-hidden mb-6 w-fit">
        {(["ideas", "comments"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={cn("px-4 py-2 text-sm font-medium capitalize transition-all",
              activeTab === tab ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70")}>
            {tab === "ideas" ? "💡 Content Ideas" : "💬 Comment Analysis"}
          </button>
        ))}
      </div>

      {activeTab === "ideas" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <p className="text-xs text-white/30 mb-4">AI detected these content ideas from your audience comments — ranked by demand.</p>
          {contentIdeas.map((idea, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-4 flex items-start gap-4 hover:border-white/10 transition-all">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-semibold text-white">{idea.idea}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border",
                    idea.tag === "High Demand" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    idea.tag === "Follow-up" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20")}>
                    {idea.tag}
                  </span>
                </div>
                <div className="text-xs text-white/30 mb-2">{idea.source}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${idea.confidence}%` }} transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
                      className="h-full rounded-full bg-teal-500" />
                  </div>
                  <span className="text-xs text-teal-400 font-semibold">{idea.confidence}% confidence</span>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium transition-colors flex-shrink-0">
                Create →
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === "comments" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {comments.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
              className="glass rounded-xl p-4 flex items-start gap-3">
              <div className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-2",
                c.sentiment === "positive" ? "bg-emerald-400" : c.sentiment === "negative" ? "bg-red-400" : "bg-yellow-400")} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/80 mb-1">"{c.text}"</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-white/25">{c.post}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border",
                    c.sentiment === "positive" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    c.sentiment === "negative" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20")}>
                    {c.intent}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
