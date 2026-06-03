"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { VerificationTable } from "@/features/verification/components/VerificationTable";
import { Pagination } from "@/features/shared/components/Pagination";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { useVerifikasiList } from "@/features/verification/hooks/useVerifikasiList";
import { TipeKegiatan } from "@/features/verification/types";

type VerificationType = "prestasi" | "sertifikat" | "rekognisi";

export default function VerificationTypePage() {
  const params = useParams<{ type: VerificationType }>();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("Terbaru ");

  const type = params?.type;
  const apiType = (
    type === "sertifikat" ? "sertifikasi" : type
  ) as TipeKegiatan;

  const {
    data: pendingSubmissions,
    meta,
    isLoading,
  } = useVerifikasiList(apiType, currentPage);

  const sortedData = useMemo(() => {
    if (!pendingSubmissions) return [];

    return [...pendingSubmissions].sort((a: any, b: any) => {
      const dateA = new Date(
        a.created_at || a.date || a.updated_at || 0,
      ).getTime();
      const dateB = new Date(
        b.created_at || b.date || b.updated_at || 0,
      ).getTime();

      if (sortOrder === "Terbaru ") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }, [pendingSubmissions, sortOrder]);

  if (!type) return null;

  return (
    <div className='space-y-6 p-6 animate-in fade-in duration-500'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-bold capitalize text-slate-900'>
          Verifikasi {type}
        </h1>
        <p className='text-sm text-slate-500'>
          Kelola antrean {type} mahasiswa yang sedang menunggu proses
          verifikasi.
        </p>
      </div>

      <FilterSection
        status={sortOrder}
        setStatus={setSortOrder}
        statuses={["Terbaru ", "Terlama"]}
        statusLabel='Urutkan Tanggal'
      />

      <div className='space-y-4'>
        <VerificationTable data={sortedData} isLoading={isLoading} />

        {meta && meta.last_page > 1 && (
          <Pagination
            page={meta.current_page}
            totalPages={meta.last_page}
            goTo={(newPage) => setCurrentPage(newPage)}
          />
        )}
      </div>
    </div>
  );
}
