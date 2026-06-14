import { api } from "@/lib/api";
import { TrashedItem, SubmissionType } from "../types";

export const recycleBinApi = {
  getTrashedItems: async (): Promise<TrashedItem[]> => {
    const endpoints = [
      { key: "prestasi", label: "Prestasi" },
      { key: "sertifikasi", label: "Sertifikasi" },
      { key: "rekognisi", label: "Rekognisi" },
      { key: "user", label: "Akun Pengguna" },
    ];

    // Gunakan map untuk mengembalikan array promise, lalu await semuanya
    const results = await Promise.all(
      endpoints.map(async ({ key, label }) => {
        try {
          const response = await api.get(`/superadmin/trash/${key}?limit=200`);

          // CEK LOG INI DI BROWSER -> INSPECT -> CONSOLE
          console.log(`[Trash API - ${key}] Response:`, response.data);

          if (response.data?.success && Array.isArray(response.data?.data)) {
            return response.data.data.map((item: any) => ({
              id: item.id,
              name: item.nama_kegiatan || item.name || "Tanpa Nama",
              type: label as SubmissionType,
              status: item.status_terakhir || item.role || "-",
              deletedAt: item.deleted_at || new Date().toISOString(),
              deletedBy: item.dihapus_oleh || "-",
              originalType: key,
              owner: item.pemilik || item.email || "",
            }));
          }
          return [];
        } catch (error) {
          console.error(`[Trash API] Gagal mengambil data ${key}:`, error);
          return [];
        }
      }),
    );

    // Gabungkan array dari ke-4 request tadi menjadi 1 array tunggal
    const flatResults = results.flat();

    // Urutkan berdasarkan tanggal terhapus
    return flatResults.sort(
      (a, b) =>
        new Date(b.deletedAt).getTime() - new Date(a.deletedAt).getTime(),
    );
  },

  restoreItem: async (type: string, id: string | number): Promise<void> => {
    const response = await api.put(`/superadmin/trash/${type}/${id}/restore`);
    return response.data;
  },
};
