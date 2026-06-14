"use client";

import { useState, useEffect, useCallback } from "react";
import {
  activityLogService,
  ActivityLogQueryParams,
} from "../services/activityLogService";
import { mapBackendActivityLog } from "../utils/activityLogMapper";
import { ActivityLog } from "../types";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface ActivityLogMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export function useActivityLog(
  initialParams: ActivityLogQueryParams = { page: 1 },
) {
  const { currentUser } = useAuth();
  const [data, setData] = useState<ActivityLog[]>([]);
  const [meta, setMeta] = useState<ActivityLogMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [params, setParams] = useState<ActivityLogQueryParams>(initialParams);

  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const isAdmin =
        currentUser?.role === "admin" || currentUser?.role === "superadmin";

      const response = isAdmin
        ? await activityLogService.getAdminActivityLog(params)
        : await activityLogService.getMyActivityLog(params);

      if (response.success) {
        const raw = Array.isArray(response.data) ? response.data : [];
        setData(raw.map(mapBackendActivityLog));
        setMeta(response.meta ?? null);
      } else {
        setError(response.message || "Gagal mengambil activity log");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  }, [params, currentUser?.role]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const updateParams = (newParams: Partial<ActivityLogQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page ?? 1 }));
  };

  return {
    data,
    meta,
    isLoading,
    error,
    params,
    updateParams,
    refetch: fetchLogs,
  };
}
