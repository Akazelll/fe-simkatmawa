import { api } from "@/lib/api";

export type MahasiswaSearchResult = {
  id: string;
  nim: string;
  nama: string;
  label?: string;
  program_studi?: string | null;
};

export const mahasiswaService = {
  async searchMahasiswa(query: string): Promise<MahasiswaSearchResult[]> {
    const keyword = query.trim();

    if (keyword.length < 2) {
      return [];
    }

    const response = await api.get("/referensi/mahasiswa", {
      params: {
        q: keyword,
        limit: 10,
      },
    });

    const data = response.data?.data;

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => ({
      id: String(item.id ?? item.nim),
      nim: String(item.nim ?? ""),
      nama: String(item.nama ?? ""),
      label: item.label ?? `${item.nama ?? ""} - ${item.nim ?? ""}`,
      program_studi: item.program_studi ?? null,
    }));
  },
};
