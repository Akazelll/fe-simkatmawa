import { api } from "@/lib/api";
import { PAGE_SIZE } from "@/features/shared/constants/pagination";
import { TrashedItem, SubmissionType, TrashedListResult } from "../types";

const TYPE_LABELS: Record<string, SubmissionType> = {
  prestasi: "Prestasi",
  sertifikasi: "Sertifikasi",
  rekognisi: "Rekognisi",
  user: "Akun Pengguna",
};

// Normalisasi 1 item trash dari backend (format kegiatan & user disamakan).
const mapTrashedItem = (item: any, type: string): TrashedItem => ({
  id: item.id,
  name: item.nama_kegiatan || item.name || "Tanpa Nama",
  type: TYPE_LABELS[type] ?? "Prestasi",
  status: item.status_terakhir || item.role || "-",
  deletedAt: item.deleted_at || "",
  deletedBy: item.dihapus_oleh || "-",
  originalType: type,
  owner: item.pemilik || item.email || "",
});

export interface GetTrashedParams {
  type: string;
  page?: number;
  search?: string;
  status?: string;
}

export const recycleBinApi = {
  // Server-side pagination per tipe — endpoint membaca page, limit, search, status.
  getTrashedItems: async ({
    type,
    page = 1,
    search,
    status,
  }: GetTrashedParams): Promise<TrashedListResult> => {
    const params: Record<string, string | number> = { page, limit: PAGE_SIZE };
    if (search) params.search = search;
    if (status) params.status = status;

    const response = await api.get(`/superadmin/trash/${type}`, { params });
    const body = response.data;

    const items: TrashedItem[] = Array.isArray(body?.data)
      ? body.data.map((item: any) => mapTrashedItem(item, type))
      : [];

    // `stats.total_trash_{type}` = total terhapus (tanpa filter) untuk kartu statistik.
    const totalTrash =
      body?.stats?.[`total_trash_${type}`] ?? body?.meta?.total ?? items.length;

    return { items, meta: body?.meta ?? null, totalTrash };
  },

  restoreItem: async (type: string, id: string | number): Promise<void> => {
    const response = await api.put(`/superadmin/trash/${type}/${id}/restore`);
    return response.data;
  },
};
