"use client";

import { PauseCircle } from "lucide-react";
import { formatDateTime } from "@/lib/utils/dateFormat";
import { usePauserName } from "@/features/queue/hooks/usePauserName";
import type { SyncQueueStats } from "@/features/queue/types";

interface Props {
  stats: SyncQueueStats | null;
}

// Banner peringatan saat antrean dijeda. Kontrol resume ada di toggle header
// (QueueControlToggle) agar tidak ada dua kontrol kembar.
export function QueuePauseBanner({ stats }: Props) {
  // Hook dipanggil tanpa syarat; aman saat stats null / belum paused.
  const pauserName = usePauserName(stats?.paused_by);

  if (!stats?.is_paused) return null;

  const bySystem = (stats.paused_by ?? "").toUpperCase() === "SYSTEM";

  return (
    <div className='flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5 animate-in fade-in duration-300'>
      <div className='rounded-xl bg-amber-100 p-2.5 text-amber-600 shrink-0'>
        <PauseCircle className='h-5 w-5' />
      </div>
      <div className='space-y-1'>
        <p className='text-sm font-extrabold text-amber-900'>
          Antrean sinkronisasi sedang dijeda
          {bySystem ? " otomatis oleh sistem" : ""}
          {stats.pause_reason ? ` karena: ${stats.pause_reason}.` : "."}
        </p>
        <p className='text-xs font-medium text-amber-700'>
          Item tidak akan diproses sampai masalah diselesaikan dan antrean
          dilanjutkan kembali lewat tombol di pojok kanan atas.
        </p>
        {(stats.paused_by || stats.paused_at) && (
          <p className='text-[11px] font-medium text-amber-600/80'>
            Dijeda oleh {pauserName}
            {stats.paused_at ? ` • ${formatDateTime(stats.paused_at)}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}
