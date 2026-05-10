export interface SubmissionDocument {
  id: string;
  title: string;
  url: string;
}

export interface VerificationSubmission {
  id: string;
  name: string;
  category: "Prestasi" | "Sertifikasi" | "Rekognisi";
  level: string;
  organizer: string;
  submittedBy: string;
  nim: string;
  date: Date;
  status: string;
  documents: SubmissionDocument[];
}
