"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AchievementDetailSection } from "@/features/achievement/components/AchievementDetailSection";
import { FormErrorSummary } from "@/features/shared/components/form/FormErrorSummary";
import { MahasiswaListSection } from "@/features/shared/components/form/MahasiswaListSection";
import { DosenListSection } from "@/features/shared/components/form/DosenListSection";
import { FormWelcomeBanner } from "@/features/shared/components/form/FormWelcomeBanner";
import { FormFooter } from "@/features/shared/components/form/FormFooter";
import { FormPageHeader } from "@/features/shared/components/form/FormPageHeader";
import { FormSkeleton } from "@/features/shared/components/FormSkeleton";

import {
  useFieldList,
  MAHASISWA_INITIAL,
  DOSEN_INITIAL,
} from "@/features/shared/hooks/useFieldList";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { useAuth } from "@/features/auth/hooks/useAuth";

import { prestasiService } from "@/features/achievement/services/prestasiService";
import { mapToPrestasiPayload } from "@/features/achievement/utils/prestasiMapper";

export default function CreatePrestasiPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kategoriParam = searchParams.get("kategori");
  const { currentUser, isLoaded: isAuthLoaded } = useAuth();

  const mahasiswa = useFieldList(MAHASISWA_INITIAL);
  const dosen = useFieldList(DOSEN_INITIAL);

  const prefilledRef = useRef(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const backUrl = kategoriParam
    ? `/achievement?kategori=${kategoriParam}`
    : `/achievement`;

  useEffect(() => {
    if (prefilledRef.current) return;
    if (!isAuthLoaded) return;
    if (currentUser?.role !== "mahasiswa") return;

    const nim = currentUser.identitas ?? "";
    const nama = currentUser.name ?? "";

    if (!nim && !nama) return;

    if (nim) {
      mahasiswa.update(0, "nim", nim);
    }

    if (nama) {
      mahasiswa.update(0, "nama", nama);
    }

    prefilledRef.current = true;
  }, [isAuthLoaded, currentUser, mahasiswa]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMsg("");
    setValidationErrors({});

    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const payload = mapToPrestasiPayload(rawData, mahasiswa.items, dosen.items);

    try {
      const response = await prestasiService.createPrestasi(payload);

      if (response.success) {
        router.push(backUrl);
        return;
      }

      setErrorMsg(response.message || "Gagal menyimpan pengajuan prestasi.");
    } catch (error: any) {
      if (error.response?.status === 422) {
        setValidationErrors(error.response.data.errors ?? {});
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
    <form
      onSubmit={handleSubmit}
      className='mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 animate-in fade-in duration-500 md:p-0'
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

      <RoleGuard allowedRoles={["mahasiswa"]}>
        {!isAuthLoaded ? (
          <FormSkeleton />
        ) : (
          <>
            <FormErrorSummary message={errorMsg} errors={validationErrors} />

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

            <FormFooter backHref={backUrl} />
          </>
        )}
      </RoleGuard>
    </form>
  );
}
