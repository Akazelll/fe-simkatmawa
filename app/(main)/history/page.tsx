"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import {
  HistoryTable,
  HISTORY_TABLE_COLUMNS,
} from "@/features/history/components/HistoryTable";
import { Pagination } from "@/features/shared/components/Pagination";
import { useHistoryList } from "@/features/history/hooks/useHistoryList";
import { TipeKegiatan } from "@/features/verification/types";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

import { FilterSection } from "@/features/shared/components/FilterSection";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { useSkeletonRows } from "@/features/shared/hooks/useSkeletonRows";

export default function HistoryPage() {
  const [typeFilter, setTypeFilter] = useState("Prestasi");
  const [currentPage, setCurrentPage] = useState(1);

  const apiTypeFormat = typeFilter.toLowerCase() as TipeKegiatan;

  const { data, meta, isLoading } = useHistoryList(apiTypeFormat, currentPage);

  const skeletonRows = useSkeletonRows("history", data.length, !isLoading);

  const handleTypeChange = (val: string) => {
    setTypeFilter(val);
    setCurrentPage(1);
  };

  return (
    <div className='flex flex-col gap-6 p-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Riwayat Verifikasi'
        description='Lihat kembali data pengajuan mahasiswa yang telah disetujui (Approved) atau ditolak (Rejected).'
      />

      <FilterSection
        category={typeFilter}
        setCategory={handleTypeChange}
        categories={["Prestasi", "Sertifikasi", "Rekognisi"]}
      />

      <RoleGuard allowedRoles={["admin", "superadmin"]}>
        <div className='space-y-4'>
          {isLoading ? (
            <TableSkeleton columns={HISTORY_TABLE_COLUMNS} rows={skeletonRows} />
          ) : (
            <>
              <HistoryTable data={data} />

              {/* PERBAIKAN: Menggunakan props yang sesuai dengan komponen Pagination baru */}
              {meta && meta.last_page > 1 && (
                <Pagination
                  meta={meta}
                  onPageChange={(newPage) => setCurrentPage(newPage)}
                />
              )}
            </>
          )}
        </div>
      </RoleGuard>
    </div>
  );
}
