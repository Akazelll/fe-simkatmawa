"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SyncHistoryItem } from "@/lib/queue/queue-types";
import { formatDateTime } from "@/lib/utils/date-format";
import { SubmissionTypeBadge } from "./submission-type-badge";
import { QueueStatusBadge } from "./queue-status-badge";

export function SyncHistoryTable({ history }: { history: SyncHistoryItem[] }) {
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
              ID Kemdikbud
            </TableHead>
            <TableHead className='font-bold text-slate-500'>
              Terkirim Pada
            </TableHead>
            <TableHead className='w-[120px] font-bold text-slate-500'>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='text-center py-10 text-slate-400 font-medium'
              >
                Belum ada histori log sinkronisasi data.
              </TableCell>
            </TableRow>
          ) : (
            history.map((item) => (
              <TableRow
                key={item.id}
                className='hover:bg-slate-50/50 transition-colors'
              >
                <TableCell>
                  <SubmissionTypeBadge type={item.type} />
                </TableCell>
                <TableCell className='font-semibold text-slate-700'>
                  {item.title}
                </TableCell>
                <TableCell className='font-mono text-xs font-bold text-slate-600'>
                  {item.kemdikbudId || "—"}
                </TableCell>
                <TableCell className='text-slate-500 text-xs font-medium'>
                  {formatDateTime(item.syncedAt)}
                </TableCell>
                <TableCell>
                  <QueueStatusBadge status={item.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
