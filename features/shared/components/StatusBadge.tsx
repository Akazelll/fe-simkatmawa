"use client";

import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  CloudOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  // Normalisasi ke uppercase agar cocok dengan response API Backend maupun Dummy
  const normalizedStatus = status?.toUpperCase() || "UNKNOWN";

  let config = {
    label: "Unknown",
    icon: AlertCircle,
    colorClass: "bg-slate-50 text-slate-600 border-slate-200",
  };

  switch (normalizedStatus) {
    case "PENDING":
      config = {
        label: "Menunggu",
        icon: Clock,
        colorClass: "bg-amber-50 text-amber-600 border-amber-200",
      };
      break;
    case "REJECTED":
      config = {
        label: "Ditolak",
        icon: XCircle,
        colorClass: "bg-red-50 text-red-600 border-red-200",
      };
      break;
    case "APPROVED_UNSYNCED":
      config = {
        label: "Disetujui",
        icon: CheckCircle2,
        colorClass: "bg-blue-50 text-blue-600 border-blue-200",
      };
      break;
    case "SYNC_SUCCESS":
      config = {
        label: "Tersinkronisasi",
        icon: CheckCircle2,
        colorClass: "bg-emerald-50 text-emerald-600 border-emerald-200",
      };
      break;
    case "SYNC_FAILED":
      config = {
        label: "Gagal Sync",
        icon: CloudOff,
        colorClass: "bg-orange-50 text-orange-600 border-orange-200",
      };
      break;
    default:
      // Fallback jika status kosong atau tidak terdaftar
      break;
  }

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border",
        config.colorClass,
        className,
      )}
    >
      <Icon className='w-3.5 h-3.5 stroke-[2.5]' />
      <span>{config.label}</span>
    </div>
  );
}
