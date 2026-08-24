"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AppNotification } from "../types";
import { notificationService } from "../services/notificationService";
import { showNotificationToast } from "../components/NotificationToast";
import { getEcho } from "@/lib/echo";
import { useAuth } from "@/features/auth/hooks/useAuth";

// Re-sync berkala sebagai fallback bila koneksi WebSocket terputus.
const POLL_INTERVAL_MS = 60_000;

// ID notifikasi yang sudah pernah diproses secara global (disimpan dalam bentuk string untuk menghindari mismatch tipe number/string)
const globalSeenNotificationIds = new Set<string>();

const isAlreadySeen = (id: string | number) => globalSeenNotificationIds.has(String(id));
const markAsSeen = (id: string | number) => globalSeenNotificationIds.add(String(id));

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

  // Guard agar Echo subscription hanya aktif satu kali (mencegah duplikat
  // akibat React Strict Mode mount → unmount → mount).
  const echoSubscribedRef = useRef(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const [listRes, countRes] = await Promise.all([
        notificationService.list({ limit: 15 }),
        notificationService.unreadCount(),
      ]);

      const list = Array.isArray(listRes?.data) ? listRes.data : [];

      // Catat seluruh ID notifikasi dari REST agar tidak terjadi duplikasi.
      // REST polling TIDAK PERNAH memunculkan popup toast.
      list.forEach((n) => markAsSeen(n.id));

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
    fetchNotifications();
    const interval = setInterval(fetchNotifications, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [userId, fetchNotifications]);

  // Subscribe real-time HANYA via Echo Reverb WebSocket untuk memunculkan popup Toast.
  useEffect(() => {
    if (!userId) return;
    const echo = getEcho();
    if (!echo) return;

    // Cegah double-subscribe (React Strict Mode / hot-reload)
    if (echoSubscribedRef.current) return;
    echoSubscribedRef.current = true;

    const channelName = `notifications.${userId}`;
    const channel = echo.private(channelName);

    const handleNewNotification = (rawPayload: any) => {
      const payload: AppNotification = rawPayload?.notification ?? rawPayload;
      if (!payload || !payload.id) return;
      const strId = String(payload.id);

      setItems((prev) =>
        prev.some((n) => String(n.id) === strId) ? prev : [payload, ...prev],
      );

      // HANYA Munculkan 1 toast per notifikasi real-time dari Reverb.
      // Cek & tandai secara atomik untuk mencegah race condition.
      if (isAlreadySeen(strId)) return;
      markAsSeen(strId);

      setUnreadCount((c) => c + 1);
      showNotificationToast(payload);
    };

    try {
      (channel as any).unbind?.(".notification.new");
      (channel as any).unbind?.("notification.new");
    } catch {
      // Safe fallback
    }

    channel.listen(".notification.new", handleNewNotification);

    return () => {
      echoSubscribedRef.current = false;
      try {
        channel.stopListening(".notification.new", handleNewNotification);
        echo.leave(channelName);
      } catch {
        // Safe fallback
      }
    };
  }, [userId]);

  const markAsRead = useCallback(
    async (id: AppNotification["id"]) => {
      const target = itemsRef.current.find((n) => String(n.id) === String(id));
      if (!target || target.is_read) return;

      const nowIso = new Date().toISOString();
      setItems((prev) =>
        prev.map((n) =>
          String(n.id) === String(id) ? { ...n, is_read: true, read_at: nowIso } : n,
        ),
      );
      setUnreadCount((c) => Math.max(0, c - 1));

      try {
        await notificationService.markRead(String(id));
      } catch {
        fetchNotifications();
      }
    },
    [fetchNotifications],
  );

  const removeNotification = useCallback(
    async (id: AppNotification["id"]) => {
      const target = itemsRef.current.find((n) => String(n.id) === String(id));
      if (!target) return;

      setItems((prev) => prev.filter((n) => String(n.id) !== String(id)));
      if (!target.is_read) setUnreadCount((c) => Math.max(0, c - 1));

      try {
        await notificationService.remove(String(id));
      } catch {
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
