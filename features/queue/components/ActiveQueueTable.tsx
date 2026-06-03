"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActiveQueueJob } from "@/lib/queue/types";
import { formatDateTime } from "@/lib/utils/dateFormat";
import { SubmissionTypeBadge } from "../../shared/components/SubmissionTypeBadge";
import { QueueStatusBadge } from "./QueueStatusBadge";

// Menggunakan variabel global standar untuk konsistensi
const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-top text-sm text-slate-600";

export function ActiveQueueTable({ jobs }: { jobs: ActiveQueueJob[] }) {
  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0'>
      <Table>
        <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
          <TableRow className='hover:bg-transparent'>
            <TableHead className={`${HEAD_CLASS} pl-6 w-[15%]`}>Tipe</TableHead>
            <TableHead className={`${HEAD_CLASS} w-[30%]`}>
              Nama Kegiatan
            </TableHead>
            <TableHead className={`${HEAD_CLASS} w-[25%]`}>Mahasiswa</TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>
              Masuk Antrean
            </TableHead>
            <TableHead className={`${HEAD_CLASS} pr-6 w-[15%] text-right`}>
              Status
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
                Tidak ada antrean aktif yang sedang berjalan.
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow
                key={job.id}
                className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'
              >
                <TableCell className={`${CELL_BASE} pl-6`}>
                  <SubmissionTypeBadge type={job.type} />
                </TableCell>
                <TableCell
                  className={`${CELL_BASE} font-semibold text-slate-800 whitespace-normal break-words`}
                >
                  <span className='line-clamp-2'>{job.title}</span>
                </TableCell>
                <TableCell
                  className={`${CELL_BASE} font-medium text-slate-600`}
                >
                  {job.studentName}
                </TableCell>
                <TableCell
                  className={`${CELL_BASE} text-xs font-medium text-slate-500 whitespace-nowrap`}
                >
                  {formatDateTime(job.queuedAt)}
                </TableCell>
                <TableCell className={`${CELL_BASE} pr-6 text-right`}>
                  <QueueStatusBadge status={job.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
