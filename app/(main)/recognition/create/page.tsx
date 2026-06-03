"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { RecognitionDetailSection } from "@/features/recognition/components/RecognitionDetailSection";
import { MahasiswaListSection } from "@/features/shared/components/form/MahasiswaListSection";
import { DosenListSection } from "@/features/shared/components/form/DosenListSection";
import { FormWelcomeBanner } from "@/features/shared/components/form/FormWelcomeBanner";
import { FormFooter } from "@/features/shared/components/form/FormFooter";
import { FormPageHeader } from "@/features/shared/components/form/FormPageHeader";
import {
  useFieldList,
  MAHASISWA_INITIAL,
  DOSEN_INITIAL,
} from "@/features/shared/hooks/useFieldList";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

import { rekognisiService } from "@/features/recognition/services/rekognisiService";
import { mapToRekognisiPayload } from "@/features/recognition/utils/rekognisiMapper";

export default function CreateRecognitionPage() {
  const router = useRouter();
  const mahasiswa = useFieldList(MAHASISWA_INITIAL);
  const dosen = useFieldList(DOSEN_INITIAL);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const formData = new FormData(e.currentTarget);
      const rawData = Object.fromEntries(formData.entries());
      const payload = mapToRekognisiPayload(
        rawData,
        mahasiswa.items,
        dosen.items,
      );

      const response = await rekognisiService.createRekognisi(payload);
      if (response.success) {
        router.push("/recognition");
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrorMsg(
          "Terdapat kesalahan pada input form. Silakan periksa kembali.",
        );
      } else {
        setErrorMsg(
          error.response?.data?.message ||
            "Gagal menyimpan pengajuan rekognisi.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RoleGuard allowedRoles={["mahasiswa"]}>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-5xl mx-auto'
      >
        <FormPageHeader
          title='Rekognisi'
          description='Pengajuan data kegiatan rekognisi / non-lomba.'
        />
        <FormWelcomeBanner
          badge='Tambah Rekognisi'
          title='Form rekognisi terpadu'
          description='Data mahasiswa dan dosen langsung diisi dalam form ini.'
        />

        {errorMsg && (
          <div className='flex items-center gap-2 p-4 text-sm font-medium text-red-700 bg-red-50 rounded-xl'>
            <AlertCircle className='w-5 h-5 shrink-0' />
            <p>{errorMsg}</p>
          </div>
        )}

        <RecognitionDetailSection />
        <MahasiswaListSection
          items={mahasiswa.items}
          add={mahasiswa.add}
          remove={mahasiswa.remove}
          update={mahasiswa.update}
        />
        <DosenListSection
          items={dosen.items}
          add={dosen.add}
          remove={dosen.remove}
          update={dosen.update}
        />

        <FormFooter backHref='/recognition' />
      </form>
    </RoleGuard>
  );
}
