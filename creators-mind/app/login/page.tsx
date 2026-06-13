"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, Instagram, Youtube, Linkedin, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";

const socialProviders = [
  {
    id: "instagram",
    label: "Continue with Instagram",
    icon: Instagram,
    color: "from-pink-500 to-rose-500",
    border: "border-pink-500/30 hover:border-pink-500/60",
    bg: "hover:bg-pink-500/10",
    user: {
      name: "Priya Sharma",
      handle: "@priyacreates",
      avatar: "PS",
      platform: "instagram",
      followers: "48.2K",
      following: "1,204",
      posts: "312",
      engagement: "7.4%",
      avgLikes: "3,560",
      avgComments: "142",
      avgViews: "28.4K",
      niche: "Fitness & Lifestyle",
      bio: "Fitness creator 💪 | Sharing my journey | DMs open for collabs",
      verified: false,
    },
  },
  {
    id: "youtube",
    label: "Continue with YouTube",
    icon: Youtube,
    color: "from-red-500 to-red-600",
    border: "border-red-500/30 hover:border-red-500/60",
    bg: "hover:bg-red-500/10",
    user: {
      name: "Arjun Mehta",
      handle: "@arjuntalks",
      avatar: "AM",
      platform: "youtube",
      followers: "120K",
      following: "—",
      posts: "89 videos",
      engagement: "4.8%",
      avgLikes: "5,760",
      avgComments: "320",
      avgViews: "120K",
      niche: "Personal Finance & Tech",
      bio: "Making finance simple for everyone | New video every Tuesday",
      verified: true,
    },
  },
  {
    id: "google",
    label: "Continue with Google",
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    color: "from-white/10 to-white/5",
    border: "border-white/20 hover:border-white/40",
    bg: "hover:bg-white/5",
    user: {
      name: "Creator",
      handle: "@creator",
      avatar: "C",
      platform: "google",
      followers: "—",
      following: "—",
      posts: "—",
      engagement: "—",
      avgLikes: "—",
      avgComments: "—",
      avgViews: "—",
      niche: "General",
      bio: "Welcome to Creator Chakra",
      verified: false,
    },
  },
  {
    id: "linkedin",
    label: "Continue with LinkedIn",
    icon: Linkedin,
    color: "from-blue-600 to-blue-700",
    border: "border-blue-500/30 hover:border-blue-500/60",
    bg: "hover:bg-blue-500/10",
    user: {
      name: "Dev Patel",
      handle: "@devpatel",
      avatar: "DP",
      platform: "linkedin",
      followers: "43K",
      following: "892",
      posts: "156 posts",
      engagement: "9.2%",
      avgLikes: "3,960",
      avgComments: "210",
      avgViews: "43K",
      niche: "Productivity & Mindset",
      bio: "Helping professionals build better habits | Speaker | Writer",
      verified: false,
    },
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogin = async (provider: typeof socialProviders[0]) => {
    setLoading(provider.id);
    // Store dummy user in localStorage
    localStorage.setItem("chakra_user", JSON.stringify(provider.user));
    await new Promise(r => setTimeout(r, 1500));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-600/8 rounded-full blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Creator<span className="text-violet-400">Chakra</span>
          </h1>
          <p className="text-white/40 text-sm">Your AI-powered creator OS</p>
        </div>

        {/* Login card */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 backdrop-blur-xl">
          <h2 className="text-base font-semibold text-white mb-1">Sign in to your account</h2>
          <p className="text-white/40 text-xs mb-6">Connect your social account to get real-time insights</p>

          <div className="space-y-3">
            {socialProviders.map((provider) => (
              <motion.button
                key={provider.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleLogin(provider)}
                disabled={loading !== null}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/3 transition-all text-left ${provider.border} ${provider.bg}`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${provider.color} flex items-center justify-center flex-shrink-0`}>
                  {loading === provider.id ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <provider.icon className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-sm font-medium text-white/80 flex-1">
                  {loading === provider.id ? "Connecting..." : provider.label}
                </span>
                {loading === null && <ArrowRight className="w-3.5 h-3.5 text-white/20" />}
              </motion.button>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="flex items-center gap-4 text-xs text-white/20">
              {[
                { icon: Shield, text: "Secure OAuth" },
                { icon: Zap, text: "Instant setup" },
                { icon: Sparkles, text: "AI-powered" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-1">
                  <item.icon className="w-3 h-3" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/15 mt-4">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}
