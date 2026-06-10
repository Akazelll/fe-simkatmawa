import {
  ActiveQueueJob,
  FailedQueueJob,
  SyncHistoryItem,
} from "@/features/queue/types";

export const dummyActiveQueueJobs: ActiveQueueJob[] = [
  {
    id: "job-001",
    type: "prestasi",
    title: "Kejurnas Badminton LPTK XXI",
    studentName: "Ridlo Fanata Wicaksana",
    queuedAt: "2026-05-19T14:30:00Z",
    status: "waiting",
  },
  {
    id: "job-002",
    type: "sertifikat",
    title: "AWS Certified Cloud Practitioner",
    studentName: "Adam Raga",
    queuedAt: "2026-05-19T14:35:00Z",
    status: "processing",
  },
  {
    id: "job-003",
    type: "rekognisi",
    title: "Juri Hackathon Nasional Pemuda",
    studentName: "Syakira Fara Salsabila",
    queuedAt: "2026-05-19T14:40:00Z",
    status: "waiting",
  },
];

export const dummyFailedQueueJobs: FailedQueueJob[] = [
  {
    id: "failed-001",
    type: "prestasi",
    title: "Medali Emas Pencak Silat POMNAS",
    failedAt: "2026-05-19T15:45:00Z",
    reason: "Timeout 30 detik dari API gateway Kemdikbud",
    attempts: 3,
  },
  {
    id: "failed-002",
    type: "sertifikat",
    title: "Oracle Certified Professional Java SE",
    failedAt: "2026-05-18T20:00:00Z",
    reason: "Internal Server Error (500) pada endpoint sinkronisasi",
    attempts: 3,
  },
];

export const dummySyncHistoryItems: SyncHistoryItem[] = [
  {
    id: "sync-001",
    type: "prestasi",
    title: "Juara 1 Pagelaran Mahasiswa Nasional",
    kemdikbudId: "518023",
    syncedAt: "2026-05-19T15:00:00Z",
    status: "success",
  },
  {
    id: "sync-002",
    type: "sertifikat",
    title: "Google Associate Cloud Engineer",
    kemdikbudId: null,
    syncedAt: null,
    status: "failed",
  },
];
