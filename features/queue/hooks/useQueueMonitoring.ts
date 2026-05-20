"use client";

import { useState, useEffect } from "react";
import {
  ActiveQueueJob,
  FailedQueueJob,
  SyncHistoryItem,
} from "@/lib/queue/types";
import {
  dummyActiveQueueJobs,
  dummyFailedQueueJobs,
  dummySyncHistoryItems,
} from "../data/DummyQueueData";

export function useQueueMonitoring() {
  const [activeJobs, setActiveJobs] = useState<ActiveQueueJob[]>([]);
  const [failedJobs, setFailedJobs] = useState<FailedQueueJob[]>([]);
  const [syncHistory, setSyncHistory] = useState<SyncHistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const localActive = localStorage.getItem("simkatmawa_active_queue");
    const localFailed = localStorage.getItem("simkatmawa_failed_queue");
    const localHistory = localStorage.getItem("simkatmawa_sync_history");

    if (localActive) setActiveJobs(JSON.parse(localActive));
    else setActiveJobs(dummyActiveQueueJobs);

    if (localFailed) setFailedJobs(JSON.parse(localFailed));
    else setFailedJobs(dummyFailedQueueJobs);

    if (localHistory) setSyncHistory(JSON.parse(localHistory));
    else setSyncHistory(dummySyncHistoryItems);

    setIsLoaded(true);
  }, []);

  const updateLocalStorage = (
    active: ActiveQueueJob[],
    failed: FailedQueueJob[],
    history: SyncHistoryItem[],
  ) => {
    localStorage.setItem("simkatmawa_active_queue", JSON.stringify(active));
    localStorage.setItem("simkatmawa_failed_queue", JSON.stringify(failed));
    localStorage.setItem("simkatmawa_sync_history", JSON.stringify(history));
  };

  const retryFailedJob = (jobId: string) => {
    const jobToRetry = failedJobs.find((j) => j.id === jobId);
    if (!jobToRetry) return;

    const newNewActiveJob: ActiveQueueJob = {
      id: `job-${Date.now()}`,
      type: jobToRetry.type,
      title: jobToRetry.title,
      studentName: "Sistem Queue (Retry)",
      queuedAt: new Date().toISOString(),
      status: "waiting",
    };

    const nextFailed = failedJobs.filter((j) => j.id !== jobId);
    const nextActive = [...activeJobs, newNewActiveJob];

    setFailedJobs(nextFailed);
    setActiveJobs(nextActive);
    updateLocalStorage(nextActive, nextFailed, syncHistory);
  };

  const deleteFailedJob = (jobId: string) => {
    const nextFailed = failedJobs.filter((j) => j.id !== jobId);
    setFailedJobs(nextFailed);
    updateLocalStorage(activeJobs, nextFailed, syncHistory);
  };

  const retryAllFailedJobs = () => {
    if (failedJobs.length === 0) return;

    const newActiveJobs: ActiveQueueJob[] = failedJobs.map((fj, index) => ({
      id: `job-${Date.now()}-${index}`,
      type: fj.type,
      title: fj.title,
      studentName: "Sistem Queue (Bulk Retry)",
      queuedAt: new Date().toISOString(),
      status: "waiting",
    }));

    const nextActive = [...activeJobs, ...newActiveJobs];
    const nextFailed: FailedQueueJob[] = [];

    setActiveJobs(nextActive);
    setFailedJobs(nextFailed);
    updateLocalStorage(nextActive, nextFailed, syncHistory);
  };

  const stats = {
    waitingCount: activeJobs.filter((j) => j.status === "waiting").length,
    processingCount: activeJobs.filter((j) => j.status === "processing").length,
    successCount: syncHistory.filter((h) => h.status === "success").length,
    failedCount: failedJobs.length,
  };

  return {
    activeJobs,
    failedJobs,
    syncHistory,
    stats,
    isLoaded,
    retryFailedJob,
    deleteFailedJob,
    retryAllFailedJobs,
  };
}
