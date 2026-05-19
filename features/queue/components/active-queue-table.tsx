"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActiveQueueJob } from "@/lib/queue/queue-types";
import { formatDateTime } from "@/lib/utils/date-format";
import { SubmissionTypeBadge } from "./submission-type-badge";
import { QueueStatusBadge } from "./queue-status-badge";

export function ActiveQueueTable({ jobs }: { jobs: ActiveQueueJob[] }) {
  return (
    <div className='border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-sm'>
      <Table>
        <TableHeader className='bg-slate-50/70'>
          <TableRow>
            <TableHead className='w-[100px] font-bold text-slate-500'>
              Tipe
            </TableHead>
            <TableHead className='font-bold text-slate-500'>
              Nama Kegiatan
            </TableHead>
            <TableHead className='font-bold text-slate-500'>
              Mahasiswa
            </TableHead>
            <TableHead className='font-bold text-slate-500'>
              Masuk Antrean
            </TableHead>
            <TableHead className='w-[120px] font-bold text-slate-500'>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='text-center py-10 text-slate-400 font-medium'
              >
                Tidak ada antrean aktif yang sedang berjalan.
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow
                key={job.id}
                className='hover:bg-slate-50/50 transition-colors'
              >
                <TableCell>
                  <SubmissionTypeBadge type={job.type} />
                </TableCell>
                <TableCell className='font-semibold text-slate-700'>
                  {job.title}
                </TableCell>
                <TableCell className='font-medium text-slate-600'>
                  {job.studentName}
                </TableCell>
                <TableCell className='text-slate-500 text-xs font-medium'>
                  {formatDateTime(job.queuedAt)}
                </TableCell>
                <TableCell>
                  <QueueStatusBadge status={job.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
