"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { RecognitionTable } from "@/features/recognition/components/RecognitionTable";
import { KATEGORI, STATUSES } from "@/features/recognition/constants";
import { AlertCircle } from "lucide-react";
import { useRekognisiList } from "@/features/recognition/hooks/useRekognisiList";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";

export default function RekognisiPage() {
  const { data, meta, isLoading, error, params, updateParams, refetch } =
    useRekognisiList({ page: 1 });

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Rekognisi'
        description='Kelola data rekognisi mahasiswa'
      />

      <FilterSection
        search={params.search || ""}
        setSearch={(val) => updateParams({ search: val })}
        category={params.level || "Semua Kategori"}
        setCategory={(val) =>
          updateParams({ level: val === "Semua Kategori" ? undefined : val })
        }
        categories={KATEGORI}
        status={params.status || "Semua Status"}
        setStatus={(val) =>
          updateParams({ status: val === "Semua Status" ? undefined : val })
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
          <TableSkeleton />
        ) : (
          <>
            <RecognitionTable data={data} onChanged={refetch} />

            {meta && meta.last_page > 1 && (
              <Pagination
                page={meta.current_page}
                totalPages={meta.last_page}
                goTo={(page) => updateParams({ page })}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
