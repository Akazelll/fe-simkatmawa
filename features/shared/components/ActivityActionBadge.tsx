"use client";

import { cn } from "@/lib/utils";
import { PlusCircle, Pencil, Trash2, Activity } from "lucide-react";

interface ActivityActionBadgeProps {
  action: string;
  showIcon?: boolean;
  className?: string;
}

export function ActivityActionBadge({
  action,
  showIcon = true,
  className,
}: ActivityActionBadgeProps) {
  const normalizedAction = action?.toLowerCase() || "";

  let config = {
    colorClass: "bg-slate-50 text-slate-600 border-slate-200",
    label: action?.replace(/_/g, " ") || "Unknown",
    icon: Activity,
  };

  switch (normalizedAction) {
    case "created":
      config = {
        colorClass: "bg-emerald-50 text-emerald-600 border-emerald-200",
        label: "Dibuat",
        icon: PlusCircle,
      };
      break;
    case "updated":
      config = {
        colorClass: "bg-amber-50 text-amber-600 border-amber-200",
        label: "Diubah",
        icon: Pencil,
      };
      break;
    case "deleted":
      config = {
        colorClass: "bg-red-50 text-red-600 border-red-200",
        label: "Dihapus",
        icon: Trash2,
      };
      break;
  }

  const { colorClass, label, icon: Icon } = config;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border",
        colorClass,
        className,
      )}
    >
      {showIcon && <Icon className='w-3.5 h-3.5 stroke-[2.5]' />}
      <span>{label}</span>
    </div>
  );
}
