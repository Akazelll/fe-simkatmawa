"use client";

import { useState } from "react";
import { RefreshCw, AlertCircle, Inbox } from "lucide-react";

import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSyncQueue } from "@/features/queue/hooks/useSyncQueue";
import { useSyncQueueDetail } from "@/features/queue/hooks/useSyncQueueDetail";

import {
  QueueStatCards,
  QueueStatCardsSkeleton,
} from "@/features/queue/components/QueueStatCard";
import {
  QueueTable,
  QUEUE_TABLE_COLUMNS,
} from "@/features/queue/components/QueueTable";
import { QueuePauseBanner } from "@/features/queue/components/QueuePauseBanner";
import {
  QueueControlToggle,
  QueueControlToggleSkeleton,
} from "@/features/queue/components/QueueControlToggle";
import { SyncQueueDetailModal } from "@/features/queue/components/SyncQueueDetailModal";
import {
  STATUS_FILTER_LABELS,
  statusLabelToParam,
} from "@/features/queue/constants";

import { FilterSection } from "@/features/shared/components/FilterSection";
import { Pagination } from "@/features/shared/components/Pagination";
import { TableSkeleton } from "@/features/shared/components/TableSkeleton";
import { EmptyState } from "@/features/shared/components/EmptyState";
import { useSkeletonRows } from "@/features/shared/hooks/useSkeletonRows";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function QueueMonitoringPage() {
  return (
    <div className='p-6 space-y-6 max-w-7xl mx-auto animate-in fade-in duration-500'>
      <RoleGuard allowedRoles={["admin", "superadmin"]}>
        <QueueMonitoringContent />
      </RoleGuard>
    </div>
  );
}

function QueueMonitoringContent() {
  const { currentUser } = useAuth();
  const isSuperadmin = currentUser?.role === "superadmin";

  const {
    stats,
    items,
    meta,
    isLoading,
    isMutating,
    error,
    setStatus,
    setPage,
    retry,
    retryAll,
    toggle,
  } = useSyncQueue();

  const detail = useSyncQueueDetail();
  const [detailOpen, setDetailOpen] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Semua Status");

  const skeletonRows = useSkeletonRows("queue", items.length, !isLoading);

  const handleStatusChange = (label: string) => {
    setStatusLabel(label);
    setStatus(statusLabelToParam(label));
  };

  const handleShowDetail = (id: number) => {
    setDetailOpen(true);
    detail.fetchDetail(id);
  };

  return (
    <div className='space-y-6'>
      {/* Header: judul + kontrol global queue (superadmin) */}
      <div className='flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-extrabold tracking-tight text-[#1a2b5e]'>
            Queue Monitoring
          </h1>
          <p className='text-xs font-medium text-slate-500'>
            Pantau antrean sinkronisasi data submission ke Kemdiktisaintek
            secara real-time
          </p>
        </div>

        {isSuperadmin &&
          (isLoading ? (
            <QueueControlToggleSkeleton />
          ) : stats ? (
            <QueueControlToggle
              isPaused={stats.is_paused}
              onToggle={toggle}
              disabled={isMutating}
            />
          ) : null)}
      </div>

      <QueuePauseBanner stats={stats} />

      {isLoading || !stats ? (
        <QueueStatCardsSkeleton />
      ) : (
        <QueueStatCards stats={stats} />
      )}

      <FilterSection
        status={statusLabel}
        setStatus={handleStatusChange}
        statuses={STATUS_FILTER_LABELS}
      />

      {error && !isLoading && (
        <div className='flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700'>
          <AlertCircle size={16} className='shrink-0' />
          {error}
        </div>
      )}

      {isLoading ? (
        <div className='space-y-4'>
          {/* Skeleton baris aksi: ringkasan total + tombol Ulangi */}
          <div className='flex items-center justify-between gap-2'>
            <Skeleton className='h-4 w-36 rounded-md' />
            <Skeleton className='h-9 w-24 rounded-xl' />
          </div>
          <TableSkeleton columns={QUEUE_TABLE_COLUMNS} rows={skeletonRows} />
        </div>
      ) : (
        <div className='space-y-4'>
          {/* Aksi data: ringkasan total + ulangi semua gagal — selalu tampil */}
          <div className='flex items-center justify-between gap-2'>
            <span className='text-xs font-medium text-slate-400'>
              Total {meta?.total ?? items.length} item antrean
            </span>
            <Button
              onClick={() => retryAll()}
              disabled={isMutating || !stats || stats.failed === 0}
              size='sm'
              className='h-9 gap-2 rounded-xl bg-[#1a2b5e] font-bold text-white shadow-sm hover:bg-[#111d42] disabled:opacity-50'
            >
              <RefreshCw size={15} /> Ulangi
            </Button>
          </div>

          {items.length === 0 ? (
            <EmptyState
              icon={<Inbox size={28} />}
              title='Tidak ada antrean'
              description='Belum ada item sinkronisasi untuk filter ini.'
            />
          ) : (
            <>
              <QueueTable
                items={items}
                onRetry={retry}
                onShowDetail={handleShowDetail}
                isSuperadmin={isSuperadmin}
                isMutating={isMutating}
              />
              <Pagination meta={meta} onPageChange={setPage} />
            </>
          )}
        </div>
      )}

      <SyncQueueDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        detail={detail.detail}
        isLoading={detail.isLoading}
        error={detail.error}
      />
    </div>
  );
}
