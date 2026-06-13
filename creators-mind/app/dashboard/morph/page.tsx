"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat2, Wand2, Copy, Check, RefreshCw, FileText, Mic, BookOpen, Instagram, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const outputFormats = [
  { id: "reel", label: "Instagram Reel", icon: Instagram, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  { id: "short", label: "YouTube Short", icon: Youtube, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { id: "blog", label: "Blog Post", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { id: "podcast", label: "Podcast Script", icon: Mic, color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { id: "linkedin", label: "LinkedIn Post", icon: Linkedin, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { id: "thread", label: "Twitter/X Thread", icon: FileText, color: "text-white/60", bg: "bg-white/5 border-white/10" },
];

function morphContent(original: string, format: string): string {
  const t = original.trim().slice(0, 80);
  const morphs: Record<string, string> = {
    reel: `🎬 REEL SCRIPT (based on your content)\n\nHOOK (0–3s):\n"${t.split(" ").slice(0, 8).join(" ")}..."\n\nBODY (3–30s):\nBreak down your 3 key points visually. Show, don't just tell. Use text overlays on each point.\n\nCTA (last 3s):\n"Save this and share it with someone who needs it."\n\n📸 Film vertical 9:16 · Natural light · Add captions`,
    short: `📱 YOUTUBE SHORT SCRIPT\n\nOPENING (0–3s):\n"${t.split(" ").slice(0, 6).join(" ")} — and I'll prove it in 60 seconds."\n\nCONTENT (3–50s):\nDeliver your core insight fast. One idea per short. No fluff.\n\nCLOSING (50–60s):\n"Subscribe for more — I post every week."\n\n💡 Keep it under 60 seconds · Add chapters · Use trending audio`,
    blog: `📝 BLOG POST OUTLINE\n\nTitle: The Complete Guide to ${t.split(" ").slice(0, 5).join(" ")}\n\nIntro (150 words):\nHook the reader with the problem. Why does this matter? Who is this for?\n\nSection 1: The Problem\nWhat most people get wrong. Common mistakes. Why it matters.\n\nSection 2: The Solution\nYour 3-step framework. Specific, actionable advice.\n\nSection 3: Real Results\nData, examples, or personal experience.\n\nConclusion + CTA:\nSummarise key points. Link to related content. Email signup.\n\n🔍 Target keyword: "${t.split(" ").slice(0, 4).join(" ")}" · Aim for 800–1200 words`,
    podcast: `🎙️ PODCAST EPISODE SCRIPT\n\nINTRO (2 min):\n"Welcome back. Today we're diving into ${t}. If you've ever struggled with this, this episode is going to change how you think about it."\n\nSEGMENT 1 — The Problem (5 min):\nTalk through the common struggle. Make the listener feel understood.\n\nSEGMENT 2 — The Insight (10 min):\nShare your core framework or story. Be specific. Use examples.\n\nSEGMENT 3 — Action Steps (5 min):\nGive 3 things the listener can do TODAY.\n\nOUTRO (2 min):\n"If this helped, share it with one person. Leave a review — it helps more than you know."\n\n🎧 Target length: 20–25 min · Add timestamps · Repurpose clips as Reels`,
    linkedin: `💼 LINKEDIN POST\n\nHOOK:\n${t.split(" ").slice(0, 10).join(" ")}.\n\nMost people get this wrong.\n\nHere's what actually works:\n\n→ Point 1: [Your first key insight]\n→ Point 2: [Your second key insight]\n→ Point 3: [Your third key insight]\n\nThe result? [Outcome or transformation]\n\nI've seen this work for [context]. The key is consistency.\n\nWhat's your experience with this? Drop it in the comments.\n\n♻️ Repost if this helped someone on your network.\n\n#ContentCreator #CreatorEconomy #PersonalBranding`,
    thread: `🧵 TWITTER/X THREAD\n\n1/ ${t.split(" ").slice(0, 12).join(" ")}.\n\nA thread 🧵\n\n2/ Most people approach this completely wrong. Here's the truth:\n\n3/ First — [Your key insight #1]. This alone changes everything.\n\n4/ Second — [Your key insight #2]. Most people skip this step.\n\n5/ Third — [Your key insight #3]. This is the one that compounds.\n\n6/ The result: [Outcome]. Not overnight — but within 30 days.\n\n7/ If this helped, RT the first tweet so others can find it.\n\nFollow for more threads like this every week.\n\n💡 Aim for 7–10 tweets · Add images to tweets 3 and 6`,
  };
  return morphs[format] ?? "Select a format to see the repurposed content.";
}

let morphSeed = 0;

export default function MorphPage() {
  const [original, setOriginal] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const morph = async () => {
    if (!original.trim() || selected.length === 0) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    const out: Record<string, string> = {};
    selected.forEach(f => { out[f] = morphContent(original, f); });
    setResults(out);
    setLoading(false);
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <Repeat2 className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraMorph</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">Repurpose</span>
        </div>
        <p className="text-white/40 text-sm ml-12">Paste any content — turn it into reels, shorts, blogs, podcasts, LinkedIn posts, and threads instantly.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-5">
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">Your Original Content</label>
            <textarea value={original} onChange={e => setOriginal(e.target.value)}
              placeholder="Paste your video script, blog post, caption, or just describe your topic...\n\ne.g. 'I made a YouTube video about how I lost 15kg in 4 months using intermittent fasting and home workouts. The key points were: protein intake, progressive overload, and sleep.'"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm resize-none focus:outline-none focus:border-indigo-500/50 transition-colors"
              rows={8} />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-2xl p-5">
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-3 block">Convert Into</label>
            <div className="grid grid-cols-2 gap-2">
              {outputFormats.map(f => (
                <button key={f.id} onClick={() => toggle(f.id)}
                  className={cn("flex items-center gap-2 p-3 rounded-xl border text-left transition-all",
                    selected.includes(f.id) ? `${f.bg} ${f.color}` : "bg-white/3 border-white/5 text-white/40 hover:text-white/70 hover:bg-white/5")}>
                  <f.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">{f.label}</span>
                  {selected.includes(f.id) && <Check className="w-3 h-3 ml-auto" />}
                </button>
              ))}
            </div>
          </motion.div>

          <button onClick={morph} disabled={!original.trim() || selected.length === 0 || loading}
            className={cn("w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
              original.trim() && selected.length > 0 && !loading
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white"
                : "bg-white/5 text-white/20 cursor-not-allowed")}>
            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" />Morphing {selected.length} formats...</> : <><Repeat2 className="w-4 h-4" />Morph Content ({selected.length} selected)</>}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <AnimatePresence>
            {Object.keys(results).length > 0 && !loading && (
              <>
                {outputFormats.filter(f => results[f.id]).map((f, i) => (
                  <motion.div key={f.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className={cn("glass rounded-xl border overflow-hidden", f.bg.split(" ")[1])}>
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <f.icon className={cn("w-4 h-4", f.color)} />
                        <span className="text-sm font-semibold text-white/90">{f.label}</span>
                      </div>
                      <button onClick={() => copy(results[f.id], f.id)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-all">
                        {copied === f.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <div className="px-4 py-4">
                      <pre className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap font-sans">{results[f.id]}</pre>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {Object.keys(results).length === 0 && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                <Repeat2 className="w-7 h-7 text-indigo-400/50" />
              </div>
              <p className="text-white/30 text-sm mb-1">Repurposed content will appear here</p>
              <p className="text-white/15 text-xs">Paste your content, select formats, and hit Morph</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
