"use client";
import { useEffect, useState } from "react";
import { SubmissionActivityLog } from "@/lib/submission/submission-types";
import { CheckCircle2, XCircle } from "lucide-react";

export function RecentSubmissionActivity() {
  const [activities, setActivities] = useState<SubmissionActivityLog[]>([]);

  useEffect(() => {
    // Ambil log yang disimpan oleh useSubmissions hook
    const logs: SubmissionActivityLog[] = JSON.parse(
      localStorage.getItem("simkatmawa_activity") || "[]",
    );
    // Filter hanya Approved & Rejected, ambil top 5
    const filtered = logs
      .filter(
        (l) =>
          l.action === "submission.approved" ||
          l.action === "submission.rejected",
      )
      .slice(0, 5);
    setActivities(filtered);
  }, []);

  if (activities.length === 0)
    return (
      <p className='text-sm text-slate-500 p-4'>Belum ada aktivitas terbaru.</p>
    );

  return (
    <div className='space-y-4 p-4'>
      {activities.map((log) => {
        const isApprove = log.action === "submission.approved";
        return (
          <div
            key={log.id}
            className='flex gap-4 items-start border-b pb-4 last:border-0 last:pb-0'
          >
            <div
              className={`mt-0.5 p-2 rounded-full ${isApprove ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"}`}
            >
              {isApprove ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            </div>
            <div className='flex-1 space-y-1'>
              <p className='text-sm text-slate-800 leading-tight'>
                <span className='font-bold capitalize'>{log.subjectType}</span>{" "}
                "{log.subjectTitle}" milik mahasiswa telah{" "}
                <span
                  className={`font-semibold ${isApprove ? "text-blue-600" : "text-red-600"}`}
                >
                  {isApprove ? "DITERIMA" : "DITOLAK"}
                </span>{" "}
                oleh {log.actorName}.
              </p>
              <p className='text-[11px] font-medium text-slate-400'>
                {new Date(log.createdAt).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
