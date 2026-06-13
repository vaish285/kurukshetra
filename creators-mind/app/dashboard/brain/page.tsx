"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, RefreshCw, Send, Copy, Check, ChevronDown,
  Wand2, Hash, ImageIcon, FileText, Zap, Video, Mic,
  Eye, TrendingUp, Star, Camera, Music, Clapperboard, Anchor, Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buildKit, nextSeed, type Kit } from "@/lib/contentEngine";

const platforms = ["YouTube", "Instagram", "TikTok", "LinkedIn"];
const hookTypes = ["Curiosity Gap", "Bold Claim", "Question", "Story", "Controversy", "Number/List"];
type KitKey = "contentIdea"|"hook"|"perf"|"script"|"caption_short"|"caption_long"|"hashtags"|"thumbnails"|"viralTips";

// ─── Hook generator helpers ───────────────────────────────────────────────────
let hookSeed = 0;

function genHooks(topic: string, type: string, seed: number): string[] {
  const t = topic.trim() || "your topic";
  const v = seed % 4;
  const sets: Record<string, string[][]> = {
    "Curiosity Gap": [[`Nobody talks about the dark side of ${t}. Until now.`,`What they don't tell you about ${t}.`,`The thing about ${t} that changed everything for me.`,`I discovered something about ${t} most people never find out.`],[`The secret about ${t} experts keep to themselves.`,`Why everything you know about ${t} might be wrong.`,`The part of ${t} nobody wants to admit.`,`What happens when you commit to ${t} for 90 days.`]],
    "Bold Claim": [[`${t} is the most underrated thing you can do right now.`,`I quit ${t} for 30 days. Here's what happened.`,`${t} changed my life more than anything else I've tried.`,`This is the only ${t} advice you'll ever need.`],[`Most people are doing ${t} completely wrong.`,`${t} is not what you think it is.`,`I tried every approach to ${t}. Only one works.`,`Stop overthinking ${t}. Do this instead.`]],
    "Question": [[`What if ${t} was simpler than everyone makes it?`,`Are you making this mistake with ${t}?`,`How long have you been struggling with ${t}?`,`What would your life look like if you mastered ${t}?`],[`Why does ${t} feel so hard when it doesn't have to be?`,`Have you wondered why some people just get ${t}?`,`What's actually stopping you from succeeding at ${t}?`,`Is ${t} really worth it? Here's my honest answer.`]],
    "Story": [[`6 months ago I knew nothing about ${t}. Here's what changed.`,`I failed at ${t} 3 times before I figured this out.`,`The day I stopped doing ${t} wrong was the day everything shifted.`,`My ${t} journey started with one embarrassing mistake.`],[`I spent months learning ${t} the hard way so you don't have to.`,`Nobody believed I could do ${t}. Then this happened.`,`The moment I understood ${t} was when my results changed.`,`I documented my entire ${t} journey. Here's what I found.`]],
    "Controversy": [[`Hot take: ${t} is overrated and here's why.`,`Unpopular opinion: you don't need to be good at ${t} to succeed.`,`I'm going to say what nobody in the ${t} space will say.`,`Everyone's wrong about ${t}. Here's the truth.`],[`The ${t} advice you're getting is probably hurting you.`,`Stop listening to ${t} gurus. Do this instead.`,`The ${t} industry doesn't want you to know this.`,`I disagree with every popular ${t} tip. Here's why.`]],
    "Number/List": [[`3 things about ${t} that took me years to learn.`,`5 mistakes I made with ${t} (and how to avoid them).`,`The 1 thing that changed my ${t} results overnight.`,`7 ${t} tips that actually work in ${new Date().getFullYear()}.`],[`10 seconds of ${t} advice worth more than any course.`,`2 rules I follow for ${t} that changed everything.`,`The 3-step ${t} system that gets results every time.`,`4 ${t} habits that separate beginners from experts.`]],
  };
  const set = sets[type] ?? sets["Curiosity Gap"];
  return set[v % set.length];
}

