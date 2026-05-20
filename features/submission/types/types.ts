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
