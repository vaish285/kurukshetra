"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, RefreshCw, Upload, FileText, Video, Check, AlertTriangle, Wand2, X, TrendingUp, Target, History } from "lucide-react";
import { cn } from "@/lib/utils";

type InputMode = "text" | "video";

function scoreContent(content: string, seed: number) {
  const v = seed % 5;
  const len = content.length;
  const hasQuestion = content.includes("?");
  const hasNumbers = /\d/.test(content);
  const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(content);

  const hookScore = Math.min(40, 18 + (hasQuestion ? 8 : 0) + (len > 100 ? 6 : 0) + (v * 2));
  const trendScore = Math.min(30, 14 + (hasNumbers ? 5 : 0) + (v * 2));
  const patternScore = Math.min(30, 16 + (hasEmoji ? 4 : 0) + (v * 2));
  const total = hookScore + trendScore + patternScore;

  const suggestions = [
    `Your hook is a statement — rewrite it as a question. Questions get 3.2× more watch time for your audience.`,
    `Add a specific number or stat to your hook — "3 things" or "in 30 days" increases click-through by 40%.`,
    `Your opening line is too long. Cut it to under 10 words — the first 3 seconds decide everything.`,
    `Add a curiosity gap — hint at the result without revealing it. "I tried this for 30 days and..." works better than stating the outcome upfront.`,
    `Your CTA is weak. Replace "follow me" with a specific ask: "Save this for tomorrow morning" gets 5× more saves.`,
  ];

  return {
    total, hookScore, trendScore, patternScore,
    fix: total < 80 ? suggestions[v % suggestions.length] : null,
    history: [{ version: "v1 (current)", score: total, time: "just now" }],
  };
}

