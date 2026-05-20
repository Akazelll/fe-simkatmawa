"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { RecognitionTable } from "@/features/recognition/components/RecognitionTable";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import {
  ALL_DATA,
  KATEGORI,
  STATUSES,
  PAGE_SIZE,
} from "@/features/recognition/constants";
import { Rekognisi } from "@/features/recognition/types";

export default function RekognisiPage() {
  const filter = usePaginationFilter<Rekognisi>({
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
        title='Rekognisi'
        description='Kelola data rekognisi mahasiswa'
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

      <RecognitionTable data={filter.paginated} />

      <Pagination
        page={filter.page}
        totalPages={filter.totalPages}
        goTo={filter.goTo}
      />
    </div>
  );
}
