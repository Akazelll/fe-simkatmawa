"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { QueueStatusBadge } from "./QueueStatusBadge";
import { getErrorConfig } from "@/features/queue/constants";
import { formatDateTime } from "@/lib/utils/dateFormat";
import type { SyncQueueDetail } from "@/features/queue/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: SyncQueueDetail | null;
  isLoading: boolean;
  error?: string;
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='grid grid-cols-3 gap-2 py-1.5'>
      <span className='text-xs font-semibold text-slate-500'>{label}</span>
      <span className='col-span-2 text-sm text-slate-800'>{children}</span>
    </div>
  );
}

// error_detail bisa berupa string (mis. HTML Cloudflare) atau objek JSON.
function stringifyErrorDetail(value: unknown): string {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function SyncQueueDetailModal({
  open,
  onOpenChange,
  detail,
  isLoading,
  error,
}: Props) {
  const errorConfig = detail?.error_code
    ? getErrorConfig(detail.error_code)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-2xl max-h-[85vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-[#1a2b5e]'>
            Detail Sinkronisasi
          </DialogTitle>
          <DialogDescription>
            Informasi teknis status sinkronisasi item ke Kemdiktisaintek.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className='space-y-3 py-2'>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-5 w-full' />
            ))}
            <Skeleton className='h-32 w-full rounded-lg' />
          </div>
        ) : error ? (
          <div className='rounded-lg border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-700'>
            {error}
          </div>
        ) : detail ? (
          <div className='divide-y divide-slate-100'>
            <InfoRow label='Pengajuan'>
              <span className='font-semibold'>
                {detail.pengajuan?.judul || "—"}
              </span>
            </InfoRow>
            <InfoRow label='Kategori'>
              {detail.pengajuan?.kategori_label ||
                detail.pengajuan?.kategori ||
                "—"}
            </InfoRow>
            <InfoRow label='Status'>
              <QueueStatusBadge
                status={detail.status}
                label={detail.status_label}
              />
            </InfoRow>
            <InfoRow label='Percobaan'>
              {detail.attempt_count}
              {detail.max_attempts ? ` / ${detail.max_attempts}` : ""}
            </InfoRow>
            {detail.error_code && (
              <InfoRow label='Kode Error'>
                <span
                  className={`inline-flex items-center gap-1.5 font-semibold ${errorConfig?.className ?? "text-red-600"}`}
                >
                  {errorConfig && <errorConfig.icon size={14} />}
                  {detail.error_code}
                </span>
                {errorConfig?.hint && (
                  <p className='mt-0.5 text-xs font-normal text-slate-500'>
                    {errorConfig.hint}
                  </p>
                )}
              </InfoRow>
            )}
            {detail.error_message && (
              <InfoRow label='Pesan Error'>
                <span className='text-red-600'>{detail.error_message}</span>
              </InfoRow>
            )}
            <InfoRow label='ID Kemdikti'>
              <span className='font-mono text-xs'>
                {detail.kemdikbud_id ?? "—"}
              </span>
            </InfoRow>
            <InfoRow label='Masuk Antrean'>
              {formatDateTime(detail.queued_at)}
            </InfoRow>
            <InfoRow label='Mulai Diproses'>
              {formatDateTime(detail.started_at)}
            </InfoRow>
            <InfoRow label='Selesai'>
              {formatDateTime(detail.completed_at)}
            </InfoRow>
            {detail.next_retry_at && (
              <InfoRow label='Retry Berikutnya'>
                {formatDateTime(detail.next_retry_at)}
              </InfoRow>
            )}

            {detail.error_detail != null && (
              <div className='pt-3'>
                <span className='mb-1.5 block text-xs font-semibold text-slate-500'>
                  Detail Error (Debug)
                </span>
                <pre className='max-h-64 overflow-auto rounded-lg border border-slate-200 bg-slate-900 p-3 text-[11px] leading-relaxed text-slate-100'>
                  <code>{stringifyErrorDetail(detail.error_detail)}</code>
                </pre>
              </div>
            )}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
