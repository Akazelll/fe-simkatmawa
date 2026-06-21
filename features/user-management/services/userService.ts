import { api } from "@/lib/api";
import { PaginatedResponse } from "@/features/shared/types/pagination";

export const userService = {
  getUsers: async (params: {
    page?: number;
    search?: string;
    role?: string;
  }): Promise<PaginatedResponse<any> & { stats?: any }> => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.search) query.append("search", params.search);
    if (params.role && params.role !== "all") query.append("role", params.role);

    const response = await api.get(`/superadmin/users?${query.toString()}`);

    const payload = response.data.data?.data
      ? response.data.data
      : response.data;

    return {
      data: payload.data || [],
      meta: payload.meta || null,
      stats: response.data.data?.stats || response.data.stats || null,
    };
  },

  createUser: async (payload: any) => {
    const response = await api.post("/superadmin/users", payload);
    return response.data;
  },

  updateUser: async (id: string | number, payload: any) => {
    const response = await api.put(`/superadmin/users/${id}`, payload);
    return response.data;
  },

  deleteUser: async (id: string | number) => {
    const response = await api.delete(`/superadmin/users/${id}`);
    return response.data;
  },
};
