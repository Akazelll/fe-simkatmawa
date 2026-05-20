"use client";

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

export default function CreateCertificatePage() {
  const mahasiswa = useFieldList(MAHASISWA_INITIAL);
  const dosen = useFieldList(DOSEN_INITIAL);

  return (
    <RoleGuard allowedRoles={["mahasiswa"]}>
      <form className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-5xl w-full mx-auto p-4 md:p-0'>
        <FormPageHeader
          title='Sertifikasi'
          description='Lengkapi data sertifikasi, mahasiswa, dan dosen pendamping dalam satu alur.'
          breadcrumbs={[
            { label: "Dashboard" },
            { label: "Sertifikasi" },
            { label: "Form", active: true },
          ]}
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

        <FormFooter
          backHref='/certificate'
          onSubmit={() => console.log("Submit")}
        />
      </form>
    </RoleGuard>
  );
}
