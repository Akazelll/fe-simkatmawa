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
