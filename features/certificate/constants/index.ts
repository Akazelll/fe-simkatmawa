import { Certificate } from "../types";

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
const BNSP = "Badan Nasional Sertifikasi Profesi";

export const ALL_DATA: Certificate[] = [
  {
    id: "322962",
    name: "Skema Sertifikasi Ilmuan Data Madya",
    url: "https://drive.google.com/file/d/1RKDsz11NC4erjfZFOE9WUjkK5A94Put0/view?usp=sharing",
    level: "Nasional",
    penyelenggara: BNSP,
    tahun: 2025,
    pt: UDINUS,
    status: "Pending",
    tanggal: new Date("2025-01-28"),
  },
  {
    id: "322961",
    name: "Skema Sertifikasi Ilmuan Data Madya",
    url: "https://drive.google.com/file/d/1lj_QXyYYmEXHhEm7XHqSxptHiW1j0HND/view?usp=sharing",
    level: "Nasional",
    penyelenggara: BNSP,
    tahun: 2025,
    pt: UDINUS,
    status: "Pending",
    tanggal: new Date("2025-01-28"),
  },
  {
    id: "322960",
    name: "Skema Sertifikasi Ilmuan Data Madya",
    url: "https://drive.google.com/file/d/1x9eR06azdq7fp9c9Nex6QvRGbr-a7uWm/view?usp=sharing",
    level: "Nasional",
    penyelenggara: BNSP,
    tahun: 2025,
    pt: UDINUS,
    status: "Pending",
    tanggal: new Date("2025-01-28"),
  },
  {
    id: "322959",
    name: "Skema Sertifikasi Ilmuan Data Madya",
    url: "https://drive.google.com/file/d/1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT/view?usp=sharing",
    level: "Nasional",
    penyelenggara: BNSP,
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-02-14"),
  },
  {
    id: "322910",
    name: "Skema Sertifikasi Junior Web Developer",
    url: "https://drive.google.com/file/d/abc123/view?usp=sharing",
    level: "Nasional",
    penyelenggara: BNSP,
    tahun: 2025,
    pt: UDINUS,
    status: "Sync_Success",
    tanggal: new Date("2025-03-10"),
  },
  {
    id: "322905",
    name: "Sertifikat AWS Cloud Practitioner",
    url: "https://drive.google.com/file/d/aws001/view?usp=sharing",
    level: "Internasional",
    penyelenggara: "Amazon Web Services",
    tahun: 2025,
    pt: UDINUS,
    status: "Approved_Unsynced",
    tanggal: new Date("2025-04-22"),
  },
  {
    id: "322880",
    name: "TOEFL ITP",
    url: "https://drive.google.com/file/d/toefl001/view?usp=sharing",
    level: "Internasional",
    penyelenggara: "ETS Indonesia",
    tahun: 2025,
    pt: UDINUS,
    status: "Pending",
    tanggal: new Date("2025-05-30"),
  },
  {
    id: "322870",
    name: "Sertifikat Microsoft Azure Fundamentals",
    url: "https://drive.google.com/file/d/azure001/view?usp=sharing",
    level: "Internasional",
    penyelenggara: "Microsoft",
    tahun: 2024,
    pt: UDINUS,
    status: "Rejected",
    tanggal: new Date("2024-12-01"),
    rejectionReason:
      "Dokumen sertifikat yang diunggah tidak dapat diakses (link Google Drive tidak dibagikan untuk publik). Mohon ubah pengaturan akses dokumen menjadi 'Siapa saja yang memiliki link' lalu ajukan ulang.",
  },
];
