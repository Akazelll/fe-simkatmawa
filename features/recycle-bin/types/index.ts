export type SubmissionStatus =
  | "PENDING"
  | "REJECTED"
  | "APPROVED_UNSYNCED"
  | "SYNC_FAILED"
  | "SYNC_SUCCESS";

export type SubmissionType = "Prestasi" | "Sertifikasi" | "Rekognisi";

export interface TrashedItem {
  id: string;
  name: string;
  type: SubmissionType;
  status: SubmissionStatus;
  deletedAt: string;
  deletedBy: string;
}

export interface RecycleBinResponse {
  data: TrashedItem[];
  total: number;
}
