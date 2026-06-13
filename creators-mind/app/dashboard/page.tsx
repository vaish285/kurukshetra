"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, CalendarDays, BarChart3, Zap, ArrowRight, TrendingUp, Eye, Heart, MessageCircle, Users, CheckCircle, Instagram, Youtube, Linkedin } from "lucide-react";
import { useUser } from "@/lib/useUser";
import { cn } from "@/lib/utils";

const platformIcons: Record<string, React.ElementType> = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  google: Users,
};

const platformColors: Record<string, string> = {
  instagram: "text-pink-400",
  youtube: "text-red-400",
  linkedin: "text-blue-400",
  google: "text-violet-400",
};

const recentPosts = [
  { title: "Morning workout routine — 5 exercises", platform: "instagram", score: 82, status: "published", views: "28.4K", likes: "3.5K" },
  { title: "What I eat in a day — high protein", platform: "instagram", score: 91, status: "scheduled", views: "—", likes: "—" },
  { title: "My fitness transformation — 3 months", platform: "instagram", score: 67, status: "draft", views: "—", likes: "—" },
  { title: "5 habits that changed my life", platform: "instagram", score: 78, status: "published", views: "18.1K", likes: "2.1K" },
];

const statusColors: Record<string, string> = {
  published: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  scheduled: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  draft: "text-white/40 bg-white/5 border-white/10",
};

const quickActions = [
  { href: "/dashboard/brain", icon: Sparkles, label: "ChakraBrain", desc: "Generate content kit", color: "from-violet-600 to-purple-700" },
  { href: "/dashboard/calendar", icon: CalendarDays, label: "ChakraFlow", desc: "Smart schedule", color: "from-blue-600 to-cyan-700" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "ChakraLens", desc: "Performance insights", color: "from-emerald-600 to-teal-700" },
  { href: "/dashboard/virality", icon: Zap, label: "ChakraScore", desc: "Score your content", color: "from-yellow-500 to-orange-600" },
];

export default function DashboardPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("chakra_user")) {
      router.push("/login");
    }
  }, [router]);

  if (!user) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
    </div>
  );

  const PlatformIcon = platformIcons[user.platform] ?? Users;
  const platformColor = platformColors[user.platform] ?? "text-violet-400";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Account header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-white font-bold text-xl">
              {user.avatar}
            </div>
            <div className={cn("absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0a0a0f] flex items-center justify-center")}>
              <PlatformIcon className={cn("w-3 h-3", platformColor)} />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-lg font-bold text-white">{user.name}</span>
              {user.verified && <CheckCircle className="w-4 h-4 text-blue-400" />}
              <span className={cn("text-xs px-2 py-0.5 rounded-full border capitalize",
                user.platform === "instagram" ? "bg-pink-500/10 text-pink-400 border-pink-500/20" :
                user.platform === "youtube" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                user.platform === "linkedin" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                "bg-violet-500/10 text-violet-400 border-violet-500/20")}>
                {user.platform}
              </span>
            </div>
            <div className="text-sm text-white/40 mb-1">{user.handle}</div>
            <div className="text-xs text-white/30">{user.bio}</div>
          </div>

          {/* Account stats */}
          <div className="flex gap-6 flex-wrap">
            {[
              { label: "Followers", value: user.followers },
              { label: "Following", value: user.following },
              { label: "Posts", value: user.posts },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/30">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Performance stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Avg Views / Post", value: user.avgViews, icon: Eye, color: "text-violet-400", bg: "bg-violet-500/10", change: "+18%" },
          { label: "Avg Likes / Post", value: user.avgLikes, icon: Heart, color: "text-pink-400", bg: "bg-pink-500/10", change: "+12%" },
          { label: "Avg Comments", value: user.avgComments, icon: MessageCircle, color: "text-blue-400", bg: "bg-blue-500/10", change: "+24%" },
          { label: "Engagement Rate", value: user.engagement, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", change: "+1.2%" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/40">{stat.label}</span>
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-3.5 h-3.5", stat.color)} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />{stat.change} this month
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map(action => (
              <Link key={action.href} href={action.href}
                className="flex items-center gap-3 glass rounded-xl p-3 hover:border-white/10 transition-all group">
                <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0", action.color)}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">{action.label}</div>
                  <div className="text-xs text-white/30">{action.desc}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Recent Posts</h2>
            <Link href="/dashboard/calendar" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View all →</Link>
          </div>
          <div className="glass rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-xs text-white/25 font-medium px-4 py-2.5">Title</th>
                  <th className="text-left text-xs text-white/25 font-medium px-4 py-2.5 hidden md:table-cell">Score</th>
                  <th className="text-left text-xs text-white/25 font-medium px-4 py-2.5">Status</th>
                  <th className="text-left text-xs text-white/25 font-medium px-4 py-2.5 hidden lg:table-cell">Views</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm text-white/80 line-clamp-1">{post.title}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className={cn("w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold",
                        post.score >= 80 ? "bg-emerald-500/20 text-emerald-400" : post.score >= 70 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400")}>
                        {post.score}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full border capitalize", statusColors[post.status])}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-white/40">{post.views}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* AI Tip */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="mt-5 glass rounded-xl p-4 border-l-2 border-violet-500">
        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-violet-400 mb-1">ChakraBrain Insight for {user.name}</div>
            <p className="text-sm text-white/60">
              Your question-format hooks get <span className="text-white font-medium">3.2× more watch time</span> than statement hooks.
              Best posting window for your audience: <span className="text-white font-medium">Tue & Thu 6–9 PM</span>.
              Your niche (<span className="text-white font-medium">{user.niche}</span>) is trending — post 3x this week.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
