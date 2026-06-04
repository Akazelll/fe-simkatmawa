"use client";

import { useState } from "react";
import { Download, AlertCircle, Loader2 } from "lucide-react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { ActivityLogTable } from "@/features/activity/components/ActivityLogTable";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import {
  DEFAULT_ACTIVITY_LOGS,
  ACTIVITY_LOG_ACTION_OPTIONS,
} from "@/features/activity/constants";
import { ActivityLog } from "@/features/activity/types";
import { PAGE_SIZE } from "@/features/shared/constants/pagination";
import { ExportLogButton } from "@/features/activity/components/ExportLogButton";
import { ExportLogModal } from "@/features/activity/components/ExportLogModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { hasRole } from "@/lib/auth/permissions";
import { useActivityLog } from "@/features/activity/hooks/useActivityLog";

export default function ActivityLogPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const { currentUser, isLoaded } = useAuth();

  const studentLog = useActivityLog({ page: 1, per_page: PAGE_SIZE });

  const actionLabels = [
    "Semua Kategori",
    ...ACTIVITY_LOG_ACTION_OPTIONS.map((opt) => opt.label),
  ];

  const adminFilter = usePaginationFilter<ActivityLog>({
    data: DEFAULT_ACTIVITY_LOGS,
    pageSize: PAGE_SIZE,
    filterFn: (row, search, actionLabel) => {
      const matchSearch =
        row.user.toLowerCase().includes(search.toLowerCase()) ||
        row.target.toLowerCase().includes(search.toLowerCase());

      const selectedOption = ACTIVITY_LOG_ACTION_OPTIONS.find(
        (opt) => opt.label === actionLabel,
      );

      const matchAction =
        actionLabel === "Semua Kategori" ||
        row.action === selectedOption?.value;

      return matchSearch && matchAction;
    },
  });

  if (!isLoaded) return null;

  if (hasRole(currentUser, "mahasiswa")) {
    return (
      <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
        <PageHeader
          title='Activity Log'
          description='Riwayat aktivitas akun kamu di SIMKATMAWA.'
        />

        {studentLog.error && (
          <div className='flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200'>
            <AlertCircle className='w-5 h-5' />
            <p>{studentLog.error}</p>
          </div>
        )}

        {studentLog.isLoading ? (
          <div className='flex justify-center items-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm'>
            <Loader2 className='w-8 h-8 animate-spin text-[#1a2b5e]' />
          </div>
        ) : (
          <>
            <ActivityLogTable data={studentLog.data} />

            {studentLog.meta && studentLog.meta.last_page > 1 && (
              <Pagination
                page={studentLog.meta.current_page}
                totalPages={studentLog.meta.last_page}
                goTo={(page) => studentLog.updateParams({ page })}
              />
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Activity Logs'
        description='Monitor all system activities and user actions'
      >
        <ExportLogButton onClick={() => setIsExportModalOpen(true)}>
          <Download className='mr-2 h-4 w-4' />
          Export Log
        </ExportLogButton>
      </PageHeader>

      <FilterSection
        search={adminFilter.search}
        setSearch={adminFilter.setSearch}
        category={adminFilter.category}
        setCategory={adminFilter.setCategory}
        categories={actionLabels}
        status='Semua Status'
        setStatus={() => {}}
        statuses={["Semua Status"]}
      />

      <ActivityLogTable data={adminFilter.paginated} />

      {adminFilter.totalPages > 1 && (
        <Pagination
          page={adminFilter.page}
          totalPages={adminFilter.totalPages}
          goTo={adminFilter.goTo}
        />
      )}

      <ExportLogModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
      />
    </div>
  );
}
