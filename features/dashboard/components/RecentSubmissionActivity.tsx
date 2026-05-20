"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { EmptyState } from "@/features/shared/components/EmptyState";
import type { SubmissionActivityLog } from "@/features/submission/types/types";

export function RecentSubmissionActivity() {
  const [activities, setActivities] = useState<SubmissionActivityLog[]>([]);

  useEffect(() => {
    // Membaca logs dari localStorage
    const logs: SubmissionActivityLog[] = JSON.parse(
      localStorage.getItem("simkatmawa_activity") || "[]",
    );

    // Filter HANYA Approved dan Rejected, lalu limit 5
    const filtered = logs
      .filter(
        (l) =>
          l.action === "submission.approved" ||
          l.action === "submission.rejected",
      )
      .slice(0, 5);

    setActivities(filtered);
  }, []);

  if (activities.length === 0) {
    return (
      <EmptyState
        icon={<CheckCircle2 className='w-8 h-8 opacity-50' />}
        title='Belum ada aktivitas'
        description='Belum ada riwayat persetujuan atau penolakan pengajuan terbaru.'
      />
    );
  }

  return (
    <div className='space-y-4 p-1'>
      {activities.map((log) => {
        const isApprove = log.action === "submission.approved";
        return (
          <div
            key={log.id}
            className='flex gap-4 items-start border-b border-slate-100 pb-4 last:border-0 last:pb-0'
          >
            <div
              className={`mt-0.5 p-2 rounded-xl shadow-sm ${isApprove ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"}`}
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
