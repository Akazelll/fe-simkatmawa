/**
 * Tipe notifikasi mengikuti kontrak backend `be-simkatmawa`
 * (NotificationResource — REST & payload broadcast WebSocket identik).
 */

/** Menentukan warna notifikasi (lihat NotificationDropdown). */
export type NotificationType = "success" | "warning" | "error" | "info";

/** Konteks/asal notifikasi — dipakai untuk memilih ikon. */
export type NotificationCategory =
  | "submission_sent"
  | "submission_approved"
  | "submission_rejected"
  | "revision_resubmitted"
  | "queue_alert"
  | "system_alert"
  | "queue_monitor";

export interface AppNotification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  /** Relative path tujuan navigasi (perlu dinormalisasi ke route FE). */
  action_url: string | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

/** Envelope paginated Laravel untuk `GET /notifications`. */
export interface NotificationListResponse {
  data: AppNotification[];
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

/** Response `GET /notifications/unread-count`. */
export interface UnreadCountResponse {
  unread_count: number;
}

/** Query params `GET /notifications`. */
export interface NotificationListParams {
  unread_only?: boolean;
  limit?: number;
  page?: number;
}
