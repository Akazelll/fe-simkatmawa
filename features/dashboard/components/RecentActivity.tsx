import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DEFAULT_ACTIVITY_LOGS,
  ACTIVITY_LOG_ACTION,
} from "@/features/activity/constants";
import { ActivityLog } from "@/features/activity/types";

const getInitials = (name: string) => {
  return name.substring(0, 2).toUpperCase();
};

const getActionDetails = (action: ActivityLog["action"]) => {
  switch (action) {
    case ACTIVITY_LOG_ACTION.PENDING:
      return { text: "membuat pengajuan baru untuk", color: "bg-amber-500" };
    case ACTIVITY_LOG_ACTION.REJECTED:
      return { text: "menolak pengajuan", color: "bg-rose-500" };
    case ACTIVITY_LOG_ACTION.APPROVED_UNSYNCED:
      return { text: "menyetujui data", color: "bg-sky-500" };
    case ACTIVITY_LOG_ACTION.SYNC_FAILED:
      return { text: "gagal melakukan sinkronisasi", color: "bg-red-500" };
    case ACTIVITY_LOG_ACTION.SYNC_SUCCESS:
      return {
        text: "berhasil melakukan sinkronisasi",
        color: "bg-emerald-500",
      };
    default:
      return { text: "melakukan aktivitas pada", color: "bg-[#0F4C81]" };
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function RecentActivity() {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white h-full'>
      <CardHeader>
        <CardTitle className='text-base font-semibold text-slate-800'>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-6'>
          {DEFAULT_ACTIVITY_LOGS.map((log) => {
            const { text, color } = getActionDetails(log.action);
            return (
              <div
                key={log.id}
                className='flex items-start sm:items-center justify-between gap-4'
              >
                <div className='flex items-center gap-3'>
                  <span
                    className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${color}`}
                  >
                    {getInitials(log.user)}
                  </span>

                  <p className='text-sm leading-snug'>
                    <span className='font-semibold text-slate-800'>
                      {log.user}
                    </span>{" "}
                    <span className='text-slate-500'>{text}</span>{" "}
                    <span className='font-medium text-[#0F4C81]'>
                      {log.targetid}
                    </span>
                  </p>
                </div>

                <span className='text-xs font-medium text-slate-400 whitespace-nowrap pt-1 sm:pt-0'>
                  {formatTime(log.timestamp)}
                </span>
              </div>
            );
          })}
        </div>

        <div className='mt-6 pt-4 border-t border-slate-100 text-center'>
          <button className='text-sm font-semibold text-[#0F4C81] hover:underline transition-all'>
            View all activity
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
