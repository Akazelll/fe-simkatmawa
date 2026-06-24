"use client";

import { cn } from "@/lib/utils";
import { STATUS_BADGE_CONFIG } from "@/features/queue/constants";
import type { SyncQueueStatus } from "@/features/queue/types";

interface Props {
  status: SyncQueueStatus;
  // Label dari backend (status_label) lebih diutamakan bila tersedia.
  label?: string | null;
  className?: string;
}

// Desain disamakan dengan StatusBadge bersama: rounded-md, uppercase, bold,
// tracking-wide, dengan ikon di kiri.
export function QueueStatusBadge({ status, label, className }: Props) {
  const config = STATUS_BADGE_CONFIG[status] ?? STATUS_BADGE_CONFIG.pending;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase",
        config.className,
        className,
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5 stroke-[2.5]",
          status === "processing" && "animate-spin",
        )}
      />
      <span>{label || config.label}</span>
    </div>
  );
}
