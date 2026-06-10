"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Trash2 } from "lucide-react";
import { FailedQueueJob } from "@/features/queue/types";
import { formatDateTime } from "@/lib/utils/dateFormat";
import { SubmissionTypeBadge } from "../../shared/components/SubmissionTypeBadge";
import { toast } from "sonner";
const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-top text-sm text-slate-600";

interface Props {
  jobs: FailedQueueJob[];
  onRetry: (id: string) => void;
  onDelete: (id: string) => void;
  onRetryAll: () => void;
}

function FailedJobRow({
  job,
  onRetry,
  onDelete,
}: {
  job: FailedQueueJob;
  onRetry: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <TableRow className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'>
      <TableCell className={`${CELL_BASE} pl-6`}>
        <SubmissionTypeBadge type={job.type} />
      </TableCell>
      <TableCell
        className={`${CELL_BASE} font-semibold text-slate-800 whitespace-normal break-words`}
      >
        <span className='line-clamp-2'>{job.title}</span>
      </TableCell>
      <TableCell
        className={`${CELL_BASE} text-xs font-medium text-slate-500 whitespace-nowrap`}
      >
        {formatDateTime(job.failedAt)}
      </TableCell>
      <TableCell className={`${CELL_BASE} whitespace-normal break-words`}>
        <span className='inline-flex items-center rounded-md border border-red-200 bg-red-50 px-2.5 py-0.5 text-[11px] font-medium text-red-600'>
          {job.reason}
        </span>
      </TableCell>
      <TableCell
        className={`${CELL_BASE} pr-6 text-right space-x-1.5 whitespace-nowrap`}
      >
        <Button
          size='icon'
          variant='outline'
          className='h-8 w-8 rounded-lg border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100'
          onClick={() => {
            onRetry(job.id);
            toast.success("Job berhasil dimasukkan kembali ke antrean");
          }}
        >
          <RefreshCw className='h-3.5 w-3.5' />
        </Button>
        <Button
          size='icon'
          variant='outline'
          className='h-8 w-8 rounded-lg border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
          onClick={() => setOpenDelete(true)}
        >
          <Trash2 className='h-3.5 w-3.5' />
        </Button>
        {/* ... Dialog delete tetap sama ... */}
      </TableCell>
    </TableRow>
  );
}

export function FailedJobsTable({
  jobs,
  onRetry,
  onDelete,
  onRetryAll,
}: Props) {
  const [openRetryAll, setOpenRetryAll] = useState(false);

  return (
    <div className='space-y-4'>
      {jobs.length > 0 && (
        <div className='flex justify-end'>
          <Button
            size='sm'
            className='flex items-center gap-2 rounded-xl bg-[#1a2b5e] font-bold text-white shadow-sm hover:bg-[#111d42]'
            onClick={() => setOpenRetryAll(true)}
          >
            <RefreshCw className='h-3.5 w-3.5' /> Coba Ulang Semua
          </Button>
          {/* ... Dialog retry all tetap sama ... */}
        </div>
      )}

      <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0'>
        <Table>
          <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
            <TableRow className='hover:bg-transparent'>
              <TableHead className={`${HEAD_CLASS} pl-6 w-[15%]`}>
                Tipe
              </TableHead>
              <TableHead className={`${HEAD_CLASS} w-[30%]`}>
                Nama Kegiatan
              </TableHead>
              <TableHead className={`${HEAD_CLASS} w-[20%]`}>
                Gagal Pada
              </TableHead>
              <TableHead className={`${HEAD_CLASS} w-[20%]`}>
                Penyebab
              </TableHead>
              <TableHead className={`${HEAD_CLASS} pr-6 w-[15%] text-right`}>
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
                  Bersih! Tidak ada job sinkronisasi yang gagal.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <FailedJobRow
                  key={job.id}
                  job={job}
                  onRetry={onRetry}
                  onDelete={onDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
