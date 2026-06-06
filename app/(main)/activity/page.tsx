"use client";

import { useState } from "react";
import { Download, AlertCircle } from "lucide-react";
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
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";

export default function ActivityLogPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const { currentUser, isLoaded: isAuthLoaded } = useAuth();

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

  if (isAuthLoaded && hasRole(currentUser, "mahasiswa")) {
    return (
      <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
        <PageHeader
          title='Activity Logs'
          description='Riwayat aktivitas akun kamu di SIMKATMAWA.'
        >
          <ExportLogButton onClick={() => setIsExportModalOpen(true)}>
            <Download className='mr-2 h-4 w-4' />
            Export Log
          </ExportLogButton>
        </PageHeader>

        {studentLog.error && (
          <div className='flex items-center gap-2 p-4 text-red-700 bg-red-50 rounded-lg border border-red-200'>
            <AlertCircle className='w-5 h-5' />
            <p>{studentLog.error}</p>
          </div>
        )}

        <div className='space-y-4'>
          {studentLog.isLoading ? (
            <TableSkeleton />
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

        <ExportLogModal
          open={isExportModalOpen}
          onOpenChange={setIsExportModalOpen}
        />
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

      <div className='space-y-4'>
        {!isAuthLoaded ? (
          <TableSkeleton />
        ) : (
          <>
            <ActivityLogTable data={adminFilter.paginated} />

            {adminFilter.totalPages > 1 && (
              <Pagination
                page={adminFilter.page}
                totalPages={adminFilter.totalPages}
                goTo={adminFilter.goTo}
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
