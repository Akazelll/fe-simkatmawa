"use client";

import { useState, useCallback } from "react";
import { syncQueueService } from "../services/syncQueueService";
import type { SyncQueueDetail } from "@/features/queue/types";

// Detail bersifat lazy: hanya di-fetch ketika modal dibuka (superadmin).
export function useSyncQueueDetail() {
  const [detail, setDetail] = useState<SyncQueueDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDetail = useCallback(async (id: number | string) => {
    setIsLoading(true);
    setError("");
    setDetail(null);
    try {
      const res = await syncQueueService.getDetail(id);
      if (res?.success) {
        setDetail(res.data ?? null);
      } else {
        setError(res?.message || "Gagal memuat detail sinkronisasi");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setDetail(null);
    setError("");
    setIsLoading(false);
  }, []);

  return { detail, isLoading, error, fetchDetail, reset };
}
