"use client";

import { useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import {
  AchievementTable,
  ACHIEVEMENT_TABLE_COLUMNS,
} from "@/features/achievement/components/AchievementTable";
import { KATEGORI, STATUSES } from "@/features/achievement/constants";
import {
  mapMahasiswaStatusFilter,
  mahasiswaStatusParamToLabel,
} from "@/features/shared/constants/submissionStatus";
import { usePrestasiList } from "@/features/achievement/hooks/usePrestasiList";
import { AlertCircle } from "lucide-react";

import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { useSkeletonRows } from "@/features/shared/hooks/useSkeletonRows";

const KATEGORI_LABEL_MAP: Record<string, string> = {
  RISNOV: "Inovasi Saintek",
  RISNOVSSH: "Inovasi Soshum",
  SENBUD: "Seni Budaya",
  OLAHRAGA: "Olahraga",
  MINAT: "Minat Khusus",
};

export default function PrestasiPage() {
  const searchParams = useSearchParams();
  const kategoriQuery = searchParams.get("kategori") || undefined;

  const { data, meta, isLoading, error, params, updateParams, refetch } =
    usePrestasiList({ page: 1, kategori: kategoriQuery });

  useEffect(() => {
    updateParams({ kategori: kategoriQuery, page: 1 });
  }, [kategoriQuery, updateParams]);

  const skeletonRows = useSkeletonRows("achievement", data.length, !isLoading);

  const handleSearch = useCallback(
    (val: string) => updateParams({ search: val, page: 1 }),
    [updateParams],
  );

  const handleCategory = useCallback(
    (val: string) =>
      updateParams({
        level: val === "Semua Kategori" ? undefined : val,
        page: 1,
      }),
    [updateParams],
  );

  const handleStatus = useCallback(
    (val: string) =>
      updateParams({
        status: mapMahasiswaStatusFilter(val),
        page: 1,
      }),
    [updateParams],
  );

  const handlePageChange = useCallback(
    (page: number) => updateParams({ page }),
    [updateParams],
  );

  const activeCategoryLabel = kategoriQuery
    ? KATEGORI_LABEL_MAP[kategoriQuery] || kategoriQuery
    : null;

  const pageTitle = activeCategoryLabel
    ? `Prestasi Mandiri — ${activeCategoryLabel}`
    : "Prestasi Mandiri";

  const pageDescription = activeCategoryLabel
    ? `Daftar pengajuan prestasi mandiri kategori ${activeCategoryLabel}`
    : "Kelola data prestasi mahasiswa";

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader title={pageTitle} description={pageDescription} />

      <FilterSection
        search={params.search || ""}
        setSearch={handleSearch}
        category={params.level || "Semua Kategori"}
        setCategory={handleCategory}
        categories={KATEGORI}
        status={mahasiswaStatusParamToLabel(params.status)}
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
          <TableSkeleton
            columns={ACHIEVEMENT_TABLE_COLUMNS}
            rows={skeletonRows}
            header
          />
        ) : (
          <>
            <AchievementTable data={data} onChanged={refetch} />

            {meta && meta.last_page > 1 && (
              <Pagination meta={meta} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
