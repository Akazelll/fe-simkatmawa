"use client";

import { useQueueMonitoring } from "@/features/queue/hooks/use-queue-monitoring";
import { QueueStatCards } from "@/features/queue/components/queue-stat-cards";
import { QueueMonitoringTabs } from "@/features/queue/components/queue-monitoring-tabs";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function QueueMonitoringPage() {
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

  if (!isLoaded) return null;

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className='p-6 space-y-6 max-w-7xl mx-auto'>
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
        <QueueStatCards stats={stats} />
        <div className='pt-2'>
          <QueueMonitoringTabs
            activeJobs={activeJobs}
            failedJobs={failedJobs}
            syncHistory={syncHistory}
            onRetry={retryFailedJob}
            onDelete={deleteFailedJob}
            onRetryAll={retryAllFailedJobs}
          />
        </div>
      </div>
    </RoleGuard>
  );
}
