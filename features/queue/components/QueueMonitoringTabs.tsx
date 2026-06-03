"use client";

import { useMemo, useState, useEffect } from "react";
import {
  ActiveQueueJob,
  FailedQueueJob,
  SyncHistoryItem,
} from "@/lib/queue/types";
import { QueueTable } from "./QueueTable";
import { Pagination } from "@/features/shared/components/Pagination";
import { PAGE_SIZE } from "@/features/shared/constants/pagination";

interface Props {
  statusFilter: string;
  activeJobs: ActiveQueueJob[];
  failedJobs: FailedQueueJob[];
  syncHistory: SyncHistoryItem[];
  onRetry: (id: string) => void;
  onDelete: (id: string) => void;
  onRetryAll: () => void;
}

export function QueueMonitoringTabs({
  statusFilter,
  activeJobs,
  failedJobs,
  onRetry,
  onDelete,
  onRetryAll,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Map dan gabungkan semua data ke dalam format seragam
  const unifiedJobs = useMemo(() => {
    const active = activeJobs.map((job) => ({
      id: job.id,
      type: job.type,
      title: job.title,
      studentName: job.studentName,
      date: job.queuedAt,
      status: job.status, // "waiting" | "processing"
    }));

    const failed = failedJobs.map((job) => ({
      id: job.id,
      type: job.type,
      title: job.title,
      studentName: "-", // Failed data dari API mungkin tidak punya nama mhs
      date: job.failedAt,
      status: "failed",
      reason: job.reason,
    }));

    // Urutkan berdasarkan tanggal terbaru
    return [...active, ...failed].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [activeJobs, failedJobs]);

  // Filter berdasarkan dropdown
  const filteredJobs = useMemo(() => {
    if (statusFilter === "Menunggu")
      return unifiedJobs.filter((job) => job.status === "waiting");
    if (statusFilter === "Proses")
      return unifiedJobs.filter((job) => job.status === "processing");
    if (statusFilter === "Gagal")
      return unifiedJobs.filter((job) => job.status === "failed");
    return unifiedJobs; // "Semua Status"
  }, [unifiedJobs, statusFilter]);

  // Pagination
  const paginate = (data: any[], page: number) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return data.slice(startIndex, startIndex + PAGE_SIZE);
  };

  const paginatedJobs = useMemo(
    () => paginate(filteredJobs, currentPage),
    [filteredJobs, currentPage],
  );

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);

  return (
    <div className='space-y-4 animate-in fade-in duration-300'>
      <QueueTable
        jobs={paginatedJobs}
        onRetry={onRetry}
        onDelete={onDelete}
        onRetryAll={onRetryAll}
        showRetryAll={
          statusFilter === "Gagal" || statusFilter === "Semua Status"
        }
      />
      {totalPages > 1 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          goTo={setCurrentPage}
        />
      )}
    </div>
  );
}
