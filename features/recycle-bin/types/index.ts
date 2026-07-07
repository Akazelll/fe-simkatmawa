import { PaginationMeta } from "@/features/shared/types/pagination";

export type SubmissionType =
  | "Prestasi"
  | "Sertifikasi"
  | "Rekognisi"
  | "Akun Pengguna";

export interface TrashedItem {
  id: string | number;
  name: string;
  type: SubmissionType;
  status: string;
  deletedAt: string;
  deletedBy: string;
  originalType: string;
  owner?: string;
}

export interface RecycleBinResponse {
  data: TrashedItem[];
  total: number;
}

// Hasil 1 request trash (server-side paginated, per tipe).
export interface TrashedListResult {
  items: TrashedItem[];
  meta: PaginationMeta | null;
  totalTrash: number;
}
