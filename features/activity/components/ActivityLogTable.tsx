"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ActivityActionBadge } from "@/features/shared/components/ActivityActionBadge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActivityLog } from "../types";
import { ActivityLogDetailModal } from "./ActivityLogDetailModal";
import { Eye } from "lucide-react";
import type { SkeletonColumn } from "@/features/shared/components/TableSkeleton";

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-middle text-sm text-slate-600";

// Konfigurasi skeleton — disinkronkan dengan kolom tabel di bawah (6 kolom).
export const ACTIVITY_TABLE_COLUMNS: SkeletonColumn[] = [
  { width: "w-[15%]", cell: "h-4 w-24" }, // Waktu
  { width: "w-[20%]", cell: "h-4 w-28" }, // Pelaku
  { width: "w-[15%]", pill: true }, // Aksi (badge)
  { width: "w-[15%]", cell: "h-4 w-20" }, // Modul
  { width: "w-[25%]" }, // Target
  { width: "w-[10%]", align: "center", cell: "h-8 w-20 rounded-lg" },
];

export function ActivityLogTable({ data }: { data: ActivityLog[] }) {
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  return (
    <>
      <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0'>
        <Table>
          <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
            <TableRow className='hover:bg-transparent'>
              <TableHead className={`${HEAD_CLASS} pl-6 w-[15%]`}>
                Waktu
              </TableHead>
              <TableHead className={`${HEAD_CLASS} w-[20%]`}>Pelaku</TableHead>
              <TableHead className={`${HEAD_CLASS} w-[15%]`}>Aksi</TableHead>
              <TableHead className={`${HEAD_CLASS} w-[15%]`}>Modul</TableHead>
              <TableHead className={`${HEAD_CLASS} w-[25%]`}>Target</TableHead>
              <TableHead className={`${HEAD_CLASS} pr-6 w-[10%] text-center`}>
                Detail
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
                  Tidak ada log aktivitas ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'
                >
                  <TableCell
                    className={`${CELL_BASE} pl-6 font-medium text-slate-500 whitespace-nowrap`}
                  >
                    {row.timestamp}
                  </TableCell>
                  <TableCell
                    className={`${CELL_BASE} font-semibold text-slate-700`}
                  >
                    {row.user}
                  </TableCell>
                  <TableCell className={CELL_BASE}>
                    <ActivityActionBadge action={row.action} />
                  </TableCell>
                  <TableCell className={`${CELL_BASE} font-medium`}>
                    {row.module}
                  </TableCell>
                  <TableCell
                    className={`${CELL_BASE} font-medium text-[#1a2b5e]`}
                  >
                    <span className='break-all line-clamp-2' title={row.target}>
                      {row.target}
                    </span>
                  </TableCell>
                  <TableCell className={`${CELL_BASE} pr-6 text-center`}>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-8 rounded-lg px-3 text-xs font-semibold text-slate-600 border-slate-200 hover:bg-slate-50'
                      onClick={() => setSelectedLog(row)}
                    >
                      <Eye className='mr-1.5 h-3.5 w-3.5 text-slate-400' />
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <ActivityLogDetailModal
        log={selectedLog}
        open={!!selectedLog}
        onOpenChange={(isOpen) => !isOpen && setSelectedLog(null)}
      />
    </>
  );
}
