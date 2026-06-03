import { api } from "@/lib/api";

interface GetUsersParams {
  page?: number;
  search?: string;
  role?: string;
}

export const userService = {
  // GET: Mengambil daftar pengguna beserta meta dan statistik
  getUsers: async (params: GetUsersParams) => {
    // Kita bersihkan parameter yang kosong agar URL API tetap rapi
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.search) query.append("search", params.search);
    if (params.role && params.role !== "all") query.append("role", params.role);

    const response = await api.get(`/admin/users?${query.toString()}`);
    return response.data;
  },

  // POST: Menambah pengguna baru (Admin)
  createUser: async (payload: any) => {
    const response = await api.post("/admin/users", payload);
    return response.data;
  },

  // PUT: Mengubah data pengguna
  updateUser: async (id: number | string, payload: any) => {
    const response = await api.put(`/admin/users/${id}`, payload);
    return response.data;
  },

  // DELETE: Menghapus pengguna
  deleteUser: async (id: number | string) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
};
