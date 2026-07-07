import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CloudOff,
  FileWarning,
  KeyRound,
  RefreshCw,
  ServerCrash,
  WifiOff,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type {
  SyncQueueErrorCode,
  SyncQueueStatus,
  SyncQueueStatusFilter,
} from "@/features/queue/types";

// ── Filter status: label UI ↔ parameter backend ─────────────────────────────
// FilterSection bekerja dengan label string; map ini menerjemahkannya ke nilai
// `status` yang dimengerti endpoint index (all|menunggu|proses|berhasil|gagal).

export interface StatusFilterOption {
  label: string;
  value: SyncQueueStatusFilter;
}

export const STATUS_FILTER_OPTIONS: StatusFilterOption[] = [
  { label: "Semua Status", value: "all" },
  { label: "Menunggu", value: "menunggu" },
  { label: "Diproses", value: "proses" },
  { label: "Berhasil", value: "berhasil" },
  { label: "Gagal", value: "gagal" },
];

export const STATUS_FILTER_LABELS = STATUS_FILTER_OPTIONS.map((o) => o.label);

export const statusLabelToParam = (label: string): SyncQueueStatusFilter =>
  STATUS_FILTER_OPTIONS.find((o) => o.label === label)?.value ?? "all";

// ── Badge status item ───────────────────────────────────────────────────────

export interface StatusBadgeConfig {
  label: string;
  icon: LucideIcon;
  // Skema warna disamakan dengan StatusBadge bersama: bg-50 / text-600 / border-200.
  className: string;
}

export const STATUS_BADGE_CONFIG: Record<SyncQueueStatus, StatusBadgeConfig> = {
  pending: {
    label: "Menunggu",
    icon: Clock,
    className: "bg-amber-50 text-amber-600 border-amber-200",
  },
  processing: {
    label: "Diproses",
    icon: RefreshCw,
    className: "bg-blue-50 text-blue-600 border-blue-200",
  },
  success: {
    label: "Berhasil",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-600 border-emerald-200",
  },
  failed: {
    label: "Gagal",
    icon: CloudOff,
    className: "bg-red-50 text-red-600 border-red-200",
  },
  failed_permanent: {
    label: "Gagal Permanen",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-300",
  },
};

export const FAILED_STATUSES: SyncQueueStatus[] = ["failed", "failed_permanent"];

export const isFailedStatus = (status: SyncQueueStatus): boolean =>
  FAILED_STATUSES.includes(status);

// ── Kamus kode error (lihat Dokumentasi §3) ─────────────────────────────────

export interface ErrorCodeConfig {
  label: string;
  icon: LucideIcon;
  className: string; // warna teks/icon error di tabel
  hint?: string; // saran tindakan bagi pengguna
}

export const ERROR_CODE_CONFIG: Record<string, ErrorCodeConfig> = {
  AUTH_ERROR: {
    label: "Kredensial Ditolak",
    icon: KeyRound,
    className: "text-red-600",
    hint: "Periksa kredensial Kemdiktisaintek di menu Settings.",
  },
  VALIDATION_ERROR: {
    label: "Data Tidak Valid",
    icon: FileWarning,
    className: "text-red-600",
    hint: "Perbaiki data pengajuan agar sesuai format Kemdiktisaintek.",
  },
  SERVER_ERROR: {
    label: "Server Kemdikti Bermasalah",
    icon: ServerCrash,
    className: "text-amber-600",
    hint: "Server Kemdiktisaintek sedang gangguan. Coba ulang nanti.",
  },
  NETWORK_ERROR: {
    label: "Gangguan Koneksi",
    icon: WifiOff,
    className: "text-amber-600",
    hint: "Koneksi ke Kemdiktisaintek terputus. Coba ulang nanti.",
  },
  RATE_LIMIT: {
    label: "Terlalu Banyak Permintaan",
    icon: Clock,
    className: "text-orange-600",
    hint: "Permintaan dibatasi sementara oleh Kemdiktisaintek.",
  },
};

// Fallback untuk kode error yang tidak terdaftar.
export const DEFAULT_ERROR_CONFIG: ErrorCodeConfig = {
  label: "Kesalahan Sinkronisasi",
  icon: AlertTriangle,
  className: "text-red-600",
};

export const getErrorConfig = (
  code: SyncQueueErrorCode | null | undefined,
): ErrorCodeConfig =>
  (code && ERROR_CODE_CONFIG[code]) || DEFAULT_ERROR_CONFIG;
