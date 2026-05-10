"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { AchievementTable } from "@/features/achievement/components/AchievementTable";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import {
  ALL_DATA,
  KATEGORI,
  STATUSES,
  PAGE_SIZE,
} from "@/features/achievement/constants";
import { Prestasi } from "@/features/achievement/types";

export default function PrestasiPage() {
  const filter = usePaginationFilter<Prestasi>({
    data: ALL_DATA,
    pageSize: PAGE_SIZE,
    filterFn: (row, search, category, status) => {
      const matchSearch =
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toLowerCase().includes(search.toLowerCase());
      const matchKategori =
        category === "Semua Kategori" || row.level === category;
      const matchStatus = status === "Semua Status" || row.status === status;
      return matchSearch && matchKategori && matchStatus;
    },
  });

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Prestasi'
        description='Kelola data prestasi mahasiswa'
        createPath='/achievement/create'
        buttonText='Tambah Prestasi'
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

      <AchievementTable data={filter.paginated} />

      <Pagination
        page={filter.page}
        totalPages={filter.totalPages}
        goTo={filter.goTo}
      />
    </div>
  );
}