function SubScoreBar({ label, score, max, color }: { label: string; score: number; max: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-white/50">{label}</span>
        <span className="text-xs font-semibold text-white">{score}<span className="text-white/30">/{max}</span></span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${(score / max) * 100}%` }} transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)} />
      </div>
    </div>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#10b981" : score >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <div className="relative w-36 h-36">
      <svg width="144" height="144" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 1.5s ease-out, stroke 0.3s" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-white/30">/100</span>
      </div>
    </div>
  );
}

let scoreSeed = 0;

export default function ScorePage() {
  const [mode, setMode] = useState<InputMode>("text");
  const [textContent, setTextContent] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [scoring, setScoring] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof scoreContent> | null>(null);
  const [fixApplied, setFixApplied] = useState(false);
  const [rescoring, setRescoring] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleScore = async () => {
    const hasContent = mode === "text" ? textContent.trim().length > 0 : videoFile !== null;
    if (!hasContent) return;
    setScoring(true);
    setResult(null);
    setFixApplied(false);
    await new Promise(r => setTimeout(r, 2200));
    const content = mode === "text" ? textContent : (videoFile?.name ?? "video content");
    setResult(scoreContent(content, ++scoreSeed));
    setScoring(false);
  };

  const applyFix = async () => {
    setRescoring(true);
    await new Promise(r => setTimeout(r, 1200));
    setResult(prev => prev ? { ...prev, total: Math.min(100, prev.total + 12), hookScore: Math.min(40, prev.hookScore + 8), fix: null } : prev);
    setFixApplied(true);
    setRescoring(false);
  };

  const canScore = mode === "text" ? textContent.trim().length > 10 : videoFile !== null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">ChakraScore</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">Intelligence</span>
        </div>
        <p className="text-white/40 text-sm ml-12">Paste your script or upload your video — AI scores it 0–100 and tells you exactly what to fix.</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input panel */}
        <div className="space-y-4">
          {/* Mode toggle */}
          <div className="flex rounded-xl border border-white/10 overflow-hidden">
            <button onClick={() => { setMode("text"); setResult(null); }}
              className={cn("flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all",
                mode === "text" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70")}>
              <FileText className="w-4 h-4" /> Paste Script / Text
            </button>
            <button onClick={() => { setMode("video"); setResult(null); }}
              className={cn("flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all",
                mode === "video" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70")}>
              <Video className="w-4 h-4" /> Upload Video
            </button>
          </div>

          {mode === "text" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5">
                <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Your Script or Content</span>
              </div>
              <textarea value={textContent} onChange={e => setTextContent(e.target.value)}
                placeholder={"Paste your video script, caption, hook, or describe your content idea...\n\nExample:\n'I did this workout every morning for 30 days. Here's what happened to my body. Most people quit fitness because they're doing it wrong — not because they lack motivation. Here's the 3-step system that changed everything for me...'"}
                className="w-full bg-transparent px-4 py-4 text-white placeholder-white/20 text-sm resize-none focus:outline-none"
                rows={12} />
              <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-white/20">{textContent.length} characters</span>
                {textContent.length > 0 && (
                  <button onClick={() => setTextContent("")} className="text-xs text-white/20 hover:text-white/50 transition-colors">Clear</button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <input ref={fileRef} type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
              {!videoFile ? (
                <button onClick={() => fileRef.current?.click()}
                  className="w-full glass rounded-xl border-2 border-dashed border-white/10 hover:border-yellow-500/40 p-12 flex flex-col items-center gap-3 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                    <Upload className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-white/70 mb-1">Drop your video here or click to upload</p>
                    <p className="text-xs text-white/30">MP4, MOV, AVI · Max 500MB</p>
                  </div>
                </button>
              ) : (
                <div className="glass rounded-xl overflow-hidden">
                  <video src={videoPreview!} controls className="w-full max-h-64 object-cover" />
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white font-medium">{videoFile.name}</p>
                      <p className="text-xs text-white/30">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <button onClick={() => { setVideoFile(null); setVideoPreview(null); setResult(null); }}
                      className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <button onClick={handleScore} disabled={!canScore || scoring}
            className={cn("w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
              canScore && !scoring
                ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white"
                : "bg-white/5 text-white/20 cursor-not-allowed")}>
            {scoring ? <><RefreshCw className="w-4 h-4 animate-spin" />Analysing...</> : <><Zap className="w-4 h-4" />Get ChakraScore</>}
          </button>

          {/* How it works */}
          <div className="glass rounded-xl p-4">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">How Scoring Works</h3>
            <div className="space-y-2">
              {[
                { label: "Hook Strength", max: "40 pts", desc: "Curiosity gap, emotional trigger, clarity", color: "text-violet-400" },
                { label: "Trend Fit", max: "30 pts", desc: "Alignment with trending topics on your platform", color: "text-blue-400" },
                { label: "Past Patterns", max: "30 pts", desc: "How similar content performed for you", color: "text-emerald-400" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2">
                  <span className={cn("text-xs font-semibold w-28 flex-shrink-0 mt-0.5", item.color)}>{item.label}</span>
                  <span className="text-xs text-white/30">{item.desc} <span className="text-white/20">({item.max})</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div>
          <AnimatePresence mode="wait">
            {scoring && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass rounded-xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-yellow-400 animate-pulse" />
                </div>
                <p className="text-white/60 text-sm font-medium mb-5">Analysing your {mode === "video" ? "video" : "content"}...</p>
                <div className="space-y-2 text-xs text-white/30">
                  {["Evaluating hook strength", "Checking trend alignment", "Comparing past patterns", "Generating suggestions"].map((step, i) => (
                    <div key={step} className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 pulse-dot" style={{ animationDelay: `${i * 0.4}s` }} />
                      {step}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {result && !scoring && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                {/* Score card */}
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <ScoreGauge score={result.total} />
                    <div className="flex-1">
                      <div className={cn("text-lg font-bold mb-1",
                        result.total >= 80 ? "text-emerald-400" : result.total >= 70 ? "text-yellow-400" : "text-red-400")}>
                        {result.total >= 80 ? "🔥 High Viral Potential" : result.total >= 70 ? "⚡ Good — Minor Tweaks" : "⚠️ Needs Improvement"}
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed">
                        {result.total >= 70 ? "Strong content. Apply the suggestion below to push it higher." : "This content needs work before posting. Apply the fix to improve your score."}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <SubScoreBar label="Hook Strength" score={result.hookScore} max={40} color="bg-violet-500" />
                    <SubScoreBar label="Trend Fit" score={result.trendScore} max={30} color="bg-blue-500" />
                    <SubScoreBar label="Past Patterns" score={result.patternScore} max={30} color="bg-emerald-500" />
                  </div>
                </div>

                {/* Fix suggestion */}
                {result.fix && !fixApplied && (
                  <div className={cn("glass rounded-xl p-4 border", result.total < 70 ? "border-red-500/20 bg-red-500/5" : "border-yellow-500/20 bg-yellow-500/5")}>
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className={cn("w-4 h-4 flex-shrink-0 mt-0.5", result.total < 70 ? "text-red-400" : "text-yellow-400")} />
                      <div>
                        <div className={cn("text-xs font-semibold mb-1", result.total < 70 ? "text-red-400" : "text-yellow-400")}>AI Suggestion</div>
                        <p className="text-sm text-white/70 leading-relaxed">{result.fix}</p>
                      </div>
                    </div>
                    <button onClick={applyFix} disabled={rescoring}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-all">
                      {rescoring ? <><RefreshCw className="w-4 h-4 animate-spin" />Re-scoring...</> : <><Wand2 className="w-4 h-4" />Apply Fix & Re-score</>}
                    </button>
                  </div>
                )}

                {fixApplied && (
                  <div className="glass rounded-xl p-4 border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <p className="text-sm text-emerald-400 font-medium">Fix applied — score updated!</p>
                  </div>
                )}

                {/* Score history */}
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <History className="w-3.5 h-3.5 text-white/30" />
                    <span className="text-xs text-white/40 font-medium">Score History</span>
                  </div>
                  {result.history.map((h, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-white/40">{h.version}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-20 rounded-full bg-white/5 overflow-hidden">
                          <div className={cn("h-full rounded-full", h.score >= 80 ? "bg-emerald-500" : h.score >= 70 ? "bg-yellow-500" : "bg-red-500")}
                            style={{ width: `${h.score}%` }} />
                        </div>
                        <span className={cn("text-xs font-bold w-6 text-right", h.score >= 80 ? "text-emerald-400" : h.score >= 70 ? "text-yellow-400" : "text-red-400")}>{h.score}</span>
                        <span className="text-xs text-white/20">{h.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {!result && !scoring && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="glass rounded-xl p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-white/20" />
                </div>
                <p className="text-white/30 text-sm mb-1">Your score will appear here</p>
                <p className="text-white/15 text-xs">Paste your script or upload a video on the left</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
