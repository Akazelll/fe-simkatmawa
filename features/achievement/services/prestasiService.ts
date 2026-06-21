import { api } from "@/lib/api";

// Re-export tipe meta pagination bersama agar import lama tetap berfungsi.
export type { PaginationMeta } from "@/features/shared/types/pagination";

export type PrestasiQueryParams = {
  status?: string;
  level?: string;
  search?: string;
  page?: number;
};

export const prestasiService = {
  getPrestasiList: async (params?: PrestasiQueryParams) => {
    // Memanggil endpoint backend
    const response = await api.get("/mahasiswa/prestasi", { params });
    return response.data;
  },

  // Persiapan untuk tahap selanjutnya
  getPrestasiDetail: async (id: string | number) => {
    const response = await api.get(`/mahasiswa/prestasi/${id}`);
    return response.data;
  },

  createPrestasi: async (payload: any) => {
    const response = await api.post("/mahasiswa/prestasi", payload);
    return response.data;
  },

  updatePrestasi: async (id: string | number, payload: any) => {
    const response = await api.put(`/mahasiswa/prestasi/${id}`, payload);
    return response.data;
  },

  deletePrestasi: async (id: string | number) => {
    const response = await api.delete(`/mahasiswa/prestasi/${id}`);
    return response.data;
  },
};
