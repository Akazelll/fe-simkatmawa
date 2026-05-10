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

export function ActivityLogTable({ data }: { data: ActivityLog[] }) {
  const getBadgeStyle = (action: ActivityLog["action"]) => {
    switch (action) {
      case ACTIVITY_LOG_ACTION.SYNC_SUCCESS:
        return "bg-emerald-50 text-emerald-600";
      case ACTIVITY_LOG_ACTION.PENDING:
        return "bg-amber-50 text-amber-600";
      case ACTIVITY_LOG_ACTION.REJECTED:
      case ACTIVITY_LOG_ACTION.SYNC_FAILED:
        return "bg-rose-50 text-rose-600";
      case ACTIVITY_LOG_ACTION.APPROVED_UNSYNCED:
        return "bg-sky-50 text-sky-600";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white'>
      <Table>
        <TableHeader>
          <TableRow className='border-slate-100 hover:bg-transparent'>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 pl-6'>
              User
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Action
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Target ID
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Timestamp
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              className='border-slate-100 hover:bg-slate-50/70 transition-colors'
            >
              <TableCell className='pl-6 font-semibold text-sm text-slate-600'>
                {row.user}
              </TableCell>
              <TableCell>
                <Badge
                  className={`rounded-full px-3 py-0.5 text-xs font-semibold border-0 ${getBadgeStyle(
                    row.action,
                  )}`}
                >
                  {row.action.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className='text-sm font-medium text-[#0F4C81]'>
                {row.targetid}
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {new Date(row.timestamp).toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
