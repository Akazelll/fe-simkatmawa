import { api } from "@/lib/api";

export interface MahasiswaSearchResult {
  nim: string;
  nama: string;
  email?: string;
  program_studi?: string;
  [key: string]: unknown;
}

export const mahasiswaService = {
  /**
   * Cari mahasiswa berdasarkan NIM atau nama.
   * Asumsi endpoint: GET /api/v1/mahasiswa/search?q=...&per_page=10
   * Kalau temen BE pakai path lain, cukup ubah URL di sini.
   */
  searchMahasiswa: async (query: string, perPage = 10) => {
    const response = await api.get("/mahasiswa/search", {
      params: { q: query, per_page: perPage },
    });
    return response.data;
  },
};
