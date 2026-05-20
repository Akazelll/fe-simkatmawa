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
import { SyncHistoryItem } from "@/lib/queue/types";
import { formatDateTime } from "@/lib/utils/dateFormat";
import { SubmissionTypeBadge } from "../../shared/components/SubmissionTypeBadge";
import { QueueStatusBadge } from "./QueueStatusBadge";

export function SyncHistoryTable({ history }: { history: SyncHistoryItem[] }) {
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
            <TableHead className='w-[150px] text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              ID Kemdikbud
            </TableHead>
            <TableHead className='w-[180px] text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Terkirim Pada
            </TableHead>
            <TableHead className='w-[120px] pr-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='h-24 text-center text-sm font-medium text-slate-500'
              >
                Belum ada histori log sinkronisasi data.
              </TableCell>
            </TableRow>
          ) : (
            history.map((item) => (
              <TableRow
                key={item.id}
                className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'
              >
                <TableCell className='pl-5'>
                  <SubmissionTypeBadge type={item.type} />
                </TableCell>
                <TableCell className='text-sm font-semibold text-slate-800'>
                  {item.title}
                </TableCell>
                <TableCell className='font-mono text-xs font-bold text-slate-600'>
                  {item.kemdikbudId || "—"}
                </TableCell>
                <TableCell className='text-xs font-medium text-slate-500'>
                  {formatDateTime(item.syncedAt)}
                </TableCell>
                <TableCell className='pr-5'>
                  <QueueStatusBadge status={item.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
