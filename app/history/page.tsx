"use client";
import { useSubmissions } from "@/features/submission/hooks/useSubmissions";
import {
  shouldAppearInHistory,
  getSubmissionProcessedBy,
  getSubmissionProcessedAt,
} from "@/lib/submission/submissionRules";
import { SubmissionStatusBadge } from "@/features/shared/components/SubmissionStatusBadge";
import { Badge } from "@/components/ui/badge";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function HistoryPage() {
  const { submissions } = useSubmissions();
  const historySubmissions = submissions
    .filter(shouldAppearInHistory)
    .sort(
      (a, b) =>
        new Date(getSubmissionProcessedAt(b) || 0).getTime() -
        new Date(getSubmissionProcessedAt(a) || 0).getTime(),
    );

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className='p-6 space-y-6'>
        <h1 className='text-2xl font-bold text-slate-800'>
          Riwayat Verifikasi
        </h1>

        <div className='bg-white rounded-xl shadow-sm border p-4 overflow-x-auto'>
          {historySubmissions.length === 0 ? (
            <p className='text-muted-foreground text-center py-8'>
              Belum ada riwayat pengajuan yang diproses.
            </p>
          ) : (
            <table className='w-full text-sm text-left'>
              <thead className='text-xs text-slate-500 uppercase bg-slate-50 border-b'>
                <tr>
                  <th className='px-4 py-3'>Tipe</th>
                  <th className='px-4 py-3'>Nama Pengajuan</th>
                  <th className='px-4 py-3'>Mahasiswa</th>
                  <th className='px-4 py-3'>Status</th>
                  <th className='px-4 py-3'>Diproses Oleh</th>
                  <th className='px-4 py-3'>Tanggal Proses</th>
                </tr>
              </thead>
              <tbody>
                {historySubmissions.map((sub) => (
                  <tr key={sub.id} className='border-b hover:bg-slate-50'>
                    <td className='px-4 py-3'>
                      <Badge
                        variant='outline'
                        className='uppercase text-[10px]'
                      >
                        {sub.type}
                      </Badge>
                    </td>
                    <td className='px-4 py-3 font-medium text-slate-800'>
                      {sub.title}
                    </td>
                    <td className='px-4 py-3'>
                      <div className='font-semibold'>{sub.studentName}</div>
                      <div className='text-xs text-slate-400'>
                        {sub.studentNim}
                      </div>
                    </td>
                    <td className='px-4 py-3'>
                      <SubmissionStatusBadge submission={sub} />
                    </td>
                    <td className='px-4 py-3 text-slate-600'>
                      {getSubmissionProcessedBy(sub) || "-"}
                    </td>
                    <td className='px-4 py-3 text-slate-600'>
                      {getSubmissionProcessedAt(sub)
                        ? new Date(
                            getSubmissionProcessedAt(sub)!,
                          ).toLocaleString("id-ID")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
