import { api } from "@/lib/api";
import type {
  SyncQueueListParams,
  ToggleAction,
} from "@/features/queue/types";

// Buang parameter kosong agar tidak ikut terkirim sebagai query string.
const cleanParams = (params?: SyncQueueListParams) => {
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

export const syncQueueService = {
  // ── Admin & Superadmin ────────────────────────────────────────────────────
  getStats: async () => {
    const response = await api.get("/admin/sync-queue/stats");
    return response.data;
  },

  getList: async (params?: SyncQueueListParams) => {
    const response = await api.get("/admin/sync-queue", {
      params: cleanParams(params),
    });
    return response.data;
  },

  retry: async (id: number | string) => {
    const response = await api.post(`/admin/sync-queue/${id}/retry`);
    return response.data;
  },

  retryAll: async () => {
    const response = await api.post("/admin/sync-queue/retry-all");
    return response.data;
  },

  // ── Superadmin saja ───────────────────────────────────────────────────────
  toggle: async (action: ToggleAction) => {
    const response = await api.post("/superadmin/sync-queue/toggle", { action });
    return response.data;
  },

  getDetail: async (id: number | string) => {
    const response = await api.get(`/superadmin/sync-queue/${id}`);
    return response.data;
  },
};
