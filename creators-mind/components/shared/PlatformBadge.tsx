import { cn } from "@/lib/utils";

const platforms: Record<string, { label: string; color: string; bg: string }> = {
  youtube: { label: "YouTube", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  instagram: { label: "Instagram", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  tiktok: { label: "TikTok", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  linkedin: { label: "LinkedIn", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
};

export default function PlatformBadge({ platform }: { platform: string }) {
  const p = platforms[platform.toLowerCase()] ?? { label: platform, color: "text-white/60", bg: "bg-white/5 border-white/10" };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border", p.color, p.bg)}>
      {p.label}
    </span>
  );
}
