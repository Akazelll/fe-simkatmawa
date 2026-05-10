import { QueueJob } from "../types";

export const PAGE_SIZE = 10;

export const STATUS_OPTIONS = [
  "Semua Status",
  "Pending",
  "Processing",
  "Failed",
];

export const DEFAULT_JOBS: QueueJob[] = [
  {
    id: "JOB-7721",
    submission: "Lomba Karya Tulis Nasional",
    status: "failed",
    attempts: 3,
    createdAt: new Date(),
  },
  {
    id: "JOB-7722",
    submission: "Sertifikasi Cloud Practitioner",
    status: "processing",
    attempts: 1,
    createdAt: new Date(),
  },
  {
    id: "JOB-7723",
    submission: "Pembicara Seminar",
    status: "pending",
    attempts: 0,
    createdAt: new Date(),
  },
];
