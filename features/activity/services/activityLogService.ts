import { api } from "@/lib/api";

export type ActivityLogQueryParams = {
  page?: number;
  per_page?: number;
  search?: string;
  action?: string;
  module?: string;
  causer_id?: string | number;
  causer_type?: string;
  start_date?: string;
  end_date?: string;
};

const mapQueryParams = (params?: ActivityLogQueryParams) => {
  if (!params) return {};

  const mapped: Record<string, any> = { ...params };

  if (mapped.action !== undefined) {
    mapped.event = mapped.action;
    delete mapped.action;
  }

  if (mapped.module !== undefined) {
    mapped.modul = mapped.module;
    delete mapped.module;
  }

  Object.keys(mapped).forEach((key) => {
    if (
      mapped[key] === "" ||
      mapped[key] === undefined ||
      mapped[key] === null
    ) {
      delete mapped[key];
    }
  });

  return mapped;
};

export const activityLogService = {
  getMyActivityLog: async (params?: ActivityLogQueryParams) => {
    const response = await api.get("/mahasiswa/activity-log", {
      params: mapQueryParams(params),
    });
    return response.data;
  },

  getMyActivityLogDetail: async (id: string | number) => {
    const response = await api.get(`/mahasiswa/activity-log/${id}`);
    return response.data;
  },

  // === ENDPOINT ADMIN / SUPERADMIN ===
  getAdminActivityLog: async (params?: ActivityLogQueryParams) => {
    const response = await api.get("/admin/activity-log", {
      params: mapQueryParams(params),
    });
    return response.data;
  },

  getAdminActivityLogDetail: async (id: string | number) => {
    const response = await api.get(`/admin/activity-log/${id}`);
    return response.data;
  },
};

/**
 * Mengambil SELURUH activity log dengan menelusuri setiap halaman paginasi.
 *
 * Backend (be-simkatmawa) tidak menyediakan endpoint export maupun filter
 * tanggal — index hanya menerima `per_page` & `search` lalu mengembalikan
 * data terpaginasi. Untuk keperluan export kita kumpulkan semua halaman di
 * sisi klien, baru difilter berdasarkan rentang tanggal secara lokal.
 */
export const fetchAllActivityLogs = async ({
  isAdmin,
  perPage = 100,
  search,
  maxPages = 50,
}: {
  isAdmin: boolean;
  perPage?: number;
  search?: string;
  maxPages?: number;
}): Promise<any[]> => {
  const fetchPage = isAdmin
    ? activityLogService.getAdminActivityLog
    : activityLogService.getMyActivityLog;

  const collected: any[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const response = await fetchPage({ page, per_page: perPage, search });

    const items = Array.isArray(response?.data) ? response.data : [];
    collected.push(...items);

    // Berhenti jika halaman terakhir tidak penuh — termination yang aman
    // walau `meta` tidak ada pada response.
    if (items.length < perPage) break;

    lastPage = Number(response?.meta?.last_page) || page;
    page += 1;
  } while (page <= lastPage && page <= maxPages);

  return collected;
};
