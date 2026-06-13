"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Anchor, Wand2, Copy, Check, RefreshCw, Zap, ImageIcon, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const hookTypes = ["Curiosity Gap", "Bold Claim", "Question", "Story", "Controversy", "Number/List"];
const platforms = ["Instagram", "TikTok", "YouTube", "LinkedIn"];

function generateHooks(topic: string, type: string, platform: string, seed: number) {
  const t = topic.trim() || "your topic";
  const v = seed % 4;
  const hookSets: Record<string, string[][]> = {
    "Curiosity Gap": [
      [`Nobody talks about the dark side of ${t}. Until now.`, `What they don't tell you about ${t} (and why it matters).`, `The thing about ${t} that changed everything for me.`, `I discovered something about ${t} that most people never find out.`],
      [`The secret about ${t} that experts keep to themselves.`, `Why everything you know about ${t} might be wrong.`, `The part of ${t} nobody wants to admit.`, `What happens when you actually commit to ${t} for 90 days.`],
    ],
    "Bold Claim": [
      [`${t} is the most underrated thing you can do right now.`, `I quit ${t} for 30 days. Here's what happened.`, `${t} changed my life more than anything else I've tried.`, `This is the only ${t} advice you'll ever need.`],
      [`Most people are doing ${t} completely wrong.`, `${t} is not what you think it is.`, `I tried every approach to ${t}. Only one actually works.`, `Stop overthinking ${t}. Do this instead.`],
    ],
    "Question": [
      [`What if ${t} was actually simpler than everyone makes it?`, `Are you making this mistake with ${t}?`, `How long have you been struggling with ${t}?`, `What would your life look like if you mastered ${t}?`],
      [`Why does ${t} feel so hard when it doesn't have to be?`, `Have you ever wondered why some people just get ${t} and others don't?`, `What's actually stopping you from succeeding at ${t}?`, `Is ${t} really worth it? Here's my honest answer.`],
    ],
    "Story": [
      [`6 months ago I knew nothing about ${t}. Here's what changed.`, `I failed at ${t} 3 times before I figured this out.`, `The day I stopped doing ${t} wrong was the day everything shifted.`, `My ${t} journey started with one embarrassing mistake.`],
      [`I spent ₹50,000 learning ${t} the hard way so you don't have to.`, `Nobody believed I could do ${t}. Then this happened.`, `The moment I understood ${t} was the moment my results changed.`, `I documented my entire ${t} journey. Here's what I found.`],
    ],
    "Controversy": [
      [`Hot take: ${t} is overrated and here's why.`, `Unpopular opinion: you don't need to be good at ${t} to succeed.`, `I'm going to say what nobody in the ${t} space will say.`, `Everyone's wrong about ${t}. Here's the truth.`],
      [`The ${t} advice you're getting is probably hurting you.`, `Stop listening to ${t} gurus. Do this instead.`, `The ${t} industry doesn't want you to know this.`, `I disagree with every popular ${t} tip. Here's why.`],
    ],
    "Number/List": [
      [`3 things about ${t} that took me years to learn.`, `5 mistakes I made with ${t} (and how to avoid them).`, `The 1 thing that changed my ${t} results overnight.`, `7 ${t} tips that actually work in ${new Date().getFullYear()}.`],
      [`10 seconds of ${t} advice that's worth more than any course.`, `2 rules I follow for ${t} that changed everything.`, `The 3-step ${t} system that gets results every time.`, `4 ${t} habits that separate beginners from experts.`],
    ],
  };

  const set = hookSets[type] ?? hookSets["Curiosity Gap"];
  return set[v % set.length];
}

function generateThumbnails(topic: string, seed: number) {
  const t = topic.trim() || "Your Topic";
  const v = seed % 3;
  const sets = [
    [`The TRUTH About ${t}`, `I Tried ${t} For 30 Days`, `${t}: What Nobody Tells You`],
    [`Stop Doing ${t} Wrong`, `How I Finally Cracked ${t}`, `${t} Changed My Life`],
    [`${t}: The Honest Review`, `From Zero to Results With ${t}`, `Why Most People Fail At ${t}`],
  ];
  return sets[v];
}

function generateOpeningLines(topic: string, platform: string, seed: number) {
  const t = topic.trim() || "this topic";
  const v = seed % 4;
  const lines: Record<string, string[][]> = {
    instagram: [
      [`Okay so I need to talk about ${t} because nobody is being honest about it.`, `Real talk — ${t} is not what most people think it is.`, `POV: you finally figure out ${t} after months of struggling.`, `This is your sign to take ${t} seriously.`],
      [`I've been doing ${t} for a while now and I need to share what I've learned.`, `The thing about ${t} that changed everything for me.`, `Stop scrolling. This ${t} tip will save you months.`, `If you're serious about ${t}, you need to hear this.`],
    ],
    tiktok: [
      [`Wait — before you scroll, let me tell you something about ${t} that will change how you think about it.`, `I'm going to say something controversial about ${t}.`, `The ${t} tip that nobody on here is talking about.`, `Tell me you're new to ${t} without telling me.`],
      [`POV: someone finally explains ${t} in a way that makes sense.`, `This is the ${t} content I wish existed when I started.`, `Stitch this if you disagree about ${t}.`, `The algorithm keeps hiding this ${t} truth.`],
    ],
    youtube: [
      [`Before we get into today's video, I want to ask you something about ${t}.`, `If you've ever struggled with ${t}, this video is going to change things for you.`, `I've been wanting to make this video about ${t} for a long time. Here's why.`, `Today we're talking about ${t} — and I'm not going to sugarcoat it.`],
      [`In the next 10 minutes, I'm going to show you everything I know about ${t}.`, `This is the ${t} video I wish existed when I started.`, `I spent 6 months researching ${t} so you don't have to.`, `Let's talk about ${t} — the real version, not the Instagram version.`],
    ],
    linkedin: [
      [`I've been thinking about ${t} a lot lately, and I have some thoughts.`, `Unpopular opinion about ${t} in the professional world.`, `After years of working with ${t}, here's what I've learned.`, `The ${t} conversation we need to have in this industry.`],
      [`Most people get ${t} wrong. Here's what actually works.`, `I made every mistake possible with ${t}. Here's what I learned.`, `The ${t} advice I give every person I mentor.`, `Let's be honest about ${t} for a second.`],
    ],
  };
  const pl = platform.toLowerCase();
  const set = lines[pl] ?? lines.instagram;
  return set[v % set.length];
}

