"use client";

import { useState } from "react";
import { useQueueMonitoring } from "@/features/queue/hooks/useQueueMonitoring";
import {
  QueueStatCards,
  QueueStatCardsSkeleton,
} from "@/features/queue/components/QueueStatCard";
import { QUEUE_TABLE_COLUMNS } from "@/features/queue/components/QueueTable";
import { QueueMonitoringTabs } from "@/features/queue/components/QueueMonitoringTabs";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

import { FilterSection } from "@/features/shared/components/FilterSection";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { useSkeletonRows } from "@/features/shared/hooks/useSkeletonRows";
import { Skeleton } from "@/components/ui/skeleton";

export default function QueueMonitoringPage() {
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const {
    activeJobs,
    failedJobs,
    syncHistory,
    stats,
    isLoaded,
    retryFailedJob,
    deleteFailedJob,
    retryAllFailedJobs,
  } = useQueueMonitoring();

  const skeletonRows = useSkeletonRows("queue", activeJobs?.length, isLoaded);

  return (
    <div className='p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-5'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2.5'>
            <h1 className='text-2xl font-extrabold text-[#1a2b5e] tracking-tight'>
              Queue Monitoring
            </h1>
          </div>
          <p className='text-xs font-medium text-slate-500'>
            Pantau antrean sinkronisasi data submission ke Kemdiktisaintek
            secara real-time
          </p>
        </div>
      </div>

      <FilterSection
        status={statusFilter}
        setStatus={setStatusFilter}
        statuses={["Semua Status", "Menunggu", "Proses", "Gagal"]}
      />

      <RoleGuard allowedRoles={["admin", "superadmin"]}>
        {!isLoaded ? (
          <div className='space-y-6'>
            <QueueStatCardsSkeleton />

            <div className='pt-2 space-y-4'>
              <div className='flex gap-2'>
                <Skeleton className='h-10 w-32 rounded-lg' />
                <Skeleton className='h-10 w-32 rounded-lg' />
                <Skeleton className='h-10 w-32 rounded-lg' />
              </div>
              <TableSkeleton columns={QUEUE_TABLE_COLUMNS} rows={skeletonRows} />
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            <QueueStatCards stats={stats} />

            <div className='pt-2'>
              <QueueMonitoringTabs
                statusFilter={statusFilter}
                activeJobs={activeJobs}
                failedJobs={failedJobs}
                syncHistory={syncHistory}
                onRetry={retryFailedJob}
                onDelete={deleteFailedJob}
                onRetryAll={retryAllFailedJobs}
              />
            </div>
          </div>
        )}
      </RoleGuard>
    </div>
  );
}
