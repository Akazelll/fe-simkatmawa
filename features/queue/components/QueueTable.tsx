"use client";

import { RefreshCw, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils/dateFormat";
import type { SkeletonColumn } from "@/features/shared/components/TableSkeleton";
import { QueueStatusBadge } from "./QueueStatusBadge";
import { getErrorConfig, isFailedStatus } from "@/features/queue/constants";
import type { SyncQueueItem } from "@/features/queue/types";

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-top text-sm text-slate-600";

export const QUEUE_TABLE_COLUMNS: SkeletonColumn[] = [
  { cell: "h-4 w-40" },
  { cell: "h-4 w-28" },
  { cell: "h-4 w-24" },
  { pill: true },
  { align: "right", actions: 2 },
];

interface QueueTableProps {
  items: SyncQueueItem[];
  onRetry: (id: number) => void;
  onShowDetail: (id: number) => void;
  isSuperadmin: boolean;
  isMutating?: boolean;
}

export function QueueTable({
  items,
  onRetry,
  onShowDetail,
  isSuperadmin,
  isMutating = false,
}: QueueTableProps) {
  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0'>
      <Table>
        <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
          <TableRow className='hover:bg-transparent'>
            <TableHead className={`${HEAD_CLASS} pl-6`}>
              Pengajuan &amp; Kategori
            </TableHead>
            <TableHead className={HEAD_CLASS}>Mahasiswa</TableHead>
            <TableHead className={HEAD_CLASS}>Waktu Antrian</TableHead>
            <TableHead className={HEAD_CLASS}>Status &amp; Error</TableHead>
            <TableHead className={`${HEAD_CLASS} pr-6 text-right`}>
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='h-32 text-center text-sm font-medium text-slate-500'
              >
                Tidak ada data antrean.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const failed = isFailedStatus(item.status);
              const errorConfig = getErrorConfig(item.error_code);
              const ErrorIcon = errorConfig.icon;
              const others =
                item.mahasiswa && item.mahasiswa.count > 1
                  ? item.mahasiswa.count - 1
                  : 0;

              return (
                <TableRow
                  key={item.id}
                  className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'
                >
                  <TableCell className={`${CELL_BASE} pl-6`}>
                    <div className='font-semibold text-slate-800 whitespace-normal break-words max-w-xs'>
                      <span className='line-clamp-2'>
                        {item.pengajuan?.judul || "—"}
                      </span>
                    </div>
                    <div className='text-xs text-slate-400 mt-0.5'>
                      {item.pengajuan?.kategori_label ||
                        item.pengajuan?.kategori ||
                        "—"}
                    </div>
                  </TableCell>

                  <TableCell className={CELL_BASE}>
                    {item.mahasiswa?.nama ? (
                      <div className='flex flex-col gap-1'>
                        <span className='font-medium text-slate-700'>
                          {item.mahasiswa.nama}
                        </span>
                        {others > 0 && (
                          <Badge
                            variant='outline'
                            className='w-fit rounded-md border-slate-200 bg-slate-50 px-1.5 py-0 text-[10px] font-semibold text-slate-500'
                          >
                            +{others} mahasiswa lain
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <span className='text-slate-300'>—</span>
                    )}
                  </TableCell>

                  <TableCell
                    className={`${CELL_BASE} text-xs font-medium text-slate-500 whitespace-nowrap`}
                  >
                    {formatDateTime(item.queued_at)}
                  </TableCell>

                  <TableCell className={CELL_BASE}>
                    <QueueStatusBadge
                      status={item.status}
                      label={item.status_label}
                    />
                    {failed && item.error_message && (
                      <div
                        className={`mt-1.5 flex items-start gap-1 text-[11px] ${errorConfig.className} max-w-[220px]`}
                        title={item.error_message}
                      >
                        <ErrorIcon size={12} className='shrink-0 mt-0.5' />
                        <span className='line-clamp-2'>
                          {item.error_message}
                        </span>
                      </div>
                    )}
                  </TableCell>

                  <TableCell className={`${CELL_BASE} pr-6 text-right`}>
                    <div className='flex items-center justify-end gap-1'>
                      {failed && (
                        <Button
                          onClick={() => onRetry(item.id)}
                          disabled={isMutating}
                          variant='outline'
                          size='sm'
                          className='h-8 rounded-lg px-3 text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 disabled:opacity-40'
                        >
                          <RefreshCw className='mr-1.5 h-3.5 w-3.5 text-slate-400' />
                          Coba Ulang
                        </Button>
                      )}
                      {isSuperadmin && (
                        <Button
                          onClick={() => onShowDetail(item.id)}
                          variant='outline'
                          size='sm'
                          className='h-8 rounded-lg px-3 text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50'
                        >
                          <Eye className='mr-1.5 h-3.5 w-3.5 text-slate-400' />
                          Detail
                        </Button>
                      )}
                      {!failed && !isSuperadmin && (
                        <span className='text-slate-300 mr-3'>—</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
