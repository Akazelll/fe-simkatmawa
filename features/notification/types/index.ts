export type NotificationType =
  | "submission_approved"
  | "submission_rejected"
  | "submission_synced"
  | "submission_sync_failed";

export type SubmissionType = "prestasi" | "sertifikasi" | "rekognisi";

export interface NotificationPayload {
  submission_id: number | string;
  submission_type: SubmissionType;
}

export interface AppNotification {
  id: string | number;
  type: NotificationType;
  title: string;
  message: string;
  data: NotificationPayload;
  read_at: string | null;
  created_at: string;
}
