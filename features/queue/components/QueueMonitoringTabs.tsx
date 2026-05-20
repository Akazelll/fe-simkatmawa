"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ActiveQueueJob,
  FailedQueueJob,
  SyncHistoryItem,
} from "@/lib/queue/types";
import { ActiveQueueTable } from "./ActiveQueueTable";
import { FailedJobsTable } from "./FailedJobsTable";
import { SyncHistoryTable } from "./SyncHistoryTable";

interface Props {
  activeJobs: ActiveQueueJob[];
  failedJobs: FailedQueueJob[];
  syncHistory: SyncHistoryItem[];
  onRetry: (id: string) => void;
  onDelete: (id: string) => void;
  onRetryAll: () => void;
}

export function QueueMonitoringTabs({
  activeJobs,
  failedJobs,
  syncHistory,
  onRetry,
  onDelete,
  onRetryAll,
}: Props) {
  return (
    <Tabs defaultValue='active' className='w-full'>
      <TabsList className='bg-slate-100 p-1 rounded-xl h-11 mb-4 border border-slate-200/40'>
        <TabsTrigger
          value='active'
          className='rounded-lg text-xs font-bold px-4 data-[state=checked]:bg-white data-[state=checked]:text-[#1a2b5e] data-[state=checked]:shadow-sm'
        >
          Antrean Aktif
        </TabsTrigger>
        <TabsTrigger
          value='failed'
          className='rounded-lg text-xs font-bold px-4 data-[state=checked]:bg-white data-[state=checked]:text-[#1a2b5e] data-[state=checked]:shadow-sm'
        >
          Gagal ({failedJobs.length})
        </TabsTrigger>
        <TabsTrigger
          value='history'
          className='rounded-lg text-xs font-bold px-4 data-[state=checked]:bg-white data-[state=checked]:text-[#1a2b5e] data-[state=checked]:shadow-sm'
        >
          Riwayat Sync
        </TabsTrigger>
      </TabsList>

      <TabsContent value='active' className='mt-0 focus-visible:outline-none'>
        <ActiveQueueTable jobs={activeJobs} />
      </TabsContent>
      <TabsContent value='failed' className='mt-0 focus-visible:outline-none'>
        <FailedJobsTable
          jobs={failedJobs}
          onRetry={onRetry}
          onDelete={onDelete}
          onRetryAll={onRetryAll}
        />
      </TabsContent>
      <TabsContent value='history' className='mt-0 focus-visible:outline-none'>
        <SyncHistoryTable history={syncHistory} />
      </TabsContent>
    </Tabs>
  );
}
