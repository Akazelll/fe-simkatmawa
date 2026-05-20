import { Prestasi } from "../types";

export const PAGE_SIZE = 8;

export const YEARS = ["Semua Tahun", "2026", "2025", "2024", "2023"];

export const KATEGORI = [
  "Semua Kategori",
  "Nasional",
  "Regional",
  "Internasional",
  "Lokal",
];

export const KATEGORI_OPTIONS = [
  "Riset dan Inovasi : STEM",
  "Riset dan Inovasi : SSH",
  "Seni dan Budaya",
  "Olahraga",
  "Minat Khusus",
];

export const PERINGKAT_OPTIONS = [
  "Juara I",
  "Juara II",
  "Juara III",
  "Harapan I",
  "Harapan II",
  "Harapan III",
  "Apresiasi Kejuaraan/Penghargaan Tambahan/Juara Umum",
  "Peserta",
];

export const BENTUK_OPTIONS = ["Daring", "Luring", "Hybrid"];

export const LEVEL_OPTIONS = [
  "Kabupaten/Kota",
  "Provinsi",
  "Nasional",
  "Internasional",
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

export const ALL_DATA: Prestasi[] = [
  {
    id: "554930",
    name: "Lomba Ilustrasi – WAINI Vol.6 International Student Animation Festival",
    level: "Internasional",
    kategori: "Seni dan Budaya",
    cabang: "Ilustrasi Digital / Illustration Competition",
    peringkat: "Juara II",
    penyelenggara: "Himpunan Mahasiswa Animasi – ISI Yogyakarta",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-12-18"),
  },
  {
    id: "554910",
    name: "Data Science Competition – GELAR RASA 2025",
    level: "Nasional",
    kategori: "Riset dan Inovasi : STEM",
    cabang: "Data Science / Data Analytics Competition",
    peringkat: "Harapan I",
    penyelenggara: "Universitas Indonesia",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-11-12"),
  },
  {
    id: "554902",
    name: "Industrial Chemical Engineering National Competition (ICEN-C) 2025",
    level: "Nasional",
    kategori: "Riset dan Inovasi : STEM",
    cabang: "Scientific Essay / Chemical Engineering Innovation",
    peringkat: "Apresiasi Kejuaraan/Penghargaan Tambahan/Juara Umum",
    penyelenggara: "ITB",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-10-05"),
  },
  {
    id: "554043",
    name: "Malang Student Championship 2025",
    level: "Nasional",
    kategori: "Olahraga",
    cabang: "Pencak Silat",
    peringkat: "Juara I",
    penyelenggara: "KONI Malang",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-09-20"),
  },
  {
    id: "554036",
    name: "Malang Student Championship 2025",
    level: "Nasional",
    kategori: "Olahraga",
    cabang: "Pencak Silat",
    peringkat: "Juara I",
    penyelenggara: "KONI Malang",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-09-20"),
  },
  {
    id: "554031",
    name: "Malang Student Championship 2025",
    level: "Nasional",
    kategori: "Olahraga",
    cabang: "Pencak Silat",
    peringkat: "Juara III",
    penyelenggara: "KONI Malang",
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-09-20"),
  },
  {
    id: "553987",
    name: "Hackathon Cyber Security 2025",
    level: "Nasional",
    kategori: "Riset dan Inovasi : STEM",
    cabang: "Cyber Security Challenge",
    peringkat: "Juara II",
    penyelenggara: "Kominfo",
    tahun: 2025,
    pt: UDINUS,
    status: "Pending",
    tanggal: new Date("2025-08-15"),
  },
  {
    id: "553944",
    name: "Indonesia UI/UX Design Festival 2025",
    level: "Nasional",
    kategori: "Minat Khusus",
    cabang: "UI/UX Design Competition",
    peringkat: "Harapan II",
    penyelenggara: "Dicoding Indonesia",
    tahun: 2025,
    pt: UDINUS,
    status: "Pending",
    tanggal: new Date("2025-07-30"),
  },
];
