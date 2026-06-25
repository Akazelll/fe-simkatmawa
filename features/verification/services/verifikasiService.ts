import { api } from "@/lib/api";

export type VerifikasiPayload = {
  status: "APPROVE" | "REJECT";
  alasan_penolakan?: string;
};

export const verifikasiService = {
  getList: async (
    tipeKegiatan: "prestasi" | "sertifikasi" | "rekognisi",
    params?: any,
  ) => {
    const response = await api.get(`/admin/pengajuan/${tipeKegiatan}`, {
      params,
    });
    return response.data;
  },

  getDetail: async (
    tipeKegiatan: "prestasi" | "sertifikasi" | "rekognisi",
    id: string | number,
  ) => {
    const response = await api.get(`/admin/pengajuan/${tipeKegiatan}/${id}`);
    return response.data;
  },

  // Riwayat pengajuan yang sudah diproses (endpoint khusus history BE).
  // Tanpa param `status`, BE default menampilkan semua status kecuali PENDING
  // — termasuk SYNC_SUCCESS, sehingga data tidak hilang setelah sinkronisasi.
  getHistory: async (
    tipeKegiatan: "prestasi" | "sertifikasi" | "rekognisi",
    params?: any,
  ) => {
    const response = await api.get(`/admin/history/${tipeKegiatan}`, {
      params,
    });
    return response.data;
  },

  verify: async (
    tipeKegiatan: "prestasi" | "sertifikasi" | "rekognisi",
    id: string | number,
    payload: VerifikasiPayload,
  ) => {
    const response = await api.post(
      `/admin/verifikasi/${tipeKegiatan}/${id}`,
      payload,
    );
    return response.data;
  },
};
