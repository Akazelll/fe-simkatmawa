"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { VerificationTable } from "@/features/verification/components/VerificationTable";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import {
  DEFAULT_VERIFICATIONS,
  CATEGORIES,
  YEARS,
  STATUSES,
  PAGE_SIZE,
} from "@/features/verification/constants";
import { VerificationSubmission } from "@/features/verification/types";

export default function VerificationPage() {
  const filter = usePaginationFilter<VerificationSubmission>({
    data: DEFAULT_VERIFICATIONS,
    pageSize: PAGE_SIZE,
    filterFn: (row, search, category, status, year) => {
      const matchSearch =
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.submittedBy.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        category === "Semua Kategori" || row.category === category;
      const matchStatus = status === "Semua Status" || row.status === status;
      const matchYear =
        year === "Semua Tahun" || row.date.getFullYear().toString() === year;

      return matchSearch && matchCategory && matchStatus && matchYear;
    },
  });

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Verification'
        description='Tinjau dan verifikasi pengajuan prestasi mahasiswa'
      />

      <FilterSection
        search={filter.search}
        setSearch={filter.setSearch}
        searchPlaceholder='Cari pengajuan atau nama mahasiswa...'
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
        startIndex={(filter.page - 1) * PAGE_SIZE}
      />

      <Pagination
        page={filter.page}
        totalPages={filter.totalPages}
        goTo={filter.goTo}
      />
    </div>
  );
}
