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

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-middle text-sm text-slate-600";

export function ActivityLogTable({ data }: { data: ActivityLog[] }) {
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);

  const getActionBadge = (action: ActivityLog["action"]) => {
    switch (action) {
      case "created":
        return (
          <Badge className='bg-emerald-50 text-emerald-600 border-emerald-200'>
            🟢 Dibuat
          </Badge>
        );
      case "updated":
        return (
          <Badge className='bg-amber-50 text-amber-600 border-amber-200'>
            🟡 Diubah
          </Badge>
        );
      case "deleted":
        return (
          <Badge className='bg-red-50 text-red-600 border-red-200'>
            🔴 Dihapus
          </Badge>
        );
      default:
        return <Badge variant='outline'>{action}</Badge>;
    }
  };

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
                      variant='ghost'
                      size='sm'
                      onClick={() => setSelectedLog(row)}
                    >
                      <Eye className='w-4 h-4 mr-1' /> Detail
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
