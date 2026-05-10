export interface VerificationSubmission {
  id: string;
  name: string;
  category: "Prestasi" | "Sertifikasi" | "Rekognisi";
  level: string;
  submittedBy: string;
  date: Date;
  status: string;
}
