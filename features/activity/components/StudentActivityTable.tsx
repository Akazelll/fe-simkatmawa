import Link from "next/link";
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
import { TypeBadge } from "@/features/shared/components/TypeBadge";
import {
  EVENT_STYLE_MAP,
  StudentActivityEvent,
  StudentEventType,
} from "@/features/activity/constants/student-activity";

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";

const CELL_BASE = "py-4 align-top text-sm text-slate-600";

const ACTION_LABEL: Record<StudentEventType, string> = {
  SUBMITTED: "Diajukan",
  VERIFIED: "Disetujui",
  REJECTED: "Ditolak",
  SYNCED: "Tersinkronisasi",
  EDITED: "Diubah",
  LOGIN: "Login",
};

const ACTION_BADGE_CLASS: Record<StudentEventType, string> = {
  SUBMITTED: "bg-sky-50 text-sky-600",
  VERIFIED: "bg-emerald-50 text-emerald-600",
  REJECTED: "bg-rose-50 text-rose-600",
  SYNCED: "bg-cyan-50 text-cyan-600",
  EDITED: "bg-amber-50 text-amber-600",
  LOGIN: "bg-slate-100 text-slate-500",
};

const formatTimestamp = (date: Date) =>
  date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export function StudentActivityTable({
  data,
}: {
  data: StudentActivityEvent[];
}) {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white p-0'>
      <div className='flex flex-col gap-1 p-6 border-b border-slate-100'>
        <h2 className='text-base font-bold text-slate-800'>
          Riwayat Aktivitas
        </h2>
        <p className='text-sm text-slate-500'>
          Catatan semua aksi yang kamu lakukan di SIMKATMAWA.
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className='border-slate-100 hover:bg-transparent bg-slate-50/50'>
            <TableHead className={`${HEAD_CLASS} pl-6 w-36`}>Aksi</TableHead>
            <TableHead className={`${HEAD_CLASS} min-w-80`}>
              Deskripsi
            </TableHead>
            <TableHead className={`${HEAD_CLASS} min-w-48`}>
              Target Pengajuan
            </TableHead>
            <TableHead className={`${HEAD_CLASS} pr-6 w-44`}>
              Timestamp
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((event) => {
            const style = EVENT_STYLE_MAP[event.type];
            const Icon = style.icon;
            return (
              <TableRow
                key={event.id}
                className='border-slate-100 hover:bg-slate-50/70 transition-colors'
              >
                <TableCell className={`${CELL_BASE} pl-6`}>
                  <Badge
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold border-0 ${ACTION_BADGE_CLASS[event.type]}`}
                  >
                    <Icon size={12} />
                    {ACTION_LABEL[event.type]}
                  </Badge>
                </TableCell>

                <TableCell className={`${CELL_BASE} whitespace-normal`}>
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold text-slate-800 leading-snug'>
                      {event.title}
                    </span>
                    <span className='text-xs text-slate-500 leading-relaxed'>
                      {event.description}
                    </span>
                  </div>
                </TableCell>

                <TableCell className={CELL_BASE}>
                  {event.targetType && event.targetId && event.targetHref ? (
                    <Link
                      href={event.targetHref}
                      className='inline-flex items-center gap-2 group whitespace-nowrap'
                    >
                      <TypeBadge type={event.targetType} />
                      <span className='text-sm font-semibold text-[#0F4C81] group-hover:underline'>
                        #{event.targetId}
                      </span>
                    </Link>
                  ) : (
                    <span className='text-slate-300'>—</span>
                  )}
                </TableCell>

                <TableCell
                  className={`${CELL_BASE} pr-6 text-xs text-slate-500`}
                >
                  {formatTimestamp(event.timestamp)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
