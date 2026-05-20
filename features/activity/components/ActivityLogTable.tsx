"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActivityLog } from "../types";
import { ACTIVITY_LOG_ACTION } from "../constants";
import { formatDateTime } from "@/lib/utils/dateFormat";

export function ActivityLogTable({ data }: { data: ActivityLog[] }) {
  const getBadgeStyle = (action: ActivityLog["action"]) => {
    switch (action) {
      case ACTIVITY_LOG_ACTION.SYNC_SUCCESS:
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case ACTIVITY_LOG_ACTION.PENDING:
        return "bg-amber-50 text-amber-600 border-amber-200";
      case ACTIVITY_LOG_ACTION.REJECTED:
      case ACTIVITY_LOG_ACTION.SYNC_FAILED:
        return "bg-red-50 text-red-600 border-red-200";
      case ACTIVITY_LOG_ACTION.APPROVED_UNSYNCED:
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
      <Table>
        <TableHeader className='bg-slate-50 border-b border-slate-200'>
          <TableRow className='hover:bg-transparent'>
            <TableHead className='pl-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              User
            </TableHead>
            <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Action
            </TableHead>
            <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Target ID
            </TableHead>
            <TableHead className='pr-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
              Timestamp
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className='h-24 text-center text-sm font-medium text-slate-500'
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
                <TableCell className='pl-5 text-sm font-semibold text-slate-700'>
                  {row.user}
                </TableCell>
                <TableCell>
                  <Badge
                    variant='outline'
                    className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold capitalize border ${getBadgeStyle(
                      row.action,
                    )}`}
                  >
                    {row.action.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className='text-sm font-medium text-[#1a2b5e]'>
                  {row.targetid}
                </TableCell>
                <TableCell className='pr-5 text-xs font-medium text-slate-500'>
                  {formatDateTime(row.timestamp)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
