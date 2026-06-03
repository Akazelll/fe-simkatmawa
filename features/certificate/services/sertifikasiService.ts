import { api } from "@/lib/api";

export type SertifikasiQueryParams = {
  status?: string;
  level?: string;
  search?: string;
  page?: number;
};

export const sertifikasiService = {
  getSertifikasiList: async (params?: SertifikasiQueryParams) => {
    // Memanggil endpoint backend untuk list sertifikasi
    const response = await api.get("/mahasiswa/sertifikasi", { params });
    return response.data;
  },

  getSertifikasiDetail: async (id: string | number) => {
    const response = await api.get(`/mahasiswa/sertifikasi/${id}`);
    return response.data;
  },

  createSertifikasi: async (payload: any) => {
    // Memanggil endpoint post sertifikasi
    const response = await api.post("/mahasiswa/sertifikasi", payload);
    return response.data;
  },

  updateSertifikasi: async (id: string | number, payload: any) => {
    const response = await api.put(`/mahasiswa/sertifikasi/${id}`, payload);
    return response.data;
  },

  deleteSertifikasi: async (id: string | number) => {
    const response = await api.delete(`/mahasiswa/sertifikasi/${id}`);
    return response.data;
  },
};
