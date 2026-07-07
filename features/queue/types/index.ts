// Tipe yang dipakai badge tipe pengajuan (SubmissionTypeBadge) — dipertahankan.
export type QueueSubmissionType = "prestasi" | "sertifikat" | "rekognisi";

// ── Status & error sesuai kontrak backend (SyncQueueController) ──────────────

export type SyncQueueStatus =
  | "pending"
  | "processing"
  | "success"
  | "failed"
  | "failed_permanent";

export type SyncQueueErrorCode =
  | "AUTH_ERROR"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "RATE_LIMIT"
  | (string & {}); // toleran terhadap kode lain dari backend

// Nilai parameter `status` yang diterima endpoint index.
export type SyncQueueStatusFilter =
  | "all"
  | "menunggu"
  | "proses"
  | "berhasil"
  | "gagal";

export type ToggleAction = "play" | "pause";

// ── Statistik (4 kartu + state pause) ───────────────────────────────────────

export interface SyncQueueStats {
  pending: number;
  processing: number;
  success: number;
  failed: number;
  is_paused: boolean;
  paused_by: string | null;
  paused_at: string | null;
  pause_reason: string | null;
}

// ── Item tabel (response index) ─────────────────────────────────────────────

export interface SyncQueuePengajuan {
  judul: string;
  kategori: string;
  kategori_label: string;
  record_id?: number | string | null;
}

export interface SyncQueueMahasiswa {
  nama: string;
  count: number;
}

export interface SyncQueueItem {
  id: number;
  pengajuan: SyncQueuePengajuan;
  mahasiswa: SyncQueueMahasiswa | null;
  status: SyncQueueStatus;
  status_label: string;
  attempt_count: number;
  error_code: SyncQueueErrorCode | null;
  error_message: string | null;
  queued_at: string | null;
  started_at: string | null;
  completed_at: string | null;
}

// ── Detail (superadmin show) ────────────────────────────────────────────────

export interface SyncQueueDetail {
  id: number;
  pengajuan: SyncQueuePengajuan;
  status: SyncQueueStatus;
  status_label: string;
  attempt_count: number;
  max_attempts: number;
  error_code: SyncQueueErrorCode | null;
  error_message: string | null;
  error_detail: unknown | null;
  kemdikbud_id: string | number | null;
  queued_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  next_retry_at: string | null;
  syncable: unknown;
}

// ── Parameter query untuk endpoint index ────────────────────────────────────

export interface SyncQueueListParams {
  status?: SyncQueueStatusFilter;
  limit?: number;
  page?: number;
}
