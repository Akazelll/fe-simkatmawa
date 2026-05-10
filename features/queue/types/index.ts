export type JobStatus = "pending" | "processing" | "failed" | "completed";

export interface QueueJob {
  id: string;
  submission: string;
  status: JobStatus;
  attempts: number;
  createdAt: Date;
}
