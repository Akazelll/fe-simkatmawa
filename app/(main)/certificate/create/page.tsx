"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CertificateDetailSection } from "@/features/certificate/components/CertificatedetailSection";
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

import { mapToSertifikasiPayload } from "@/features/certificate/utils/sertifikasiMapper";
import { sertifikasiService } from "@/features/certificate/services/sertifikasiService";

export default function CreateCertificatePage() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const rawData = Object.fromEntries(formData.entries());

      const payload = mapToSertifikasiPayload(
        rawData,
        mahasiswa.items,
        dosen.items,
      );

      const response = await sertifikasiService.createSertifikasi(payload);

      if (response.success) {
        toast.success("Berhasil!", {
          description: "Pengajuan Sertifikasi berhasil disimpan.",
        });
        router.push("/certificate");
      }
    } catch (error: any) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message ||
        "Gagal menyimpan pengajuan sertifikasi.";

      toast.error("Validasi Gagal", {
        description: errorMsg,
      });

      if (error.response?.data?.errors) {
        console.log("Detail Error Validasi:", error.response.data.errors);
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
          title='Sertifikasi'
          description='Lengkapi data sertifikasi, mahasiswa, dan dosen pendamping dalam satu alur.'
        />

        <FormWelcomeBanner
          badge='Tambah Sertifikasi'
          title='Form sertifikasi terpadu'
          description='Data mahasiswa dan dosen kini diisi langsung di form ini, sehingga tidak perlu berpindah halaman setelah data sertifikasi tersimpan.'
        />

        <CertificateDetailSection />

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

        <FormFooter backHref='/achievement'  />
      </form>
    </RoleGuard>
  );
}
