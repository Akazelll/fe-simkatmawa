import { api } from "@/lib/api";

export interface LookupItem {
  id: string;
  nama: string;
  label: string;
  nim?: string;
  nuptk?: string;
}

export const lookupService = {
  searchMahasiswa: async (keyword: string): Promise<LookupItem[]> => {
    if (!keyword) return [];

    const response = await api.get("/referensi/mahasiswa", {
      params: { q: keyword },
    });

    return response.data.data || [];
  },

  searchDosen: async (keyword: string): Promise<LookupItem[]> => {
    if (!keyword) return [];

    const response = await api.get("/referensi/dosen", {
      params: { q: keyword },
    });

    return response.data.data || [];
  },
};
