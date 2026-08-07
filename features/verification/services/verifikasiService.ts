import { api } from "@/lib/api";
import { TipeKegiatan, VerifikasiQueryParams, PengajuanResponse } from "../types";

export type VerifikasiPayload = {
  status: "APPROVE" | "REJECT";
  alasan_penolakan_id?: number;
  alasan_penolakan?: string;
};

export const verifikasiService = {
  getList: async (
    tipeKegiatan: TipeKegiatan,
    params?: VerifikasiQueryParams,
  ): Promise<PengajuanResponse> => {
    const response = await api.get(`/admin/pengajuan/${tipeKegiatan}`, {
      params,
    });
    return response.data;
  },

  getDetail: async (
    tipeKegiatan: TipeKegiatan,
    id: string | number,
  ) => {
    const response = await api.get(`/admin/pengajuan/${tipeKegiatan}/${id}`);
    return response.data;
  },

  verify: async (
    tipeKegiatan: TipeKegiatan,
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
