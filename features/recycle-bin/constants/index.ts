import { SubmissionType } from "../types";

// Tiap tipe trash dipaginasi server-side lewat endpoint terpisah:
// GET /superadmin/trash/{key}?page=&limit=&search=&status=
export const TRASH_TYPES: { key: string; label: SubmissionType }[] = [
  { key: "prestasi", label: "Prestasi" },
  { key: "sertifikasi", label: "Sertifikasi" },
  { key: "rekognisi", label: "Rekognisi" },
  { key: "user", label: "Akun Pengguna" },
];

// Filter status_internal — hanya berlaku untuk tipe kegiatan (bukan akun pengguna).
// Nilai harus persis sama dengan enum StatusInternal di backend.
export const STATUSES = [
  "Semua Status",
  "PENDING",
  "REJECTED",
  "APPROVED_UNSYNCED",
  "SYNC_SUCCESS",
  "SYNC_FAILED",
];
