import { api } from "@/lib/api";

export type ActivityLogQueryParams = {
  page?: number;
  per_page?: number;
  search?: string;
  action?: string;
  module?: string;
};

export const activityLogService = {
  getMyActivityLog: async (params?: ActivityLogQueryParams) => {
    const response = await api.get("/mahasiswa/activity-log", { params });
    return response.data;
  },

  getMyActivityLogDetail: async (id: string | number) => {
    const response = await api.get(`/mahasiswa/activity-log/${id}`);
    return response.data;
  },
};
