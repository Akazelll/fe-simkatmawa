import { api } from "@/lib/api";
import type {
  NotificationListParams,
  NotificationListResponse,
  UnreadCountResponse,
} from "@/features/notification/types";

// Buang parameter kosong agar tidak ikut terkirim sebagai query string.
const cleanParams = (params?: NotificationListParams) => {
  if (!params) return {};

  const cleaned: Record<string, unknown> = { ...params };
  Object.keys(cleaned).forEach((key) => {
    const value = cleaned[key];
    if (value === "" || value === undefined || value === null) {
      delete cleaned[key];
    }
  });

  return cleaned;
};

export const notificationService = {
  // GET /notifications — daftar notifikasi (paginated, scoped per user).
  list: async (params?: NotificationListParams): Promise<NotificationListResponse> => {
    const response = await api.get("/notifications", {
      params: cleanParams(params),
    });
    return response.data;
  },

  // GET /notifications/unread-count — jumlah belum dibaca (untuk badge).
  unreadCount: async (): Promise<UnreadCountResponse> => {
    const response = await api.get("/notifications/unread-count");
    return response.data;
  },

  // PATCH /notifications/{id}/read — tandai 1 notifikasi dibaca.
  markRead: async (id: string) => {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  },

  // PATCH /notifications/read-all — tandai semua dibaca.
  markAllRead: async () => {
    const response = await api.patch("/notifications/read-all");
    return response.data;
  },

  // DELETE /notifications/{id} — hapus notifikasi (belum diwire ke UI).
  remove: async (id: string) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};
