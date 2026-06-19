"use client";

import { useCallback } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { AchievementTable } from "@/features/achievement/components/AchievementTable";
import { KATEGORI, STATUSES } from "@/features/achievement/constants";
import { usePrestasiList } from "@/features/achievement/hooks/usePrestasiList";
import { AlertCircle } from "lucide-react";

import { TableSkeleton } from "@/features/shared/components/TableSkeleton";

export default function PrestasiPage() {
  const { data, meta, isLoading, error, params, updateParams, refetch } =
    usePrestasiList({ page: 1 });

  // Handler dibuat stabil (referensi tetap) agar FilterSection yang di-memo tidak ikut re-render.
  const handleSearch = useCallback(
    (val: string) => updateParams({ search: val }),
    [updateParams],
  );
  const handleCategory = useCallback(
    (val: string) =>
      updateParams({ level: val === "Semua Kategori" ? undefined : val }),
    [updateParams],
  );
  const handleStatus = useCallback(
    (val: string) =>
      updateParams({ status: val === "Semua Status" ? undefined : val }),
    [updateParams],
  );
  const handlePageChange = useCallback(
    (page: number) => updateParams({ page }),
    [updateParams],
  );

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Prestasi Mandiri'
        description='Kelola data prestasi mahasiswa'
      />

      <FilterSection
        search={params.search || ""}
        setSearch={handleSearch}
        category={params.level || "Semua Kategori"}
        setCategory={handleCategory}
        categories={KATEGORI}
        status={params.status || "Semua Status"}
        setStatus={handleStatus}
        statuses={STATUSES}
      />

      {error && (
        <div className='flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200'>
          <AlertCircle className='w-5 h-5' />
          <p>{error}</p>
        </div>
      )}

      <div className='space-y-4'>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <AchievementTable data={data} onChanged={refetch} />

            {meta && meta.last_page > 1 && (
              <Pagination
                page={meta.current_page}
                totalPages={meta.last_page}
                goTo={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
