"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { ToggleAction } from "@/features/queue/types";

interface Props {
  isPaused: boolean;
  onToggle: (action: ToggleAction) => void;
  disabled?: boolean;
}

// Kontrol global queue di header: switch Aktif ⇄ Dijeda (khusus superadmin).
export function QueueControlToggle({ isPaused, onToggle, disabled }: Props) {
  const active = !isPaused;

  return (
    <button
      type='button'
      disabled={disabled}
      onClick={() => onToggle(active ? "pause" : "play")}
      title={active ? "Jeda antrean sinkronisasi" : "Lanjutkan antrean"}
      aria-pressed={active}
      className={`inline-flex items-center gap-2.5 rounded-full border px-3 py-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
          : "border-amber-200 bg-amber-50 hover:bg-amber-100"
      }`}
    >
      <span className='flex items-center gap-1.5'>
        <span
          className={`h-2 w-2 rounded-full ${
            active ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
          }`}
        />
        <span
          className={`text-xs font-bold whitespace-nowrap ${
            active ? "text-emerald-700" : "text-amber-700"
          }`}
        >
          {active ? "Queue Aktif" : "Queue Dijeda"}
        </span>
      </span>

      {/* Track + knob switch */}
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${
          active ? "bg-emerald-500" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            active ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

// Skeleton yang meniru bentuk pill toggle (dot + label + switch track).
export function QueueControlToggleSkeleton() {
  return (
    <div className='inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5'>
      <span className='flex items-center gap-1.5'>
        <Skeleton className='h-2 w-2 rounded-full' />
        <Skeleton className='h-3 w-20 rounded' />
      </span>
      <Skeleton className='h-5 w-9 rounded-full' />
    </div>
  );
}
