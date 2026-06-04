"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { HistoryTable } from "@/features/history/components/HistoryTable";
import { Pagination } from "@/features/shared/components/Pagination";
import { useHistoryList } from "@/features/history/hooks/useHistoryList";
import { TipeKegiatan } from "@/features/verification/types";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

import { FilterSection } from "@/features/shared/components/FilterSection";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";

export default function HistoryPage() {
  const [typeFilter, setTypeFilter] = useState("Prestasi");
  const [currentPage, setCurrentPage] = useState(1);

  const apiTypeFormat = typeFilter.toLowerCase() as TipeKegiatan;

  const { data, meta, isLoading } = useHistoryList(apiTypeFormat, currentPage);

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
            <TableSkeleton />
          ) : (
            <>
              <HistoryTable data={data} />

              {meta && meta.last_page > 1 && (
                <Pagination
                  page={meta.current_page}
                  totalPages={meta.last_page}
                  goTo={(newPage) => setCurrentPage(newPage)}
                />
              )}
            </>
          )}
        </div>
      </RoleGuard>
    </div>
  );
}
