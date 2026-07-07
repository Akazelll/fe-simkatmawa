"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import {
  RecognitionTable,
  RECOGNITION_TABLE_COLUMNS,
} from "@/features/recognition/components/RecognitionTable";
import { KATEGORI, STATUSES } from "@/features/recognition/constants";
import {
  mapMahasiswaStatusFilter,
  mahasiswaStatusParamToLabel,
} from "@/features/shared/constants/submissionStatus";
import { AlertCircle } from "lucide-react";
import { useRekognisiList } from "@/features/recognition/hooks/useRekognisiList";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { useSkeletonRows } from "@/features/shared/hooks/useSkeletonRows";

export default function RekognisiPage() {
  const { data, meta, isLoading, error, params, updateParams, refetch } =
    useRekognisiList({ page: 1 });

  const skeletonRows = useSkeletonRows("recognition", data.length, !isLoading);

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Rekognisi'
        description='Kelola data rekognisi mahasiswa'
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
        status={mahasiswaStatusParamToLabel(params.status)}
        setStatus={(val) =>
          updateParams({
            status: mapMahasiswaStatusFilter(val),
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
            columns={RECOGNITION_TABLE_COLUMNS}
            rows={skeletonRows}
            header
          />
        ) : (
          <>
            <RecognitionTable data={data} onChanged={refetch} />

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
