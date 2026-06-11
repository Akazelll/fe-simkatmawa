"use client";

import { useCallback, useEffect, useState } from "react";
import { AppNotification } from "../types";
import { MOCK_NOTIFICATIONS } from "../data/mockNotifications";

/**
 * Hook notifikasi mahasiswa.
 *
 * TEMP: sekarang pake mock data. Pas BE ready, swap fetchNotifications()
 * jadi pakai notificationService:
 *   const res = await notificationService.list({ page: 1 });
 *   setItems(res.data);
 */
export function useNotifications() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    // TEMP: simulasi delay biar UX-nya realistis pas demo
    await new Promise((r) => setTimeout(r, 300));
    setItems(MOCK_NOTIFICATIONS);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNotifications();
    // Polling tiap 30 detik
    const interval = setInterval(fetchNotifications, 30_000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const unreadCount = items.filter((n) => !n.read_at).length;

  const markAsRead = useCallback((id: AppNotification["id"]) => {
    setItems((prev) =>
      prev.map((n) =>
        n.id === id && !n.read_at
          ? { ...n, read_at: new Date().toISOString() }
          : n,
      ),
    );
    // TEMP: nanti panggil notificationService.markRead(id)
  }, []);

  const markAllAsRead = useCallback(() => {
    const nowIso = new Date().toISOString();
    setItems((prev) =>
      prev.map((n) => (n.read_at ? n : { ...n, read_at: nowIso })),
    );
    // TEMP: nanti panggil notificationService.markAllRead()
  }, []);

  return {
    items,
    unreadCount,
    isLoading,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead,
  };
}
