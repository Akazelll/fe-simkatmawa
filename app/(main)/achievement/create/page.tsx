"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { AchievementDetailSection } from "@/features/achievement/components/AchievementDetailSection";
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
import { useAuth } from "@/features/auth/hooks/useAuth";

// Import Service & Mapper
import { prestasiService } from "@/features/achievement/services/prestasiService";
import { mapToPrestasiPayload } from "@/features/achievement/utils/prestasiMapper";

export default function CreatePrestasiPage() {
  const router = useRouter();
  const { currentUser } = useAuth();

  const mahasiswa = useFieldList(MAHASISWA_INITIAL);
  const dosen = useFieldList(DOSEN_INITIAL);

  // Prefill row 0 (Ketua) dengan data mahasiswa yang login.
  // Fill NIM dan Nama secara terpisah supaya kalau salah satu kosong di BE,
  // yang ada tetap keisi.
  const prefilledRef = useRef(false);
  useEffect(() => {
    if (prefilledRef.current) return;
    if (currentUser?.role !== "mahasiswa") return;
    const nim = currentUser.identitas ?? "";
    const nama = currentUser.name ?? "";
    if (!nim && !nama) return;
    if (nim) mahasiswa.update(0, "nim", nim);
    if (nama) mahasiswa.update(0, "nama", nama);
    prefilledRef.current = true;
  }, [currentUser, mahasiswa]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    setValidationErrors({});

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const payload = mapToPrestasiPayload(rawData, mahasiswa.items, dosen.items);

    try {
      const response = await prestasiService.createPrestasi(payload);
      if (response.success) {
        router.push("/achievement");
      }
    } catch (error: any) {
      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors);
        setErrorMsg(
          "Terdapat kesalahan pada input form. Silakan periksa kembali.",
        );
      } else {
        setErrorMsg(
          error.response?.data?.message ||
            "Gagal menyimpan pengajuan prestasi.",
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
        className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-5xl w-full mx-auto p-4 md:p-0'
      >
        <FormPageHeader
          title='Prestasi Mandiri'
          description='Lengkapi data prestasi, mahasiswa, dan dosen pendamping dalam satu alur.'
        />

        <FormWelcomeBanner
          badge='Tambah Prestasi'
          title='Form prestasi mandiri terpadu'
          description='Data mahasiswa dan dosen kini diisi langsung di form ini, sehingga tidak perlu berpindah halaman setelah data prestasi tersimpan.'
        />

        {errorMsg && (
          <div className='flex items-center gap-2 p-4 text-sm font-medium text-red-700 bg-red-50 rounded-xl border border-red-200'>
            <AlertCircle className='w-5 h-5 shrink-0' />
            <p>{errorMsg}</p>
          </div>
        )}

        <AchievementDetailSection />

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
          backHref='/achievement'
        />
      </form>
    </RoleGuard>
  );
}
