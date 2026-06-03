"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { AchievementTable } from "@/features/achievement/components/AchievementTable";
import { KATEGORI, STATUSES } from "@/features/achievement/constants";
import { usePrestasiList } from "@/features/achievement/hooks/usePrestasiList";
import { AlertCircle, Loader2 } from "lucide-react";

export default function PrestasiPage() {
  const { data, meta, isLoading, error, params, updateParams, refetch } =
    usePrestasiList({ page: 1 });

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Prestasi Mandiri'
        description='Kelola data prestasi mahasiswa'
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

      {isLoading ? (
        <div className='flex justify-center items-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm'>
          <Loader2 className='w-8 h-8 animate-spin text-[#1a2b5e]' />
        </div>
      ) : (
        <>
          <AchievementTable data={data} onChanged={refetch} />

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
  );
}
