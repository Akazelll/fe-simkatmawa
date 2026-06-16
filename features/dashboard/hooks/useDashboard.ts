"use client";

import { useState, useEffect, useCallback } from "react";
import { dashboardService } from "../services/dashboardService";

export function useDashboard(enabled = true) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const res = await dashboardService.getAdminDashboard();
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Gagal memuat data dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, isLoading, refetch: fetchDashboard };
}