let hookSeed = 0;

export default function HookPage() {
  const [topic, setTopic] = useState("");
  const [hookType, setHookType] = useState("Curiosity Gap");
  const [platform, setPlatform] = useState("Instagram");
  const [loading, setLoading] = useState(false);
  const [hooks, setHooks] = useState<string[] | null>(null);
  const [thumbnails, setThumbnails] = useState<string[] | null>(null);
  const [openingLines, setOpeningLines] = useState<string[] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const s = ++hookSeed;
    setHooks(generateHooks(topic, hookType, platform, s));
    setThumbnails(generateThumbnails(topic, s));
    setOpeningLines(generateOpeningLines(topic, platform, s));
    setLoading(false);
  };

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Anchor className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraHook</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">Hook Generator</span>
        </div>
        <p className="text-white/40 text-sm ml-12">Generate viral hooks, thumbnail text, and high-retention opening lines for any topic.</p>
      </motion.div>

      {/* Input */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6 mb-6">
        <div className="mb-4">
          <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">Your Topic</label>
          <input value={topic} onChange={e => setTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
            placeholder="e.g. fitness, skincare routine, investing for beginners, dance reels..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors" />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">Hook Style</label>
            <div className="flex flex-wrap gap-2">
              {hookTypes.map(h => (
                <button key={h} onClick={() => setHookType(h)}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                    hookType === h ? "bg-cyan-600/30 border-cyan-500/50 text-cyan-300" : "bg-white/5 border-white/10 text-white/40 hover:text-white/70")}>
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">Platform</label>
            <div className="flex flex-wrap gap-2">
              {platforms.map(p => (
                <button key={p} onClick={() => setPlatform(p)}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                    platform === p ? "bg-cyan-600/30 border-cyan-500/50 text-cyan-300" : "bg-white/5 border-white/10 text-white/40 hover:text-white/70")}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button onClick={generate} disabled={!topic.trim() || loading}
          className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
            topic.trim() && !loading ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white" : "bg-white/5 text-white/20 cursor-not-allowed")}>
          {loading ? <><RefreshCw className="w-4 h-4 animate-spin" />Generating...</> : <><Wand2 className="w-4 h-4" />Generate Hooks</>}
        </button>
      </motion.div>

      <AnimatePresence>
        {hooks && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Hooks */}
            <div className="glass rounded-xl overflow-hidden border border-cyan-500/20">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white/90">Viral Hooks — {hookType}</span>
                <button onClick={generate} className="ml-auto p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-all">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-4 space-y-2">
                {hooks.map((hook, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5 group">
                    <span className="text-xs text-white/25 font-mono w-4 flex-shrink-0 mt-0.5">{i+1}</span>
                    <p className="text-sm text-white/85 leading-relaxed flex-1 font-medium italic">"{hook}"</p>
                    <button onClick={() => copy(hook, `hook-${i}`)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/70 transition-all flex-shrink-0">
                      {copied === `hook-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnail texts */}
            <div className="glass rounded-xl overflow-hidden border border-emerald-500/20">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-white/90">Thumbnail Text Options</span>
              </div>
              <div className="p-4 space-y-2">
                {thumbnails?.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/5 group">
                    <span className="text-xs text-white/25 font-mono w-4 flex-shrink-0">{i+1}</span>
                    <span className="text-sm text-white/85 font-bold flex-1">{t}</span>
                    <button onClick={() => copy(t, `thumb-${i}`)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/70 transition-all">
                      {copied === `thumb-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening lines */}
            <div className="glass rounded-xl overflow-hidden border border-violet-500/20">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Play className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-white/90">High-Retention Opening Lines — {platform}</span>
              </div>
              <div className="p-4 space-y-2">
                {openingLines?.map((line, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5 group">
                    <span className="text-xs text-white/25 font-mono w-4 flex-shrink-0 mt-0.5">{i+1}</span>
                    <p className="text-sm text-white/75 leading-relaxed flex-1">{line}</p>
                    <button onClick={() => copy(line, `line-${i}`)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/70 transition-all flex-shrink-0">
                      {copied === `line-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!hooks && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
            <Anchor className="w-7 h-7 text-cyan-400/50" />
          </div>
          <p className="text-white/30 text-sm">Enter a topic and generate viral hooks, thumbnail text, and opening lines</p>
        </motion.div>
      )}
    </div>
  );
}
