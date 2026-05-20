"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { VerificationTable } from "@/features/verification/components/VerificationTable";
import { RejectSubmissionModal } from "@/features/verification/components/RejectSubmissionModal";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import { useSubmissions } from "@/features/submission/hooks/useSubmissions";
import { shouldAppearInVerification } from "@/lib/submission/submissionRules";
import type { Submission } from "@/features/submission/types/types";

const PAGE_SIZE = 10;

const CATEGORIES = ["Semua Kategori", "prestasi", "sertifikat", "rekognisi"];

const STATUSES = [
  "Semua Status",
  "PENDING",
  "REJECTED",
  "APPROVED_UNSYNCED",
  "SYNC_FAILED",
  "SYNC_SUCCESS",
];

export default function VerificationPage() {
  const { submissions, approveSubmission, rejectSubmission } = useSubmissions();
  const [rejectId, setRejectId] = useState<string | null>(null);

  const verificationSubmissions = useMemo(() => {
    return submissions.filter((submission) =>
      shouldAppearInVerification(submission),
    );
  }, [submissions]);

  const filter = usePaginationFilter<Submission>({
    data: verificationSubmissions,
    pageSize: PAGE_SIZE,
    filterFn: (row, search, category, status, year) => {
      const normalizedSearch = search.toLowerCase();

      const matchSearch =
        row.title.toLowerCase().includes(normalizedSearch) ||
        row.studentName.toLowerCase().includes(normalizedSearch) ||
        row.studentNim.toLowerCase().includes(normalizedSearch);

      const matchCategory =
        category === "Semua Kategori" || row.type === category;

      const matchStatus = status === "Semua Status" || row.status === status;

      const matchYear =
        year === "Semua Tahun" ||
        new Date(row.submittedAt).getFullYear().toString() === year;

      return matchSearch && matchCategory && matchStatus && matchYear;
    },
  });

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
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Verification'
        description='Tinjau dan verifikasi pengajuan mahasiswa yang masih berstatus pending'
      />

      <FilterSection
        search={filter.search}
        setSearch={filter.setSearch}
        searchPlaceholder='Cari pengajuan, nama mahasiswa, atau NIM...'
        category={filter.category}
        setCategory={filter.setCategory}
        categories={CATEGORIES}
        status={filter.status}
        setStatus={filter.setStatus}
        statuses={STATUSES}
        statusLabel='Filter by Status'
      />

      <VerificationTable
        data={filter.paginated}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <Pagination
        page={filter.page}
        totalPages={filter.totalPages}
        goTo={filter.goTo}
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
