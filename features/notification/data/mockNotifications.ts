import { AppNotification } from "../types";

// Tanggal sekarang sebagai patokan biar relatif (sekarang, X menit lalu, dll)
const now = Date.now();
const minus = (minutes: number) =>
  new Date(now - minutes * 60 * 1000).toISOString();

/**
 * Mock data sementara — bakal di-replace pas BE notifikasi udah ready.
 */
export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 1,
    type: "submission_approved",
    title: "Pengajuan disetujui",
    message:
      '"Kejurnas Badminton Mahasiswa 2026" telah disetujui oleh Admin Budi.',
    data: { submission_id: 1, submission_type: "prestasi" },
    read_at: null,
    created_at: minus(5),
  },
  {
    id: 2,
    type: "submission_rejected",
    title: "Pengajuan ditolak",
    message:
      '"AWS Certified Cloud Practitioner" ditolak: Link Drive tidak dapat diakses publik.',
    data: { submission_id: 3, submission_type: "sertifikasi" },
    read_at: null,
    created_at: minus(120),
  },
  {
    id: 3,
    type: "submission_synced",
    title: "Pengajuan tersinkron",
    message:
      '"Malang Student Championship 2025" berhasil terbit di PD-Dikti.',
    data: { submission_id: 5, submission_type: "prestasi" },
    read_at: null,
    created_at: minus(60 * 24 * 3),
  },
  {
    id: 4,
    type: "submission_sync_failed",
    title: "Gagal sinkronisasi",
    message:
      '"ICITDA 2025" gagal disinkron ke PD-Dikti: koneksi ke server bermasalah. Sistem akan mencoba lagi otomatis.',
    data: { submission_id: 7, submission_type: "rekognisi" },
    read_at: minus(60 * 24 * 5),
    created_at: minus(60 * 24 * 5),
  },
  {
    id: 5,
    type: "submission_approved",
    title: "Pengajuan disetujui",
    message:
      '"Skema Sertifikasi Ilmuwan Data Madya" telah disetujui oleh Admin Dewi.',
    data: { submission_id: 4, submission_type: "sertifikasi" },
    read_at: minus(60 * 24 * 7),
    created_at: minus(60 * 24 * 7),
  },
  {
    id: 6,
    type: "submission_synced",
    title: "Pengajuan tersinkron",
    message:
      '"Pembicara ICITDA 2025" berhasil terbit di PD-Dikti.',
    data: { submission_id: 8, submission_type: "rekognisi" },
    read_at: minus(60 * 24 * 14),
    created_at: minus(60 * 24 * 14),
  },
];
