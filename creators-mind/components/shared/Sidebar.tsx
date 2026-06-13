"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  CalendarDays,
  BarChart3,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Brain,
  Users,
  TrendingUp,
  Repeat2,
  PieChart,
  MessageSquare,
  BadgeDollarSign,
  LineChart,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: Brain, label: "Overview", color: "text-violet-400" },
  { href: "/dashboard/brain", icon: Sparkles, label: "ChakraBrain", color: "text-purple-400" },
  { href: "/dashboard/calendar", icon: CalendarDays, label: "ChakraFlow", color: "text-blue-400" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "ChakraLens", color: "text-emerald-400" },
  { href: "/dashboard/virality", icon: Zap, label: "ChakraScore", color: "text-yellow-400" },
  { href: "/dashboard/connect", icon: Users, label: "ChakraConnect", color: "text-pink-400" },
  { href: "/dashboard/trend", icon: TrendingUp, label: "ChakraTrend", color: "text-orange-400" },
  { href: "/dashboard/morph", icon: Repeat2, label: "ChakraMorph", color: "text-indigo-400" },
  { href: "/dashboard/audience", icon: PieChart, label: "ChakraAudience", color: "text-rose-400" },
  { href: "/dashboard/voice", icon: MessageSquare, label: "ChakraVoice", color: "text-teal-400" },
  { href: "/dashboard/brand", icon: BadgeDollarSign, label: "ChakraBrand", color: "text-amber-400" },
  { href: "/dashboard/growth", icon: LineChart, label: "ChakraGrowth", color: "text-lime-400" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen border-r border-white/5 transition-all duration-300",
        "bg-[#0d0d18]",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-white/5", collapsed && "justify-center px-0")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-800 flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-white text-sm tracking-wide">
            Creator<span className="text-violet-400">Chakra</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label, color }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                active
                  ? "bg-violet-600/20 border border-violet-500/30 text-white"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5",
                collapsed && "justify-center px-0"
              )}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", active ? color : "")} />
              {!collapsed && (
                <span className="text-sm font-medium">{label}</span>
              )}
              {active && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-1">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-all",
            collapsed && "justify-center px-0"
          )}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
