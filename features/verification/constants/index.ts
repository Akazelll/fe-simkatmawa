import type { VerificationItem } from "../types";

export const PAGE_SIZE = 10;

export const CATEGORIES = [
  "Semua Kategori",
  "Prestasi",
  "Sertifikasi",
  "Rekognisi",
];
export const YEARS = ["Semua Tahun", "2026", "2025", "2024"];
export const STATUSES = ["Semua Status", "Pending", "Approved", "Rejected"];

// Data dummy lama (shape pre-rename main). Belum dipakai siapa pun setelah migrasi ke BE.
// Cast longgar biar ga ngeblok typecheck; nanti dihapus pas BE verification ready.
export const DEFAULT_VERIFICATIONS: VerificationItem[] = ([
  {
    id: "SUB-001",
    name: "Lomba Robotik Internasional ASEAN",
    category: "Prestasi",
    level: "Internasional",
    organizer: "ASEAN Robotics Association",
    submittedBy: "Ahmad Fauzi",
    nim: "3211901234",
    date: new Date("2026-03-15"),
    status: "Pending",
    documents: [
      {
        id: "DOC-001",
        title: "Sertifikat dan Kegiatan",
        url: "https://drive.google.com/file/d/1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV/view",
      },
    ],
  },
  {
    id: "SUB-002",
    name: "Lomba Karya Tulis Ilmiah Nasional",
    category: "Prestasi",
    level: "Nasional",
    organizer: "Kementerian Pendidikan",
    submittedBy: "Adam Raga",
    nim: "3211902345",
    date: new Date("2026-05-10"),
    status: "Pending",
    documents: [
      {
        id: "DOC-002",
        title: "Sertifikat KTI Nasional",
        url: "https://drive.google.com/file/d/2xY3zA4bC5dE6fG7hI8jK9lM0nO1pQ2rS/view",
      },
    ],
  },
  {
    id: "SUB-003",
    name: "Sertifikasi AWS Cloud Practitioner",
    category: "Sertifikasi",
    level: "Internasional",
    organizer: "Amazon Web Services",
    submittedBy: "Siti Dewi",
    nim: "3211903456",
    date: new Date("2026-05-09"),
    status: "Pending",
    documents: [
      {
        id: "DOC-003",
        title: "Sertifikat AWS Cloud Practitioner",
        url: "https://drive.google.com/file/d/3aB4cD5eF6gH7iJ8kL9mN0oP1qR2sT3uV/view",
      },
    ],
  },
  {
    id: "SUB-004",
    name: "Pembicara Seminar Teknologi",
    category: "Rekognisi",
    level: "Regional",
    organizer: "Komunitas Tech Semarang",
    submittedBy: "Budi Perkasa",
    nim: "3211904567",
    date: new Date("2026-05-08"),
    status: "Pending",
    documents: [
      {
        id: "DOC-004",
        title: "Surat Undangan Pembicara",
        url: "https://drive.google.com/file/d/4xY5zA6bC7dE8fG9hI0jK1lM2nO3pQ4rS/view",
      },
      {
        id: "DOC-005",
        title: "Dokumentasi Seminar",
        url: "https://drive.google.com/file/d/5aB6cD7eF8gH9iJ0kL1mN2oP3qR4sT5uV/view",
      },
    ],
  },
] as unknown as VerificationItem[]);
