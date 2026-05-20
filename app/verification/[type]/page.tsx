"use client";

import { useMemo, useState } from "react";
import type { Submission } from "@/features/submission/types/types";
import { useParams } from "next/navigation";

import { RejectSubmissionModal } from "@/features/verification/components/RejectSubmissionModal";
import { VerificationTable } from "@/features/verification/components/VerificationTable";
import { useSubmissions } from "@/features/submission/hooks/useSubmissions";
import { shouldAppearInVerification } from "@/lib/submission/submissionRules";

type VerificationType = "prestasi" | "sertifikat" | "rekognisi";

export default function VerificationTypePage() {
  const params = useParams<{ type: VerificationType }>();
  const type = params.type;

  const { submissions, approveSubmission, rejectSubmission } = useSubmissions();
  const [rejectId, setRejectId] = useState<string | null>(null);

  const pendingSubmissions = useMemo(() => {
    return submissions.filter(
      (submission) =>
        submission.type === type && shouldAppearInVerification(submission),
    );
  }, [submissions, type]);

  const selectedSubmission = useMemo(() => {
    return submissions.find((submission) => submission.id === rejectId);
  }, [submissions, rejectId]);

  const handleApprove = (id: string) => {
    const isConfirmed = confirm(
      "Apakah Anda yakin ingin menyetujui pengajuan ini? Data akan diteruskan ke antrean sinkronisasi.",
    );

    if (!isConfirmed) return;

    approveSubmission(id);
  };

  const handleReject = (id: string) => {
    setRejectId(id);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold capitalize text-slate-900">
          Verifikasi {type}
        </h1>
        <p className="text-sm text-slate-500">
          Kelola submission {type} yang sedang menunggu proses verifikasi.
        </p>
      </div>

      <VerificationTable
        data={pendingSubmissions}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <RejectSubmissionModal
        isOpen={!!rejectId}
        onClose={() => setRejectId(null)}
        title={selectedSubmission?.title ?? ""}
        onReject={(reason) => {
          if (!rejectId) return;

          rejectSubmission(rejectId, reason);
          setRejectId(null);
        }}
      />
    </div>
  );
}