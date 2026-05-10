"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { QueueStats } from "@/features/queue/components/QueueStats";
import { QueueTable } from "@/features/queue/components/QueueTable";
import { usePaginationFilter } from "@/features/shared/hooks/usePaginationFilter";
import {
  DEFAULT_JOBS,
  STATUS_OPTIONS,
  PAGE_SIZE,
} from "@/features/queue/constants";
import { QueueJob } from "@/features/queue/types";
import { RefreshCw } from "lucide-react";

export default function QueuePage() {
  const filter = usePaginationFilter<QueueJob>({
    data: DEFAULT_JOBS,
    pageSize: PAGE_SIZE,
    filterFn: (row, _search, _category, status) => {
      const matchStatus =
        status === "Semua Status" ||
        row.status.toLowerCase() === status.toLowerCase();
      return matchStatus;
    },
  });

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <PageHeader
        title='Queue Monitoring'
        description='Monitor sync jobs to Kemdikbud API'
        createPath='/queue'
        buttonText='Refresh'
        buttonIcon={RefreshCw}
      />

      <QueueStats />

      <FilterSection
        status={filter.status}
        setStatus={filter.setStatus}
        statuses={STATUS_OPTIONS}
        statusLabel='Filter by Status'
      />

      <QueueTable data={filter.paginated} />

      <Pagination
        page={filter.page}
        totalPages={filter.totalPages}
        goTo={filter.goTo}
      />
    </div>
  );
}
