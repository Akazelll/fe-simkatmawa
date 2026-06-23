"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import {
  CertificateTable,
  CERTIFICATE_TABLE_COLUMNS,
} from "@/features/certificate/components/CertificateTable";
import { KATEGORI, STATUSES } from "@/features/certificate/constants";
import { AlertCircle } from "lucide-react";
import { useSertifikasiList } from "@/features/certificate/hooks/useSertifikasiList";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { useSkeletonRows } from "@/features/shared/hooks/useSkeletonRows";

export default function SertifikatPage() {
  const { data, meta, isLoading, error, params, updateParams, refetch } =
    useSertifikasiList({ page: 1 });

  const skeletonRows = useSkeletonRows("certificate", data.length, !isLoading);

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Sertifikat'
        description='Kelola data sertifikat mahasiswa'
      />

      <FilterSection
        search={params.search || ""}
        setSearch={(val) => updateParams({ search: val, page: 1 })}
        category={params.level || "Semua Kategori"}
        setCategory={(val) =>
          updateParams({
            level: val === "Semua Kategori" ? undefined : val,
            page: 1,
          })
        }
        categories={KATEGORI}
        status={params.status || "Semua Status"}
        setStatus={(val) =>
          updateParams({
            status: val === "Semua Status" ? undefined : val,
            page: 1,
          })
        }
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
            columns={CERTIFICATE_TABLE_COLUMNS}
            rows={skeletonRows}
            header
          />
        ) : (
          <>
            <CertificateTable data={data} onChanged={refetch} />

            {/* PERBAIKAN: Menggunakan props 'meta' dan 'onPageChange' */}
            {meta && meta.last_page > 1 && (
              <Pagination
                meta={meta}
                onPageChange={(page) => updateParams({ page })}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
