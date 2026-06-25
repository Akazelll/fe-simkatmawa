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


export const TYPE_STYLE: Record<
  NotificationType,
  { iconColor: string; iconBg: string }
> = {
  success: { iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
  warning: { iconColor: "text-amber-600", iconBg: "bg-amber-50" },
  error: { iconColor: "text-rose-600", iconBg: "bg-rose-50" },
  info: { iconColor: "text-sky-600", iconBg: "bg-sky-50" },
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

export const getTypeStyle = (type: NotificationType) =>
  TYPE_STYLE[type] ?? TYPE_STYLE.info;

export const getCategoryIcon = (category: NotificationCategory): LucideIcon =>
  CATEGORY_ICON[category] ?? Bell;
