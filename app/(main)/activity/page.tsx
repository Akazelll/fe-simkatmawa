"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { ActivityLogTable } from "@/features/activity/components/ActivityLogTable";
import { StudentActivityTable } from "@/features/activity/components/StudentActivityTable";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import {
  DEFAULT_ACTIVITY_LOGS,
  ACTIVITY_LOG_ACTION_OPTIONS,
} from "@/features/activity/constants";
import { ActivityLog } from "@/features/activity/types";
import { Download } from "lucide-react";
import { PAGE_SIZE } from "@/features/shared/constants/pagination";
import { ExportLogButton } from "@/features/activity/components/ExportLogButton";
import { ExportLogModal } from "@/features/activity/components/ExportLogModal";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { hasRole } from "@/lib/auth/permissions";
import {
  STUDENT_ACTIVITY_DATA,
  StudentActivityEvent,
} from "@/features/activity/constants/student-activity";

const PAGE_SIZE_STUDENT = 8;

export default function ActivityLogPage() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const { currentUser, isLoaded } = useAuth();

  const studentFilter = usePaginationFilter<StudentActivityEvent>({
    data: [...STUDENT_ACTIVITY_DATA].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    ),
    pageSize: PAGE_SIZE_STUDENT,
    filterFn: () => true,
  });

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

        <StudentActivityTable data={studentFilter.paginated} />

        <Pagination
          page={studentFilter.page}
          totalPages={studentFilter.totalPages}
          goTo={studentFilter.goTo}
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
