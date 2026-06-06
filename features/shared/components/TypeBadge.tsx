import { Trophy, ScrollText, Award, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SubmissionType = "Prestasi" | "Sertifikasi" | "Rekognisi";

interface TypeBadgeProps {
  type: SubmissionType | string;
  className?: string;
  showIcon?: boolean;
}

const STYLES: Record<SubmissionType, { pill: string; icon: LucideIcon }> = {
  Prestasi: {
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Trophy,
  },
  Sertifikasi: {
    pill: "bg-sky-50 text-sky-700 border-sky-200",
    icon: ScrollText,
  },
  Rekognisi: {
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    icon: Award,
  },
};

const ALIASES: Record<string, SubmissionType> = {
  sertifikat: "Sertifikasi",
  sertifikasi: "Sertifikasi",
  prestasi: "Prestasi",
  rekognisi: "Rekognisi",
};

function normalize(raw: string): SubmissionType | null {
  if (!raw) return null;
  if (raw in STYLES) return raw as SubmissionType;
  return ALIASES[raw.toLowerCase()] ?? null;
}

export function TypeBadge({
  type,
  className,
  showIcon = true,
}: TypeBadgeProps) {
  const variant = normalize(type);
  const config = variant
    ? STYLES[variant]
    : { pill: "bg-slate-50 text-slate-700 border-slate-200", icon: null };

  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold",
        config.pill,
        className,
      )}
    >
      {showIcon && Icon && <Icon size={12} />}
      <span className='capitalize'>{variant ?? type}</span>
    </span>
  );
}
