export type QueueSubmissionType = "prestasi" | "sertifikat" | "rekognisi";

export type ActiveQueueStatus = "waiting" | "processing";

export type SyncHistoryStatus = "success" | "failed";

export interface ActiveQueueJob {
  id: string;
  type: QueueSubmissionType;
  title: string;
  studentName: string;
  queuedAt: string;
  status: ActiveQueueStatus;
}

export interface FailedQueueJob {
  id: string;
  type: QueueSubmissionType;
  title: string;
  failedAt: string;
  reason: string;
  attempts: number;
}

export interface SyncHistoryItem {
  id: string;
  type: QueueSubmissionType;
  title: string;
  kemdikbudId: string | null;
  syncedAt: string | null;
  status: SyncHistoryStatus;
}