function genThumbnails(topic: string, seed: number): string[] {
  const t = topic.trim() || "Your Topic";
  const v = seed % 3;
  return [[`The TRUTH About ${t}`,`I Tried ${t} For 30 Days`,`${t}: What Nobody Tells You`],[`Stop Doing ${t} Wrong`,`How I Finally Cracked ${t}`,`${t} Changed My Life`],[`${t}: The Honest Review`,`From Zero to Results With ${t}`,`Why Most People Fail At ${t}`]][v];
}

function genOpeningLines(topic: string, platform: string, seed: number): string[] {
  const t = topic.trim() || "this topic";
  const v = seed % 4;
  const pl = platform.toLowerCase();
  const lines: Record<string, string[][]> = {
    instagram: [[`Okay so I need to talk about ${t} because nobody is being honest about it.`,`Real talk — ${t} is not what most people think it is.`,`POV: you finally figure out ${t} after months of struggling.`,`This is your sign to take ${t} seriously.`],[`I've been doing ${t} for a while and I need to share what I've learned.`,`The thing about ${t} that changed everything for me.`,`Stop scrolling. This ${t} tip will save you months.`,`If you're serious about ${t}, you need to hear this.`]],
    tiktok: [[`Wait — before you scroll, let me tell you something about ${t}.`,`I'm going to say something controversial about ${t}.`,`The ${t} tip nobody on here is talking about.`,`Tell me you're new to ${t} without telling me.`],[`POV: someone finally explains ${t} in a way that makes sense.`,`This is the ${t} content I wish existed when I started.`,`Stitch this if you disagree about ${t}.`,`The algorithm keeps hiding this ${t} truth.`]],
    youtube: [[`Before we get into today's video, I want to ask you something about ${t}.`,`If you've ever struggled with ${t}, this video is going to change things for you.`,`I've been wanting to make this video about ${t} for a long time.`,`Today we're talking about ${t} — and I'm not going to sugarcoat it.`],[`In the next 10 minutes, I'll show you everything I know about ${t}.`,`This is the ${t} video I wish existed when I started.`,`I spent 6 months researching ${t} so you don't have to.`,`Let's talk about ${t} — the real version, not the Instagram version.`]],
    linkedin: [[`I've been thinking about ${t} a lot lately, and I have some thoughts.`,`Unpopular opinion about ${t} in the professional world.`,`After years of working with ${t}, here's what I've learned.`,`The ${t} conversation we need to have in this industry.`],[`Most people get ${t} wrong. Here's what actually works.`,`I made every mistake possible with ${t}. Here's what I learned.`,`The ${t} advice I give every person I mentor.`,`Let's be honest about ${t} for a second.`]],
  };
  const set = (lines[pl] ?? lines.instagram);
  return set[v % set.length];
}



// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BrainPage() {
  const [activeTab, setActiveTab] = useState<"kit"|"hooks">("kit");
  // Kit state
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [loading, setLoading] = useState(false);
  const [kit, setKit] = useState<Kit|null>(null);
  const [currentDesc, setCurrentDesc] = useState("");
  const [regenerating, setRegenerating] = useState<KitKey|null>(null);
  const [sentToCalendar, setSentToCalendar] = useState(false);
  // Hook state
  const [hookTopic, setHookTopic] = useState("");
  const [hookType, setHookType] = useState("Curiosity Gap");
  const [hookPlatform, setHookPlatform] = useState("Instagram");
  const [hookLoading, setHookLoading] = useState(false);
  const [hooks, setHooks] = useState<string[]|null>(null);
  const [thumbnails, setThumbnails] = useState<string[]|null>(null);
  const [openingLines, setOpeningLines] = useState<string[]|null>(null);
  // Shared
  const [copied, setCopied] = useState<string|null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const generate = async () => {
    if (!description.trim()) return;
    setLoading(true); setKit(null); setSentToCalendar(false);
    await new Promise(r => setTimeout(r, 2000));
    setKit(buildKit(description, platform, nextSeed()));
    setCurrentDesc(description);
    setLoading(false);
  };

  const regenerateSection = async (section: KitKey) => {
    if (!kit) return;
    setRegenerating(section);
    await new Promise(r => setTimeout(r, 900));
    const fresh = buildKit(currentDesc, platform, nextSeed());
    setKit(prev => prev ? { ...prev, [section]: fresh[section as keyof Kit] } : prev);
    setRegenerating(null);
  };

  const generateHookKit = async () => {
    if (!hookTopic.trim()) return;
    setHookLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const s = ++hookSeed;
    setHooks(genHooks(hookTopic, hookType, s));
    setThumbnails(genThumbnails(hookTopic, s));
    setOpeningLines(genOpeningLines(hookTopic, hookPlatform, s));
    setHookLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraBrain</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">Core Feature</span>
        </div>
        <p className="text-white/40 text-sm ml-12">Full content kits + viral hook generator — everything you need to create and publish.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex rounded-xl border border-white/10 overflow-hidden mb-6 w-fit">
        <button onClick={() => setActiveTab("kit")} className={cn("flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all", activeTab === "kit" ? "bg-violet-600/30 text-violet-300" : "text-white/40 hover:text-white/70")}>
          <Clapperboard className="w-4 h-4" /> Content Kit
        </button>
        <button onClick={() => setActiveTab("hooks")} className={cn("flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all", activeTab === "hooks" ? "bg-violet-600/30 text-violet-300" : "text-white/40 hover:text-white/70")}>
          <Anchor className="w-4 h-4" /> Hook Generator
        </button>
      </div>

      {activeTab === "kit" ? (
        <div>
          {/* Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 mb-5">
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">What's your content about?</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate(); }}
              placeholder={"Examples:\n• fitness  /  my weight loss journey  /  home workout\n• dance  /  bollywood dance  /  trending reel dance\n• skincare routine  /  acne tips  /  glow up\n• food  /  healthy meal prep  /  quick recipe"}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm resize-none focus:outline-none focus:border-violet-500/50 transition-colors mb-4" rows={4} />
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">Platform</label>
                <div className="flex gap-2 flex-wrap">
                  {platforms.map(p => (
                    <button key={p} onClick={() => setPlatform(p)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", platform === p ? "bg-violet-600/30 border-violet-500/50 text-violet-300" : "bg-white/5 border-white/10 text-white/40 hover:text-white/70")}>{p}</button>
                  ))}
                </div>
              </div>
              <button onClick={generate} disabled={!description.trim() || loading}
                className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all", description.trim() && !loading ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white glow-purple" : "bg-white/5 text-white/20 cursor-not-allowed")}>
                {loading ? <><RefreshCw className="w-4 h-4 animate-spin" />Generating...</> : <><Wand2 className="w-4 h-4" />Generate Content Kit</>}
              </button>
            </div>
          </motion.div>

          {/* Loading */}
          <AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass rounded-2xl p-8 text-center mb-5">
                <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-violet-400 animate-pulse" />
                </div>
                <p className="text-white/70 text-sm font-medium mb-1">Building your content strategy...</p>
                <p className="text-white/30 text-xs mb-5">Tailoring everything for <span className="text-violet-300">{platform}</span></p>
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-xs text-white/30">
                  {["What to film","Song to use","How to perform","Full script","Captions","Hashtags"].map((s, i) => (
                    <span key={s} className="flex items-center gap-1.5 justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 pulse-dot" style={{ animationDelay: `${i * 0.25}s` }} />{s}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Kit output */}
          <AnimatePresence>
            {kit && !loading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="glass rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-white/60"><span className="text-white font-semibold">{kit.nicheLabel}</span> · <span className="text-violet-300">{platform}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={generate} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs transition-all"><RefreshCw className="w-3 h-3" /> New Variation</button>
                    <button onClick={() => setSentToCalendar(true)} disabled={sentToCalendar}
                      className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all", sentToCalendar ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-blue-600 hover:bg-blue-500 text-white")}>
                      {sentToCalendar ? <><Check className="w-4 h-4" />Sent to Calendar</> : <><Send className="w-4 h-4" />Send to Calendar</>}
                    </button>
                  </div>
                </div>

                <KitCard icon={<Clapperboard className="w-4 h-4 text-emerald-400" />} title="What to Film" subtitle="Exact shots, moves, and actions" color="border-emerald-500/20" onRegenerate={() => regenerateSection("contentIdea")} regenerating={regenerating === "contentIdea"} onCopy={() => copy(kit.contentIdea.join("\n"), "contentIdea")} copied={copied === "contentIdea"}>
                  <div className="space-y-2">
                    {kit.contentIdea.map((line, i) => (
                      <div key={i} className={cn("p-3 rounded-lg text-sm leading-relaxed", line.startsWith("🎬") ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold" : line.startsWith("📸") ? "bg-blue-500/10 border border-blue-500/20 text-blue-300" : line.startsWith("🎵") ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-300" : line.startsWith("💡") ? "bg-violet-500/10 border border-violet-500/20 text-violet-300" : "bg-white/3 border border-white/5 text-white/75")}>{line}</div>
                    ))}
                  </div>
                </KitCard>

                <div className="glass rounded-xl border border-yellow-500/20 p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/15 flex items-center justify-center flex-shrink-0"><Music className="w-5 h-5 text-yellow-400" /></div>
                  <div className="flex-1">
                    <div className="text-xs text-yellow-400 font-semibold mb-0.5">🎵 Recommended Song</div>
                    <div className="text-white font-semibold">{kit.song}</div>
                    <div className="text-xs text-white/30 mt-0.5">Use the original audio for maximum reach on {platform}</div>
                  </div>
                  <button onClick={() => copy(kit.song, "song")} className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-all">
                    {copied === "song" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <KitCard icon={<Zap className="w-4 h-4 text-yellow-400" />} title="Viral Hook" subtitle="Your opening line — first 3 seconds" color="border-yellow-500/20" onRegenerate={() => regenerateSection("hook")} regenerating={regenerating === "hook"} onCopy={() => copy(kit.hook, "hook")} copied={copied === "hook"}>
                  <p className="text-white/90 text-base leading-relaxed font-semibold italic">"{kit.hook}"</p>
                </KitCard>

                <KitCard icon={<Camera className="w-4 h-4 text-pink-400" />} title="How to Perform This Reel" subtitle="Energy · Camera · Expression · Pacing" color="border-pink-500/20" onRegenerate={() => regenerateSection("perf")} regenerating={regenerating === "perf"} onCopy={() => copy(Object.entries(kit.perf).map(([k,v]) => `${k}: ${v}`).join("\n\n"), "perf")} copied={copied === "perf"}>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[{icon:<Mic className="w-3.5 h-3.5 text-pink-400"/>,label:"Energy & Tone",text:kit.perf.energy},{icon:<Video className="w-3.5 h-3.5 text-pink-400"/>,label:"Opening Delivery",text:kit.perf.opening},{icon:<TrendingUp className="w-3.5 h-3.5 text-pink-400"/>,label:"Pacing & Cuts",text:kit.perf.pacing},{icon:<Eye className="w-3.5 h-3.5 text-pink-400"/>,label:"Facial Expression",text:kit.perf.expression},{icon:<Camera className="w-3.5 h-3.5 text-pink-400"/>,label:"Camera Setup",text:kit.perf.camera},{icon:<Star className="w-3.5 h-3.5 text-pink-400"/>,label:"CTA Delivery",text:kit.perf.cta}].map(item => (
                      <div key={item.label} className="p-3 rounded-lg bg-pink-500/5 border border-pink-500/10">
                        <div className="flex items-center gap-1.5 mb-1.5">{item.icon}<span className="text-xs font-semibold text-pink-300">{item.label}</span></div>
                        <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </KitCard>

                <KitCard icon={<FileText className="w-4 h-4 text-violet-400" />} title="Full Video Script" subtitle="Word-for-word — intro, body, CTA" color="border-violet-500/20" onRegenerate={() => regenerateSection("script")} regenerating={regenerating === "script"} onCopy={() => copy(`INTRO:\n${kit.script.intro}\n\nBODY:\n${kit.script.body}\n\nCTA:\n${kit.script.cta}`, "script")} copied={copied === "script"}>
                  <div className="space-y-3">
                    {[{label:"INTRO",text:kit.script.intro,color:"text-violet-400",bg:"bg-violet-500/5 border-violet-500/10"},{label:"BODY",text:kit.script.body,color:"text-blue-400",bg:"bg-blue-500/5 border-blue-500/10"},{label:"CALL TO ACTION",text:kit.script.cta,color:"text-emerald-400",bg:"bg-emerald-500/5 border-emerald-500/10"}].map(s => (
                      <div key={s.label} className={cn("p-4 rounded-xl border", s.bg)}>
                        <span className={cn("text-xs font-bold tracking-widest mb-2 block", s.color)}>{s.label}</span>
                        <p className="text-white/75 text-sm leading-relaxed whitespace-pre-line">{s.text}</p>
                      </div>
                    ))}
                  </div>
                </KitCard>

                <div className="grid md:grid-cols-2 gap-4">
                  <KitCard icon={<FileText className="w-4 h-4 text-blue-400" />} title="Short Caption" subtitle="For the post description" color="border-blue-500/20" onRegenerate={() => regenerateSection("caption_short")} regenerating={regenerating === "caption_short"} onCopy={() => copy(kit.caption_short, "caption_short")} copied={copied === "caption_short"}>
                    <p className="text-white/80 text-sm leading-relaxed">{kit.caption_short}</p>
                  </KitCard>
                  <KitCard icon={<FileText className="w-4 h-4 text-cyan-400" />} title="Long Caption" subtitle="Full caption with hooks & CTA" color="border-cyan-500/20" onRegenerate={() => regenerateSection("caption_long")} regenerating={regenerating === "caption_long"} onCopy={() => copy(kit.caption_long, "caption_long")} copied={copied === "caption_long"}>
                    <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">{kit.caption_long}</p>
                  </KitCard>
                </div>

                <KitCard icon={<Hash className="w-4 h-4 text-pink-400" />} title={`Hashtags (${kit.hashtags.length})`} subtitle="Niche-specific + platform-optimised" color="border-pink-500/20" onRegenerate={() => regenerateSection("hashtags")} regenerating={regenerating === "hashtags"} onCopy={() => copy(kit.hashtags.join(" "), "hashtags")} copied={copied === "hashtags"}>
                  <div className="flex flex-wrap gap-2">
                    {kit.hashtags.map(tag => <span key={tag} onClick={() => copy(tag, tag)} className="text-xs px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20 cursor-pointer hover:bg-pink-500/20 transition-colors">{tag}</span>)}
                  </div>
                </KitCard>

                <KitCard icon={<ImageIcon className="w-4 h-4 text-emerald-400" />} title="Thumbnail / Cover Text" subtitle="3 title options — test all three" color="border-emerald-500/20" onRegenerate={() => regenerateSection("thumbnails")} regenerating={regenerating === "thumbnails"} onCopy={() => copy(kit.thumbnails.join("\n"), "thumbnails")} copied={copied === "thumbnails"}>
                  <div className="space-y-2">
                    {kit.thumbnails.map((t, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/5 group">
                        <span className="text-xs text-white/25 font-mono w-4 flex-shrink-0">{i+1}</span>
                        <span className="text-sm text-white/85 font-semibold flex-1">{t}</span>
                        <button onClick={() => copy(t, `thumb-${i}`)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/70 transition-all">
                          {copied === `thumb-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </KitCard>

                <KitCard icon={<TrendingUp className="w-4 h-4 text-orange-400" />} title="Virality Strategy" subtitle="What to do after posting" color="border-orange-500/20" onRegenerate={() => regenerateSection("viralTips")} regenerating={regenerating === "viralTips"} onCopy={() => copy(kit.viralTips.join("\n"), "viralTips")} copied={copied === "viralTips"}>
                  <div className="space-y-2">
                    {kit.viralTips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                        <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
                        <p className="text-sm text-white/70 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </KitCard>
              </motion.div>
            )}
          </AnimatePresence>

          {!kit && !loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-violet-400/50" />
              </div>
              <p className="text-white/30 text-sm mb-1">Your full content strategy will appear here</p>
              <p className="text-white/15 text-xs">Type your topic above — fitness, dance, food, skincare, and more</p>
            </motion.div>
          )}
        </div>
      ) : (
        /* Hook Generator Tab */
        <div className="space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
            <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">Your Topic</label>
            <input value={hookTopic} onChange={e => setHookTopic(e.target.value)} onKeyDown={e => e.key === "Enter" && generateHookKit()}
              placeholder="e.g. fitness, skincare routine, investing for beginners, dance reels..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-violet-500/50 transition-colors mb-4" />
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">Hook Style</label>
                <div className="flex flex-wrap gap-2">
                  {hookTypes.map(h => <button key={h} onClick={() => setHookType(h)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", hookType === h ? "bg-violet-600/30 border-violet-500/50 text-violet-300" : "bg-white/5 border-white/10 text-white/40 hover:text-white/70")}>{h}</button>)}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 font-medium uppercase tracking-wider mb-2 block">Platform</label>
                <div className="flex flex-wrap gap-2">
                  {platforms.map(p => <button key={p} onClick={() => setHookPlatform(p)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all", hookPlatform === p ? "bg-violet-600/30 border-violet-500/50 text-violet-300" : "bg-white/5 border-white/10 text-white/40 hover:text-white/70")}>{p}</button>)}
                </div>
              </div>
            </div>
            <button onClick={generateHookKit} disabled={!hookTopic.trim() || hookLoading}
              className={cn("flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all", hookTopic.trim() && !hookLoading ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white" : "bg-white/5 text-white/20 cursor-not-allowed")}>
              {hookLoading ? <><RefreshCw className="w-4 h-4 animate-spin" />Generating...</> : <><Anchor className="w-4 h-4" />Generate Hooks</>}
            </button>
          </motion.div>

          <AnimatePresence>
            {hooks && !hookLoading && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="glass rounded-xl overflow-hidden border border-yellow-500/20">
                  <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-semibold text-white/90">Viral Hooks — {hookType}</span>
                    <button onClick={generateHookKit} className="ml-auto p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-all"><RefreshCw className="w-3.5 h-3.5" /></button>
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
                        <button onClick={() => copy(t, `hthumb-${i}`)} className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/70 transition-all">
                          {copied === `hthumb-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-xl overflow-hidden border border-violet-500/20">
                  <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                    <Play className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-semibold text-white/90">High-Retention Opening Lines — {hookPlatform}</span>
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

          {!hooks && !hookLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Anchor className="w-7 h-7 text-violet-400/50" />
              </div>
              <p className="text-white/30 text-sm">Enter a topic and generate viral hooks, thumbnail text, and opening lines</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── KitCard ──────────────────────────────────────────────────────────────────
function KitCard({ icon, title, subtitle, color, children, onRegenerate, regenerating, onCopy, copied }: {
  icon: React.ReactNode; title: string; subtitle?: string; color: string;
  children: React.ReactNode; onRegenerate: () => void; regenerating: boolean; onCopy: () => void; copied: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className={cn("glass rounded-xl border overflow-hidden", color)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2 min-w-0">
          {icon}
          <span className="text-sm font-semibold text-white/90">{title}</span>
          {subtitle && <span className="text-xs text-white/25 ml-1 hidden sm:inline">{subtitle}</span>}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={onCopy} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-all">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button onClick={onRegenerate} disabled={regenerating} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-all">
            <RefreshCw className={cn("w-3.5 h-3.5", regenerating && "animate-spin text-violet-400")} />
          </button>
          <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-all">
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", !expanded && "-rotate-90")} />
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 py-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

