import { PrestasiDetailView } from "@/features/achievement/components/PrestasiDetailView";
import { SertifikatDetailView } from "@/features/certificate/components/SertifikatDetailView";
import { RekognisiDetailView } from "@/features/recognition/components/RekognisiDetailView";

type SubmissionType = "prestasi" | "sertifikasi" | "rekognisi";

interface Props {
  
  detail: any;
  type: SubmissionType;
  audience?: "admin" | "mahasiswa";
}

export function SubmissionDetailBody({ detail, type, audience = "admin" }: Props) {
  if (!detail) return null;

  switch (type) {
    case "prestasi":
      return <PrestasiDetailView data={detail} audience={audience} />;
    case "sertifikasi":
      return <SertifikatDetailView data={detail} audience={audience} />;
    case "rekognisi":
      return <RekognisiDetailView data={detail} audience={audience} />;
    default:
      return null;
  }
}
