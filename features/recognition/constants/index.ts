import { Rekognisi } from "../types";

export const PAGE_SIZE = 8;

export const KATEGORI = [
  "Semua Kategori",
  "Nasional",
  "Regional",
  "Internasional",
  "Lokal",
];

export const STATUSES = [
  "Semua Status",
  "Pending",
  "Rejected",
  "Approved_Unsynced",
  "Sync_Failed",
  "Sync_Success",
];

const UDINUS = "Universitas Dian Nuswantoro";

export const ALL_DATA: Rekognisi[] = [
  {
    id: "118203",
    name: "Klasifikasi Otomatis Korosi Menggunakan Convolutional Neural Network dan Transfer Learning dengan Model MobileNetV2",
    jenis: "Publikasi artikel ilmiah",
    level: "Nasional",
    penyelenggara: "JURNAL ALGORITMA",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-05-23"),
  },
  {
    id: "118198",
    name: "Sistem Rekomendasi Berbasis Collaborative Filtering pada Marketplace UMKM",
    jenis: "Publikasi artikel ilmiah",
    level: "Nasional",
    penyelenggara: "Jurnal Sisfokom",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-06-10"),
  },
  {
    id: "118187",
    name: "Pembicara Konferensi Internasional ICITDA 2025",
    jenis: "Pembicara seminar/konferensi",
    level: "Internasional",
    penyelenggara: "ICITDA Committee",
    tahun: 2025,
    pt: UDINUS,
    status: "Approved_Unsynced",
    tanggal: new Date("2025-07-04"),
  },
  {
    id: "118176",
    name: "HKI Sistem Monitoring Tanaman Hidroponik Berbasis IoT",
    jenis: "HKI / Paten",
    level: "Nasional",
    penyelenggara: "DJKI Kemenkumham",
    tahun: 2025,
    pt: UDINUS,
    status: "Pending",
    tanggal: new Date("2025-08-19"),
  },
  {
    id: "118162",
    name: "Karya Seni Instalasi Digital – Pameran ARTJOG 2025",
    jenis: "Karya seni",
    level: "Nasional",
    penyelenggara: "ARTJOG",
    tahun: 2025,
    pt: UDINUS,
    status: "Rejected",
    tanggal: new Date("2025-09-02"),
    rejectionReason:
      "Bukti rekognisi belum dilengkapi surat keterangan resmi dari penyelenggara pameran. Lengkapi dokumen pendukung lalu ajukan kembali rekognisi ini.",
  },
  {
    id: "118154",
    name: "Asisten Peneliti Lab AI Universitas Indonesia",
    jenis: "Asisten peneliti",
    level: "Nasional",
    penyelenggara: "Universitas Indonesia",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-04-15"),
  },
];
