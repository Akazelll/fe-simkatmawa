"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AppNotification } from "../types";
import { notificationService } from "../services/notificationService";
import { showNotificationToast } from "../components/NotificationToast";
import { getEcho } from "@/lib/echo";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Re-sync berkala sebagai fallback bila koneksi WebSocket terputus.
const POLL_INTERVAL_MS = 60_000;

/**
 * Hook notifikasi: load awal via REST, update real-time via Laravel Echo
 * (channel privat `notifications.{userId}`, event `.notification.new`).
 */
export function useNotifications() {
  const { currentUser } = useAuth();
  const userId = currentUser?.id;

  const [items, setItems] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mirror items terbaru untuk dibaca di dalam callback tanpa stale closure.
  const itemsRef = useRef<AppNotification[]>([]);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // ID notifikasi yang sudah pernah diproses (di-toast atau di-load awal).
  // Dipakai agar tiap notifikasi hanya memunculkan toast sekali, baik datang
  // lewat WebSocket maupun lewat polling REST.
  const seenIdsRef = useRef<Set<AppNotification["id"]>>(new Set());
  const initializedRef = useRef(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const [listRes, countRes] = await Promise.all([
        notificationService.list({ limit: 15 }),
        notificationService.unreadCount(),
      ]);

      const list = Array.isArray(listRes?.data) ? listRes.data : [];

      // Munculkan toast untuk notifikasi BARU yang masuk lewat REST/polling
      // (mis. ketika WebSocket sempat terputus). Load pertama dilewati agar
      // tidak memunculkan toast untuk seluruh riwayat sekaligus.
      if (initializedRef.current) {
        const fresh = list.filter(
          (n) => !n.is_read && !seenIdsRef.current.has(n.id),
        );
        // Tampilkan dari terlama → terbaru agar yang terbaru muncul paling atas.
        [...fresh].reverse().forEach((n) => showNotificationToast(n));
      }
      list.forEach((n) => seenIdsRef.current.add(n.id));
      initializedRef.current = true;

      setItems(list);
      setUnreadCount(countRes?.unread_count ?? 0);
    } catch {
      // Diamkan — pertahankan state lama. Interceptor 401 menangani auth.
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load awal + fallback polling.
  useEffect(() => {
    if (!userId) return;
    // Reset jejak saat user berganti agar riwayat user baru tidak ikut di-toast.
    seenIdsRef.current = new Set();
    initializedRef.current = false;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [userId, fetchNotifications]);

  // Subscribe real-time.
  useEffect(() => {
    if (!userId) return;
    const echo = getEcho();
    if (!echo) return;

    const channelName = `notifications.${userId}`;
    echo
      .private(channelName)
      .listen(".notification.new", (payload: AppNotification) => {
        setItems((prev) =>
          prev.some((n) => n.id === payload.id) ? prev : [payload, ...prev],
        );

        // Hanya proses bila benar-benar baru (belum pernah di-toast via REST).
        if (seenIdsRef.current.has(payload.id)) return;
        seenIdsRef.current.add(payload.id);
        setUnreadCount((c) => c + 1);
        // Pop-up kustom di kanan atas saat notifikasi diterima.
        showNotificationToast(payload);
      });

    return () => {
      echo.leave(channelName);
    };
  }, [userId]);

  const markAsRead = useCallback(
    async (id: AppNotification["id"]) => {
      const target = itemsRef.current.find((n) => n.id === id);
      if (!target || target.is_read) return;

      const nowIso = new Date().toISOString();
      setItems((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, is_read: true, read_at: nowIso } : n,
        ),
      );
      setUnreadCount((c) => Math.max(0, c - 1));

      try {
        await notificationService.markRead(String(id));
      } catch {
        // Gagal — re-sync agar state kembali konsisten dengan backend.
        fetchNotifications();
      }
    },
    [fetchNotifications],
  );

  const removeNotification = useCallback(
    async (id: AppNotification["id"]) => {
      const target = itemsRef.current.find((n) => n.id === id);
      if (!target) return;

      // Optimistic: buang dari daftar + kurangi badge bila masih belum dibaca.
      setItems((prev) => prev.filter((n) => n.id !== id));
      if (!target.is_read) setUnreadCount((c) => Math.max(0, c - 1));

      try {
        await notificationService.remove(String(id));
      } catch {
        // Gagal — re-sync agar state kembali konsisten dengan backend.
        fetchNotifications();
      }
    },
    [fetchNotifications],
  );

  const markAllAsRead = useCallback(async () => {
    const hasUnread = itemsRef.current.some((n) => !n.is_read);
    if (!hasUnread && unreadCount === 0) return;

    const nowIso = new Date().toISOString();
    setItems((prev) =>
      prev.map((n) =>
        n.is_read ? n : { ...n, is_read: true, read_at: nowIso },
      ),
    );
    setUnreadCount(0);

    try {
      await notificationService.markAllRead();
    } catch {
      fetchNotifications();
    }
  }, [fetchNotifications, unreadCount]);

  return {
    items,
    unreadCount,
    isLoading,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };
}
