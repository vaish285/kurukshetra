"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Settings, Check, Plus, Trash2, Bell, Shield, User, LogOut, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/useUser";

const allPlatforms = [
  { id: "youtube", label: "YouTube", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { id: "instagram", label: "Instagram", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  { id: "tiktok", label: "TikTok", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { id: "linkedin", label: "LinkedIn", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
];

export default function SettingsPage() {
  const user = useUser();
  const router = useRouter();
  const [notifications, setNotifications] = useState({ publish: true, insights: true, score: false });
  const [saved, setSaved] = useState(false);

  const connectedPlatforms = user ? [user.platform] : [];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("chakra_user");
    router.push("/login");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center">
              <Settings className="w-4 h-4 text-white/60" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="text-white/40 text-sm">Manage your account and platform connections</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-all border border-red-500/20">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </motion.div>

      <div className="space-y-5">
        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-white/40" />
            <h2 className="text-sm font-semibold text-white/70">Profile</h2>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white font-bold text-xl">
              {user?.avatar ?? "C"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-white">{user?.name ?? "Creator"}</div>
                {user?.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
              </div>
              <div className="text-xs text-white/40">{user?.handle ?? "@creator"}</div>
              <div className="text-xs text-white/25 mt-0.5">{user?.niche ?? "Content Creator"}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/40 mb-1 block">Display Name</label>
              <input defaultValue={user?.name ?? "Creator"}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">Handle</label>
              <input defaultValue={user?.handle ?? "@creator"}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Connected Account */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-white/40" />
            <h2 className="text-sm font-semibold text-white/70">Platform Connections</h2>
          </div>
          <div className="space-y-3">
            {allPlatforms.map(platform => {
              const isConnected = connectedPlatforms.includes(platform.id);
              return (
                <div key={platform.id} className={cn("flex items-center justify-between p-3 rounded-lg border", platform.bg)}>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-sm font-medium", platform.color)}>{platform.label}</span>
                    {isConnected && user?.handle && (
                      <span className="text-xs text-white/30">{user.handle}</span>
                    )}
                    {isConnected && (
                      <span className="text-xs text-white/20">{user?.followers} followers</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isConnected ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400">
                        <Check className="w-3 h-3" /> Connected
                      </span>
                    ) : (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all">
                        <Plus className="w-3 h-3" /> Connect
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-white/40" />
            <h2 className="text-sm font-semibold text-white/70">Notifications</h2>
          </div>
          <div className="space-y-3">
            {[
              { key: "publish" as const, label: "Post published", desc: "Get notified when a post goes live" },
              { key: "insights" as const, label: "New insights available", desc: "When AI generates new performance insights" },
              { key: "score" as const, label: "ChakraScore alerts", desc: "When a draft scores below 60" },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-white/3">
                <div>
                  <div className="text-sm text-white/80">{item.label}</div>
                  <div className="text-xs text-white/30">{item.desc}</div>
                </div>
                <button onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                  className={cn("w-10 h-5 rounded-full transition-all relative flex-shrink-0",
                    notifications[item.key] ? "bg-violet-600" : "bg-white/10")}>
                  <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all",
                    notifications[item.key] ? "left-5" : "left-0.5")} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <button onClick={handleSave}
            className={cn("w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2",
              saved ? "bg-emerald-600 text-white" : "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white")}>
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Changes"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
