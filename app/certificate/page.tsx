"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { CertificateTable } from "@/features/certificate/components/CertificateTable";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import {
  ALL_DATA,
  KATEGORI,
  STATUSES,
  PAGE_SIZE,
} from "@/features/certificate/constants";
import { Certificate } from "@/features/certificate/types";

export default function SertifikatPage() {
  const filter = usePaginationFilter<Certificate>({
    data: ALL_DATA,
    pageSize: PAGE_SIZE,
    filterFn: (row, search, category, status) => {
      const matchSearch =
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toLowerCase().includes(search.toLowerCase());
      const matchGrade =
        category === "Semua Kategori" || row.level === category;
      const matchStatus = status === "Semua Status" || row.status === status;
      return matchSearch && matchGrade && matchStatus;
    },
  });

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Sertifikat'
        description='Kelola data sertifikat mahasiswa'
        createPath='/certificate/create'
        buttonText='Tambah Sertifikat'
      />

      <FilterSection
        search={filter.search}
        setSearch={filter.setSearch}
        category={filter.category}
        setCategory={filter.setCategory}
        categories={KATEGORI}
        status={filter.status}
        setStatus={filter.setStatus}
        statuses={STATUSES}
      />

      <CertificateTable data={filter.paginated} />

      <Pagination
        page={filter.page}
        totalPages={filter.totalPages}
        goTo={filter.goTo}
      />
    </div>
  );
}
