"use client";
import { useSubmissions } from "@/features/submission/hooks/useSubmissions";
import { shouldAppearInVerification } from "@/lib/submission/submissionRules";
import { SubmissionStatusBadge } from "@/features/shared/components/SubmissionStatusBadge";
import { RejectSubmissionModal } from "@/features/verification/components/RejectSubmissionModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function VerificationTypePage() {
  const pathname = usePathname();
  const type = pathname.split("/").pop(); // prestasi | sertifikat | rekognisi

  const { submissions, approveSubmission, rejectSubmission } = useSubmissions();
  const [rejectId, setRejectId] = useState<string | null>(null);

  const pendingSubmissions = submissions.filter(
    (s) => s.type === type && shouldAppearInVerification(s),
  );

  const handleApprove = (id: string) => {
    if (
      confirm(
        "Apakah Anda yakin ingin menyetujui pengajuan ini? Data akan diteruskan ke antrean sinkronisasi.",
      )
    ) {
      approveSubmission(id);
      // alert or toast success here
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold capitalize'>Verifikasi {type}</h1>
      <div className='bg-white rounded-xl shadow-sm border p-4'>
        {pendingSubmissions.length === 0 ? (
          <p className='text-muted-foreground text-center py-8'>
            Tidak ada antrean verifikasi.
          </p>
        ) : (
          <table className='w-full text-sm text-left'>
            <thead className='text-xs text-slate-500 uppercase bg-slate-50 border-b'>
              <tr>
                <th className='px-4 py-3'>Nama Pengajuan</th>
                <th className='px-4 py-3'>Mahasiswa</th>
                <th className='px-4 py-3'>Tanggal</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3 text-right'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pendingSubmissions.map((sub) => (
                <tr key={sub.id} className='border-b'>
                  <td className='px-4 py-3 font-medium'>{sub.title}</td>
                  <td className='px-4 py-3'>
                    <div className='font-semibold'>{sub.studentName}</div>
                    <div className='text-xs text-slate-400'>
                      {sub.studentNim}
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    {new Date(sub.submittedAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className='px-4 py-3'>
                    <SubmissionStatusBadge submission={sub} />
                  </td>
                  <td className='px-4 py-3 text-right space-x-2'>
                    <Button
                      size='sm'
                      onClick={() => handleApprove(sub.id)}
                      className='bg-blue-600 hover:bg-blue-700'
                    >
                      Approve
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => setRejectId(sub.id)}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <RejectSubmissionModal
        isOpen={!!rejectId}
        onClose={() => setRejectId(null)}
        title={submissions.find((s) => s.id === rejectId)?.title || ""}
        onReject={(reason) => {
          if (rejectId) rejectSubmission(rejectId, reason);
        }}
      />
    </div>
  );
}
