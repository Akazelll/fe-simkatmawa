"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { VerificationTable } from "@/features/verification/components/VerificationTable";
import { useVerifikasiList } from "@/features/verification/hooks/useVerifikasiList";
import { TipeKegiatan } from "@/features/verification/types";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

import { FilterSection } from "@/features/shared/components/FilterSection";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";

export default function VerificationPage() {
  const [typeFilter, setTypeFilter] = useState("Prestasi");

  const apiTypeFormat = typeFilter.toLowerCase() as TipeKegiatan;

  const { data, isLoading } = useVerifikasiList(apiTypeFormat);

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
        <PageHeader
          title='Verifikasi Pengajuan'
          description='Review dan setujui pengajuan prestasi, sertifikasi, dan rekognisi mahasiswa.'
        />

        <FilterSection
          category={typeFilter}
          setCategory={setTypeFilter}
          categories={["Prestasi", "Sertifikasi", "Rekognisi"]}
        />

        <div className='space-y-4'>
          {isLoading ? <TableSkeleton /> : <VerificationTable data={data} />}
        </div>
      </div>
    </RoleGuard>
  );
}
