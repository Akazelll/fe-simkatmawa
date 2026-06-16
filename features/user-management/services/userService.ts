import { api } from "@/lib/api";

interface GetUsersParams {
  page?: number;
  search?: string;
  role?: string;
}

export const userService = {
  getUsers: async (params: GetUsersParams) => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.search) query.append("search", params.search);
    if (params.role && params.role !== "all") query.append("role", params.role);

    const response = await api.get(`/superadmin/users?${query.toString()}`);
    return response.data;
  },

  createUser: async (payload: any) => {
    const response = await api.post("/superadmin/users", payload);
    return response.data;
  },

  updateUser: async (id: number | string, payload: any) => {
    const response = await api.put(`/superadmin/users/${id}`, payload);
    return response.data;
  },

  deleteUser: async (id: number | string) => {
    const response = await api.delete(`/superadmin/users/${id}`);
    return response.data;
  },
};
