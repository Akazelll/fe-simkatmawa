import { api } from "@/lib/api";
import type { AlasanPenolakanReferensi } from "@/features/settings/types";

export type MahasiswaLookupItem = {
  id: string;
  nim: string;
  nama: string;
  label?: string;
};

export const referensiService = {
  async searchMahasiswa(query: string): Promise<MahasiswaLookupItem[]> {
    const response = await api.get("/referensi/mahasiswa", {
      params: {
        q: query,
        limit: 10,
      },
    });

    return response.data?.data ?? [];
  },

  async getAlasanPenolakan(): Promise<AlasanPenolakanReferensi[]> {
    const response = await api.get("/referensi/alasan-penolakan");
    return response.data?.data ?? [];
  },
};

