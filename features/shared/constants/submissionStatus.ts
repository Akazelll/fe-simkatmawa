import { SubmissionStatus } from "@/lib/auth/types";

interface StatusStyle {
  label: string;
  className: string;
}

export const STATUS_LABEL_MAP: Record<SubmissionStatus, StatusStyle> = {
  PENDING: {
    label: "Submitted",
    className: "bg-orange-50 text-orange-600",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-rose-50 text-rose-600",
  },
  APPROVED_UNSYNCED: {
    label: "Approved",
    className: "bg-sky-50 text-sky-600",
  },
  SYNC_FAILED: {
    label: "Sync Failed",
    className: "bg-red-50 text-red-600",
  },
  SYNC_SUCCESS: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-600",
  },
};

export type LegacyStatus =
  | "Pending"
  | "Rejected"
  | "Approved_Unsynced"
  | "Sync_Failed"
  | "Sync_Success";

const LEGACY_TO_NEW: Record<LegacyStatus, SubmissionStatus> = {
  Pending: "PENDING",
  Rejected: "REJECTED",
  Approved_Unsynced: "APPROVED_UNSYNCED",
  Sync_Failed: "SYNC_FAILED",
  Sync_Success: "SYNC_SUCCESS",
};

export function getStatusStyle(
  status: LegacyStatus | SubmissionStatus,
): StatusStyle {
  const key = status in LEGACY_TO_NEW
    ? LEGACY_TO_NEW[status as LegacyStatus]
    : (status as SubmissionStatus);
  return STATUS_LABEL_MAP[key];
}
