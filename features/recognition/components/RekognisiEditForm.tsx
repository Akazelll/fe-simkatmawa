"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { RecognitionDetailSection } from "@/features/recognition/components/RecognitionDetailSection";
import { MahasiswaListSection } from "@/features/shared/components/form/MahasiswaListSection";
import { DosenListSection } from "@/features/shared/components/form/DosenListSection";
import { FormFooter } from "@/features/shared/components/form/FormFooter";
import { FormPageHeader } from "@/features/shared/components/form/FormPageHeader";
import {
  useFieldList,
  MAHASISWA_INITIAL,
  DOSEN_INITIAL,
} from "@/features/shared/hooks/useFieldList";
import { rekognisiService } from "@/features/recognition/services/rekognisiService";
import { mapToRekognisiPayload } from "@/features/recognition/utils/rekognisiMapper";
import { Rekognisi } from "@/features/recognition/types";

export function RekognisiEditForm({ detail }: { detail: Rekognisi }) {
  const router = useRouter();

  const mahasiswa = useFieldList(
    MAHASISWA_INITIAL,
    detail.mahasiswa?.map((m) => ({ nim: m.nim, nama: m.nama })),
  );
  const dosen = useFieldList(
    DOSEN_INITIAL,
    detail.dosen?.map((d) => ({
      nuptk: d.nuptk,
      nama: d.nama,
      url_surat_tugas: d.url_surat_tugas,
    })),
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const payload = mapToRekognisiPayload(rawData, mahasiswa.items, dosen.items);

    try {
      const response = await rekognisiService.updateRekognisi(
        detail.id,
        payload,
      );
      if (response.success) {
        router.push(`/recognition/${detail.id}`);
      } else {
        setErrorMsg(response.message || "Gagal memperbarui pengajuan.");
      }
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message ||
          "Gagal memperbarui pengajuan rekognisi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-5xl w-full mx-auto p-4 md:p-0'
    >

      {errorMsg && (
        <div className='flex items-center gap-2 p-4 text-sm font-medium text-red-700 bg-red-50 rounded-xl border border-red-200'>
          <AlertCircle className='w-5 h-5 shrink-0' />
          <p>{errorMsg}</p>
        </div>
      )}

      <RecognitionDetailSection defaultData={detail} />

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

      <FormFooter
        backHref={`/recognition/${detail.id}`}
        submitLabel={isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
      />
    </form>
  );
}
