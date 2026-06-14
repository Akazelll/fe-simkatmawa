"use client";

import { RefreshCcw, User } from "lucide-react";
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

// IMPORT SHARED BADGES
import { TypeBadge } from "@/features/shared/components/TypeBadge";
import { StatusBadge } from "@/features/shared/components/StatusBadge";

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
            <TableHead className={`${HEAD_CLASS} pl-6 w-[30%]`}>
              Nama Pengajuan / Akun
            </TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>Jenis</TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>
              Status Awal
            </TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>
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
                Recycle bin kosong. Tidak ada data yang terhapus.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow
                key={`${row.originalType}-${row.id}`}
                className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'
              >
                <TableCell className={`${CELL_BASE} pl-6`}>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-slate-800 line-clamp-2 leading-snug'>
                      {row.name}
                    </span>
                    <span className='text-[11px] text-slate-400 font-normal mt-0.5'>
                      {row.owner || `ID: ${row.id}`}
                    </span>
                  </div>
                </TableCell>

                <TableCell
                  className={`${CELL_BASE} whitespace-normal break-words`}
                >
                  {row.originalType === "user" ? (
                    <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold bg-slate-50 text-slate-700 border-slate-200'>
                      <User size={12} />
                      <span className='capitalize'>{row.type}</span>
                    </span>
                  ) : (
                    <TypeBadge type={row.type} />
                  )}
                </TableCell>

                <TableCell className={CELL_BASE}>
                  {row.originalType === "user" ? (
                    <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border bg-slate-50 text-slate-600 border-slate-200'>
                      <span>{row.status}</span>
                    </div>
                  ) : (
                    <StatusBadge status={row.status} />
                  )}
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
