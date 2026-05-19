"use client";

import { MemberFormSection } from "@/features/shared/components/form/MemberFormSection";
import { AdvisorFormSection } from "@/features/shared/components/form/AdvisorFormSection";
import { DeclarationSection } from "@/features/shared/components/form/DeclarationSection";
import { CertificateDetailSection } from "@/features/certificate/components/CertificatedetailSection";
import { useMemberForm } from "@/features/shared/hooks/useMemberForm";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function CreateCertificatePage() {
  const memberHook = useMemberForm();

  return (
    <RoleGuard allowedRoles={["mahasiswa"]}>
      <form className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-4xl w-full mx-auto p-4 md:p-0'>
        <MemberFormSection
          title='Data Mahasiswa'
          members={memberHook.members}
          addMember={memberHook.addMember}
          removeMember={memberHook.removeMember}
          updateMember={memberHook.updateMember}
        />

        <CertificateDetailSection />

        <AdvisorFormSection />

        <DeclarationSection
          onSubmit={() => console.log("Submit")}
          onCancel={() => console.log("Cancel")}
        />
      </form>
    </RoleGuard>
  );
}
