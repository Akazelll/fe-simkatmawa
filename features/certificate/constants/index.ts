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

export const ALL_DATA: Certificate[] = [
  {
    id: "ACH-001",
    name: "Juara 1 Competitive Programming",
    level: "Nasional",
    penyelenggara: "Universitas Indonesia",
    status: "Sync_Success",
    tanggal: new Date("2026-01-15"),
  },
  {
    id: "ACH-002",
    name: "Finalis UI/UX Design Competition",
    level: "Regional",
    penyelenggara: "Dicoding Indonesia",
    status: "Pending",
    tanggal: new Date("2026-02-10"),
  },
  {
    id: "ACH-003",
    name: "Best Innovation Project",
    level: "Internasional",
    penyelenggara: "Google Developer Student Club",
    status: "Approved_Unsynced",
    tanggal: new Date("2026-03-05"),
  },
  {
    id: "ACH-004",
    name: "Juara 2 Hackathon Cyber Security",
    level: "Nasional",
    penyelenggara: "Kominfo",
    status: "Sync_Failed",
    tanggal: new Date("2026-03-22"),
  },
  {
    id: "ACH-005",
    name: "Peserta Web Development Bootcamp",
    level: "Lokal",
    penyelenggara: "Universitas Dian Nuswantoro",
    status: "Rejected",
    tanggal: new Date("2026-04-01"),
  },
  {
    id: "ACH-006",
    name: "Juara 3 Mobile App Competition",
    level: "Nasional",
    penyelenggara: "Telkom Indonesia",
    status: "Sync_Success",
    tanggal: new Date("2026-04-18"),
  },
  {
    id: "ACH-007",
    name: "Top 10 Data Science Challenge",
    level: "Internasional",
    penyelenggara: "Kaggle",
    status: "Pending",
    tanggal: new Date("2026-05-02"),
  },
  {
    id: "ACH-008",
    name: "Best Presenter Seminar Teknologi",
    level: "Regional",
    penyelenggara: "IEEE Student Branch",
    status: "Approved_Unsynced",
    tanggal: new Date("2026-05-09"),
  },
];
