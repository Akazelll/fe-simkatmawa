import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils/dateFormat";

const getInitials = (name: string) =>
  name ? name.substring(0, 2).toUpperCase() : "NA";

const getActionDetails = (action: string) => {
  switch (action) {
    case "created":
      return { text: "membuat data", color: "bg-emerald-500" };
    case "updated":
      return { text: "mengubah data", color: "bg-amber-500" };
    case "deleted":
      return { text: "menghapus data", color: "bg-rose-500" };
    default:
      return { text: "melakukan aktivitas", color: "bg-[#0F4C81]" };
  }
};

export function RecentActivity({ logs }: { logs?: any[] }) {
  const activityLogs = logs || [];

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white h-full'>
      <CardHeader>
        <CardTitle className='text-base font-semibold text-slate-800'>
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activityLogs.length === 0 ? (
          <div className='flex justify-center items-center h-32 text-sm text-slate-400'>
            Belum ada aktivitas tercatat.
          </div>
        ) : (
          <div className='flex flex-col gap-6'>
            {activityLogs.map((log) => {
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
                      {getInitials(log.user_name || "System")}
                    </span>
                    <p className='text-sm leading-snug'>
                      <span className='font-semibold text-slate-800'>
                        {log.user_name || "System"}
                      </span>{" "}
                      <span className='text-slate-500'>{text}</span>{" "}
                      <span className='font-medium text-[#0F4C81]'>
                        {log.target || log.subject_type}
                      </span>
                    </p>
                  </div>
                  <span className='text-xs font-medium text-slate-400 whitespace-nowrap pt-1 sm:pt-0'>
                    {log.created_at ? formatDateTime(log.created_at) : "-"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
