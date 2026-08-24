import { api } from "@/lib/api";
import { TipeKegiatan, VerifikasiQueryParams } from "../types";

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

  exportExcel: async (
    tipeKegiatan: TipeKegiatan,
    params?: VerifikasiQueryParams,
  ): Promise<void> => {
    const cleanParams: Record<string, string> = {};

    if (params?.status && params.status !== "all") cleanParams.status = params.status;
    if (params?.kategori && params.kategori !== "all") cleanParams.kategori = params.kategori;
    if (params?.jenis_group && params.jenis_group !== "all") cleanParams.jenis_group = params.jenis_group;
    if (params?.level && params.level !== "all") cleanParams.level = params.level;
    if (params?.tahun && params.tahun !== "all") cleanParams.tahun = String(params.tahun);
    if (params?.search?.trim()) cleanParams.search = params.search.trim();
    if (params?.sort_by) cleanParams.sort_by = params.sort_by;
    if (params?.sort_dir) cleanParams.sort_dir = params.sort_dir;

    const response = await api.get(
      `/admin/pengajuan/${tipeKegiatan}/export`,
      {
        params: cleanParams,
        responseType: "blob",
        timeout: 30000,
      },
    );

    const blob = response.data as Blob;
    const blobUrl = window.URL.createObjectURL(blob);

    const contentDisposition = response.headers["content-disposition"];
    let fileName = `Export_${tipeKegiatan}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+?)"?$/);
      if (match?.[1]) fileName = match[1];
    }

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  },
};
