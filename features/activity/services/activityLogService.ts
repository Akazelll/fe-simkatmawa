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
