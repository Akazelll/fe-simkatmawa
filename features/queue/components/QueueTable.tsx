"use client";

import { RefreshCw, Trash2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils/dateFormat";

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-middle text-sm text-slate-600";

interface QueueTableProps {
  jobs: any[];
  onRetry: (id: string) => void;
  onDelete: (id: string) => void;
  onRetryAll: () => void;
  showRetryAll: boolean;
}

export function QueueTable({
  jobs,
  onRetry,
  onDelete,
  onRetryAll,
  showRetryAll,
}: QueueTableProps) {
  const hasFailedJobs = jobs.some((j) => j.status === "failed");

  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0'>
      {showRetryAll && hasFailedJobs && (
        <div className='p-3 border-b border-slate-100 flex justify-end bg-slate-50/50'>
          <Button
            onClick={onRetryAll}
            size='sm'
            variant='outline'
            className='text-sky-600 border-sky-200 hover:bg-sky-50 h-8 text-xs font-semibold'
          >
            <RefreshCw size={14} className='mr-2' /> Retry All Failed
          </Button>
        </div>
      )}
      <Table>
        <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
          <TableRow className='hover:bg-transparent'>
            <TableHead className={`${HEAD_CLASS} pl-6`}>Pengajuan</TableHead>
            <TableHead className={HEAD_CLASS}>Mahasiswa</TableHead>
            <TableHead className={HEAD_CLASS}>Waktu</TableHead>
            <TableHead className={HEAD_CLASS}>Status</TableHead>
            <TableHead className={`${HEAD_CLASS} pr-6 text-right`}>
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='h-32 text-center text-sm font-medium text-slate-500'
              >
                Tidak ada data antrean.
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow
                key={job.id}
                className='border-b border-slate-100 hover:bg-slate-50/70'
              >
                <TableCell className={`${CELL_BASE} pl-6`}>
                  <div className='font-semibold text-slate-800'>
                    {job.title}
                  </div>
                  <div className='text-xs text-slate-400 uppercase tracking-wider mt-0.5'>
                    {job.type}
                  </div>
                </TableCell>
                <TableCell className={CELL_BASE}>{job.studentName}</TableCell>
                <TableCell className={CELL_BASE}>
                  {job.date ? formatDateTime(job.date) : "-"}
                </TableCell>
                <TableCell className={CELL_BASE}>
                  <span
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                      job.status === "waiting"
                        ? "bg-amber-100 text-amber-700"
                        : job.status === "processing"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {job.status === "waiting"
                      ? "Menunggu"
                      : job.status === "processing"
                        ? "Proses"
                        : "Gagal"}
                  </span>
                  {job.status === "failed" && job.reason && (
                    <div
                      className='text-[11px] text-rose-500 mt-1.5 flex items-start gap-1 max-w-[200px]'
                      title={job.reason}
                    >
                      <AlertCircle size={12} className='shrink-0 mt-0.5' />
                      <span className='line-clamp-2'>{job.reason}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className={`${CELL_BASE} pr-6 text-right`}>
                  {job.status === "failed" ? (
                    <div className='flex items-center justify-end gap-1'>
                      <Button
                        onClick={() => onRetry(job.id)}
                        variant='ghost'
                        className='h-8 w-8 p-0 text-sky-600 hover:bg-sky-50 rounded-lg'
                      >
                        <RefreshCw size={16} />
                      </Button>
                      <Button
                        onClick={() => onDelete(job.id)}
                        variant='ghost'
                        className='h-8 w-8 p-0 text-rose-600 hover:bg-rose-50 rounded-lg'
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ) : (
                    <span className='text-slate-300 mr-3'>-</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
