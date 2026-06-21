"use client";

import { useState } from "react";
import { Download, AlertCircle } from "lucide-react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { Pagination } from "@/features/shared/components/Pagination";
import { ActivityLogTable } from "@/features/activity/components/ActivityLogTable";
import { ActivityLogFilter } from "@/features/activity/components/ActivityLogFilter";
import { PAGE_SIZE } from "@/features/shared/constants/pagination";
import { ExportLogButton } from "@/features/activity/components/ExportLogButton";
import { ExportLogModal } from "@/features/activity/components/ExportLogModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useActivityLog } from "@/features/activity/hooks/useActivityLog";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";

export default function ActivityLogPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const { currentUser, isLoaded: isAuthLoaded } = useAuth();

  // Fetching data menggunakan hook custom
  const { data, meta, isLoading, error, params, updateParams } = useActivityLog(
    {
      page: 1,
      per_page: PAGE_SIZE,
    },
  );

  const isAdmin =
    currentUser?.role === "admin" || currentUser?.role === "superadmin";

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Activity Logs'
        description={
          isAdmin
            ? "Monitor semua aktivitas sistem dan tindakan pengguna."
            : "Riwayat aktivitas akun kamu di SIMKATMAWA."
        }
      >
        <ExportLogButton onClick={() => setIsExportModalOpen(true)}>
          <Download className='mr-2 h-4 w-4' />
          Export Log
        </ExportLogButton>
      </PageHeader>

      <ActivityLogFilter
        search={params.search || ""}
        onSearchChange={(val) => updateParams({ search: val, page: 1 })}
        actionValue={params.action}
        onActionChange={(val) => updateParams({ action: val, page: 1 })}
        categoryValue={params.module}
        onCategoryChange={(val) => updateParams({ module: val, page: 1 })}
      />

      {error && (
        <div className='flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200'>
          <AlertCircle className='w-5 h-5 shrink-0' />
          <p>{error}</p>
        </div>
      )}

      <div className='space-y-4'>
        {isLoading || !isAuthLoaded ? (
          <TableSkeleton />
        ) : (
          <>
            <ActivityLogTable data={data} />

            {/* PERBAIKAN: Menggunakan props 'meta' dan 'onPageChange' yang baru */}
            {meta && meta.last_page > 1 && (
              <Pagination
                meta={meta}
                onPageChange={(page) => updateParams({ page })}
              />
            )}
          </>
        )}
      </div>

      <ExportLogModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
      />
    </div>
  );
}
