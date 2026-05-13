import { TrashedItem } from "../types";

export const TYPES = ["Semua Tipe", "Prestasi", "Sertifikasi", "Rekognisi"];
export const STATUSES = [
  "Semua Status",
  "PENDING",
  "REJECTED",
  "APPROVED_UNSYNCED",
  "SYNC_FAILED",
];
export const PAGE_SIZE = 10;

export const MOCK_TRASHED_DATA: TrashedItem[] = [
  {
    id: "SUB-091",
    name: "Juara 1 Lomba Web Design",
    type: "Prestasi",
    status: "PENDING",
    deletedAt: new Date(Date.now() - 86400000).toISOString(),
    deletedBy: "Adam Raga (Superadmin)",
  },
  {
    id: "SUB-092",
    name: "Sertifikasi AWS",
    type: "Sertifikasi",
    status: "REJECTED",
    deletedAt: new Date(Date.now() - 172800000).toISOString(),
    deletedBy: "System (Auto-clean)",
  },
];
