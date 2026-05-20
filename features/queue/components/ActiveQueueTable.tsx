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

export function ActiveQueueTable({ jobs }: { jobs: ActiveQueueJob[] }) {
  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
      <Table>
        <TableHeader className='bg-slate-50 border-b border-slate-200'>
          <TableRow className='hover:bg-transparent'>
            <TableHead className='w-[120px] pl-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Tipe
            </TableHead>
            <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Nama Kegiatan
            </TableHead>
            <TableHead className='w-[200px] text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Mahasiswa
            </TableHead>
            <TableHead className='w-[180px] text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Masuk Antrean
            </TableHead>
            <TableHead className='w-[120px] pr-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='h-24 text-center text-sm font-medium text-slate-500'
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
                <TableCell className='pl-5'>
                  <SubmissionTypeBadge type={job.type} />
                </TableCell>
                <TableCell className='text-sm font-semibold text-slate-800'>
                  {job.title}
                </TableCell>
                <TableCell className='text-sm font-medium text-slate-600'>
                  {job.studentName}
                </TableCell>
                <TableCell className='text-xs font-medium text-slate-500'>
                  {formatDateTime(job.queuedAt)}
                </TableCell>
                <TableCell className='pr-5'>
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
