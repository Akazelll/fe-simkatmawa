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
