import { api } from "@/lib/api";

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
};
