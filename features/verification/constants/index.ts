import { VerificationSubmission } from "../types";

export const PAGE_SIZE = 10;

export const CATEGORIES = [
  "Semua Kategori",
  "Prestasi",
  "Sertifikasi",
  "Rekognisi",
];
export const YEARS = ["Semua Tahun", "2026", "2025", "2024"];
export const STATUSES = ["Semua Status", "Pending", "Approved", "Rejected"];

export const DEFAULT_VERIFICATIONS: VerificationSubmission[] = [
  {
    id: "SUB-001",
    name: "Lomba Karya Tulis Ilmiah Nasional",
    category: "Prestasi",
    level: "Nasional",
    submittedBy: "Adam Raga",
    date: new Date("2026-05-10"),
    status: "Pending",
  },
  {
    id: "SUB-002",
    name: "Sertifikasi AWS Cloud Practitioner",
    category: "Sertifikasi",
    level: "Internasional",
    submittedBy: "Siti Dewi",
    date: new Date("2026-05-09"),
    status: "Pending",
  },
  {
    id: "SUB-003",
    name: "Pembicara Seminar Teknologi",
    category: "Rekognisi",
    level: "Regional",
    submittedBy: "Budi Perkasa",
    date: new Date("2026-05-08"),
    status: "Pending",
  },
];
