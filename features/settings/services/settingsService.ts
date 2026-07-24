import { api } from "@/lib/api";
import type {
  AlasanPenolakanInput,
  AlasanPenolakanQueryParams,
} from "@/features/settings/types";

export const settingsService = {
  getKemdikbud: async () => {
    const response = await api.get("/superadmin/settings/kemdikbud");
    return response.data;
  },

  updateKemdikbud: async (payload: { email: string; password: string }) => {
    const response = await api.put("/superadmin/settings/kemdikbud", payload);
    return response.data;
  },

  getAlasanPenolakanList: async (params?: AlasanPenolakanQueryParams) => {
    const response = await api.get("/superadmin/alasan-penolakan", { params });
    return response.data;
  },

  getAlasanPenolakanDetail: async (id: number) => {
    const response = await api.get(`/superadmin/alasan-penolakan/${id}`);
    return response.data;
  },

  createAlasanPenolakan: async (payload: AlasanPenolakanInput) => {
    const response = await api.post("/superadmin/alasan-penolakan", payload);
    return response.data;
  },

  updateAlasanPenolakan: async (id: number, payload: AlasanPenolakanInput) => {
    const response = await api.put(`/superadmin/alasan-penolakan/${id}`, payload);
    return response.data;
  },

  deleteAlasanPenolakan: async (id: number) => {
    const response = await api.delete(`/superadmin/alasan-penolakan/${id}`);
    return response.data;
  },
};

