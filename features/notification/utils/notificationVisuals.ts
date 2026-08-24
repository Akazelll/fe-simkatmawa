import {
  CheckCircle2,
  XCircle,
  Upload,
  PencilLine,
  CloudOff,
  AlertTriangle,
  Activity,
  Bell,
  LucideIcon,
} from "lucide-react";
import type { NotificationCategory, NotificationType } from "../types";

export interface TypeStyle {
  label: string;
  iconColor: string;
  iconBg: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  progressGradient: string;
  accentBar: string;
  glowShadow: string;
}

export const TYPE_STYLE: Record<NotificationType, TypeStyle> = {
  success: {
    label: "Berhasil",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border border-emerald-200/80 shadow-sm shadow-emerald-500/10",
    borderColor: "border-emerald-200/90 hover:border-emerald-300",
    badgeBg: "bg-emerald-50 border-emerald-200/70",
    badgeText: "text-emerald-700",
    progressGradient: "from-emerald-500 via-teal-400 to-emerald-600",
    accentBar: "bg-emerald-500",
    glowShadow: "shadow-[0_10px_30px_-5px_rgba(16,185,129,0.15)]",
  },
  error: {
    label: "Gagal",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50 border border-rose-200/80 shadow-sm shadow-rose-500/10",
    borderColor: "border-rose-200/90 hover:border-rose-300",
    badgeBg: "bg-rose-50 border-rose-200/70",
    badgeText: "text-rose-700",
    progressGradient: "from-rose-500 via-red-400 to-rose-600",
    accentBar: "bg-rose-500",
    glowShadow: "shadow-[0_10px_30px_-5px_rgba(244,63,94,0.15)]",
  },
  warning: {
    label: "Peringatan",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border border-amber-200/80 shadow-sm shadow-amber-500/10",
    borderColor: "border-amber-200/90 hover:border-amber-300",
    badgeBg: "bg-amber-50 border-amber-200/70",
    badgeText: "text-amber-700",
    progressGradient: "from-amber-500 via-orange-400 to-amber-600",
    accentBar: "bg-amber-500",
    glowShadow: "shadow-[0_10px_30px_-5px_rgba(245,158,11,0.15)]",
  },
  info: {
    label: "Informasi",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50 border border-sky-200/80 shadow-sm shadow-sky-500/10",
    borderColor: "border-sky-200/90 hover:border-sky-300",
    badgeBg: "bg-sky-50 border-sky-200/70",
    badgeText: "text-sky-700",
    progressGradient: "from-sky-500 via-blue-500 to-indigo-600",
    accentBar: "bg-sky-500",
    glowShadow: "shadow-[0_10px_30px_-5px_rgba(14,165,233,0.15)]",
  },
};

export const CATEGORY_ICON: Record<NotificationCategory, LucideIcon> = {
  submission_sent: Upload,
  submission_approved: CheckCircle2,
  submission_rejected: XCircle,
  revision_resubmitted: PencilLine,
  queue_alert: CloudOff,
  system_alert: AlertTriangle,
  queue_monitor: Activity,
};

export const getTypeStyle = (type: NotificationType): TypeStyle =>
  TYPE_STYLE[type] ?? TYPE_STYLE.info;

export const getCategoryIcon = (category: NotificationCategory): LucideIcon =>
  CATEGORY_ICON[category] ?? Bell;

