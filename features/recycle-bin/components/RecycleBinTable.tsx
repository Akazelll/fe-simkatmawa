"use client";

import { RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashedItem } from "../types";
import { formatDateTime } from "@/lib/utils/dateFormat";

// Standar style yang konsisten di seluruh tabel
const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-top text-sm text-slate-600";

interface RecycleBinTableProps {
  data: TrashedItem[];
  onRestoreClick: (item: TrashedItem) => void;
}

export function RecycleBinTable({
  data,
  onRestoreClick,
}: RecycleBinTableProps) {
  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0'>
      <Table>
        <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
          <TableRow className='hover:bg-transparent'>
            <TableHead className={`${HEAD_CLASS} pl-6 w-[25%]`}>
              Nama Pengajuan
            </TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>Jenis</TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>
              Status Awal
            </TableHead>
            <TableHead className={`${HEAD_CLASS} w-[20%]`}>
              Deleted At
            </TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>
              Deleted By
            </TableHead>
            <TableHead className={`${HEAD_CLASS} pr-6 w-[10%] text-right`}>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className='h-32 text-center text-sm font-medium text-slate-500'
              >
                Recycle bin kosong.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow
                key={row.id}
                className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'
              >
                <TableCell className={`${CELL_BASE} pl-6`}>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-slate-800 line-clamp-2 leading-snug'>
                      {row.name}
                    </span>
                    <span className='text-[11px] text-slate-400 font-normal'>
                      {row.id}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className={`${CELL_BASE} whitespace-normal break-words`}
                >
                  <span className='line-clamp-2'>{row.type}</span>
                </TableCell>
                <TableCell className={CELL_BASE}>
                  <Badge className='rounded-full px-3 py-1 text-[11px] font-semibold border-0 bg-slate-100 text-slate-600'>
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className={`${CELL_BASE} whitespace-nowrap`}>
                  {formatDateTime(row.deletedAt)}
                </TableCell>
                <TableCell
                  className={`${CELL_BASE} whitespace-normal break-words`}
                >
                  <span className='line-clamp-2'>{row.deletedBy}</span>
                </TableCell>
                <TableCell className={`${CELL_BASE} pr-6 text-right`}>
                  <button
                    onClick={() => onRestoreClick(row)}
                    className='inline-flex p-2 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors'
                    title='Restore Data'
                  >
                    <RefreshCcw size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
