"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { syncQueueService } from "../services/syncQueueService";
import type {
  SyncQueueItem,
  SyncQueueStats,
  SyncQueueStatusFilter,
  ToggleAction,
} from "@/features/queue/types";
import type { PaginationMeta } from "@/features/shared/types/pagination";
import { PAGE_SIZE } from "@/features/shared/constants/pagination";

const POLL_INTERVAL_MS = 15_000;

export function useSyncQueue() {
  const [status, setStatusState] = useState<SyncQueueStatusFilter>("all");
  const [page, setPage] = useState(1);

  const [stats, setStats] = useState<SyncQueueStats | null>(null);
  const [items, setItems] = useState<SyncQueueItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState("");

  const hasLoadedRef = useRef(false);
  const isMutatingRef = useRef(false);

  const fetchData = useCallback(
    async ({ silent = false }: { silent?: boolean } = {}) => {
      if (!silent && !hasLoadedRef.current) setIsLoading(true);
      try {
        const [statsRes, listRes] = await Promise.all([
          syncQueueService.getStats(),
          syncQueueService.getList({ status, page, limit: PAGE_SIZE }),
        ]);

        if (statsRes?.success) setStats(statsRes.data ?? null);
        if (listRes?.success) {
          setItems(Array.isArray(listRes.data) ? listRes.data : []);
          setMeta(listRes.meta ?? null);
        }
        setError("");
        hasLoadedRef.current = true;
      } catch (err: any) {
        if (!silent) {
          setError(
            err?.response?.data?.message ||
              "Gagal memuat data antrean sinkronisasi",
          );
        }
      } finally {
        if (!silent) setIsLoading(false);
      }
    },
    [status, page],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Polling diam-diam, dijeda saat ada aksi yang sedang berjalan.
  useEffect(() => {
    const id = setInterval(() => {
      if (!isMutatingRef.current) fetchData({ silent: true });
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchData]);

  const runMutation = useCallback(
    async (fn: () => Promise<any>, successMsg?: string) => {
      setIsMutating(true);
      isMutatingRef.current = true;
      try {
        const res = await fn();
        if (res?.success === false) {
          toast.error(res?.message || "Aksi gagal diproses");
          return res;
        }
        toast.success(successMsg || res?.message || "Aksi berhasil diproses");
        await fetchData({ silent: true });
        return res;
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || "Terjadi kesalahan pada server",
        );
        throw err;
      } finally {
        setIsMutating(false);
        isMutatingRef.current = false;
      }
    },
    [fetchData],
  );

  const retry = useCallback(
    (id: number | string) =>
      runMutation(
        () => syncQueueService.retry(id),
        "Item diantrikan ulang untuk diproses.",
      ),
    [runMutation],
  );

  const retryAll = useCallback(
    () => runMutation(() => syncQueueService.retryAll()),
    [runMutation],
  );

  const toggle = useCallback(
    (action: ToggleAction) => runMutation(() => syncQueueService.toggle(action)),
    [runMutation],
  );

  const setStatus = useCallback((next: SyncQueueStatusFilter) => {
    setStatusState(next);
    setPage(1); // selalu kembali ke halaman 1 saat filter berubah
  }, []);

  return {
    // data
    stats,
    items,
    meta,
    // ui state
    status,
    page,
    isLoading,
    isMutating,
    error,
    // actions
    setStatus,
    setPage,
    retry,
    retryAll,
    toggle,
    refetch: () => fetchData({ silent: true }),
  };
}
