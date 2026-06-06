import { UserRole } from "@/features/auth/types"; 

export type SubmissionStatus =
  | "PENDING"
  | "REJECTED"
  | "APPROVED_UNSYNCED"
  | "SYNC_FAILED"
  | "SYNC_SUCCESS";

export type SubmissionType = "prestasi" | "sertifikat" | "rekognisi";

export interface Submission {
  id: string;
  type: SubmissionType;
  title: string;
  studentName: string;
  studentNim: string;
  status: SubmissionStatus;
  submittedAt: string;
  createdBy: string;

  approvedBy?: string | null;
  approvedAt?: string | null;

  rejectedBy?: string | null;
  rejectedAt?: string | null;
  rejectionReason?: string | null;

  processedBy?: string | null;
  processedAt?: string | null;

  kemdikbudId?: string | null;
  deletedAt?: string | null;
}

export interface SubmissionActivityLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: "submission.approved" | "submission.rejected";
  subjectType: SubmissionType;
  subjectId: string;
  subjectTitle: string;
  description: string;
  createdAt: string;
}

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
