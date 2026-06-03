import {
  Submission,
  SubmissionStatus,
} from "../../features/submission/types/types";
import { UserRole } from "@/lib/auth/types";

export const isPendingSubmission = (s: Submission) => s.status === "PENDING";
export const isRejectedSubmission = (s: Submission) => s.status === "REJECTED";
export const isApprovedSubmission = (s: Submission) =>
  s.status === "APPROVED_UNSYNCED";
export const isLockedSubmission = (s: Submission) =>
  s.status === "SYNC_SUCCESS";

export const shouldAppearInVerification = (s: Submission) =>
  s.status === "PENDING";
export const shouldAppearInHistory = (s: Submission) =>
  ["REJECTED", "APPROVED_UNSYNCED", "SYNC_FAILED", "SYNC_SUCCESS"].includes(
    s.status,
  );

export const canSubmissionBeApproved = (
  userRole: UserRole | undefined,
  s: Submission,
) =>
  (userRole === "admin" || userRole === "superadmin") && s.status === "PENDING";

export const canSubmissionBeRejected = (
  userRole: UserRole | undefined,
  s: Submission,
) =>
  (userRole === "admin" || userRole === "superadmin") && s.status === "PENDING";

export const canShowRejectionReason = (s: Submission) =>
  s.status === "REJECTED" && !!s.rejectionReason;

export const getSubmissionProcessedAt = (s: Submission) =>
  s.processedAt || s.approvedAt || s.rejectedAt;
export const getSubmissionProcessedBy = (s: Submission) =>
  s.processedBy || s.approvedBy || s.rejectedBy;
