// D:\Project\fe-simkatmawa\features\activity\constants\index.ts
import { ActivityLog } from "../types";

export const DEFAULT_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "1",
    timestamp: "19 Mei 2026, 10:00 WIB",
    user: "Adam Raga",
    role: "mahasiswa",
    action: "created",
    module: "Prestasi Mandiri",
    target: "Kejurnas Badminton 2026",
    oldData: {
      level: null,
      kategori: null,
      lomba: null,
      cabang: null,
      penyelenggara: null,
      peringkat: null,
      kelompok_prestasi: null,
      bentuk: null,
      status_internal: null,
      url_sertifikat: null,
    },
    newData: {
      level: "NAS",
      kategori: "OLAHRAGA",
      lomba: "Kejurnas Badminton 2026",
      cabang: "Tunggal Putra",
      penyelenggara: "PBSI",
      peringkat: "JUARA1",
      kelompok_prestasi: "INDIVIDU",
      bentuk: "LURING",
      status_internal: "PENDING",
      url_sertifikat:
        "https://drive.google.com/file/d/1aB2c3D4e5F6g7H8i9J0/view",
    },
  },
  {
    id: "2",
    timestamp: "20 Mei 2026, 09:15 WIB",
    user: "Adam Raga",
    role: "mahasiswa",
    action: "updated",
    module: "Prestasi Mandiri",
    target: "Kejurnas Badminton 2026",
    oldData: {
      cabang: "Tunggal Putra",
      kelompok_prestasi: "INDIVIDU",
      url_sertifikat: "https://drive.google.com/file/d/old123/view",
    },
    newData: {
      cabang: "Ganda Putra",
      kelompok_prestasi: "KELOMPOK",
      url_sertifikat: "https://drive.google.com/file/d/new456/view",
    },
  },
  {
    id: "3",
    timestamp: "21 Mei 2026, 16:00 WIB",
    user: "Adam Raga",
    role: "mahasiswa",
    action: "deleted",
    module: "Sertifikasi",
    target: "Sertifikasi Web Developer",
    oldData: {
      level: "NAS",
      status_internal: "PENDING",
      url_sertifikat: "https://drive.google.com/file/d/new456/view",
    },
    newData: {
      level: null,
      status_internal: null,
      url_sertifikat: null,
    },
  },
];
