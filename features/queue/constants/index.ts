export type QueueStatus = "pending" | "processing" | "failed" | "completed";

export type QueueSubmissionType = "prestasi" | "sertifikat" | "rekognisi";

export interface QueueJob {
  id: string;
  submission: string;
  status: QueueStatus;
  attempts: number;
  createdAt: Date;
}
