"use client";

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
import { Download } from "lucide-react";

export default function ActivityLogPage() {
  const actionLabels = [
    "Semua Kategori",
    ...ACTIVITY_LOG_ACTION_OPTIONS.map((opt) => opt.label),
  ];

  const filter = usePaginationFilter<ActivityLog>({
    data: DEFAULT_ACTIVITY_LOGS,
    pageSize: 10,
    filterFn: (row, search, actionLabel) => {
      const matchSearch =
        row.user.toLowerCase().includes(search.toLowerCase()) ||
        row.targetid.toLowerCase().includes(search.toLowerCase());

      const selectedOption = ACTIVITY_LOG_ACTION_OPTIONS.find(
        (opt) => opt.label === actionLabel,
      );

      const matchAction =
        actionLabel === "Semua Kategori" ||
        row.action === selectedOption?.value;

      return matchSearch && matchAction;
    },
  });

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Log Aktivitas'
        description='Pantau riwayat perubahan data sistem'
        createPath='/activity'
        buttonIcon={Download} // <-- Perbaikan: Gunakan komponen langsung, bukan string
        buttonText='Export Log'
      />

      <FilterSection
        search={filter.search}
        setSearch={filter.setSearch}
        category={filter.category}
        setCategory={filter.setCategory}
        categories={actionLabels}
        status='Semua Status'
        setStatus={() => {}}
        statuses={["Semua Status"]}
      />

      <ActivityLogTable data={filter.paginated} />

      <Pagination
        page={filter.page}
        totalPages={filter.totalPages}
        goTo={filter.goTo}
      />
    </div>
  );
}
