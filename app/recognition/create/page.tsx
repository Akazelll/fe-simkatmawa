"use client";

import { MemberFormSection } from "@/features/shared/components/form/MemberFormSection";
import { AdvisorFormSection } from "@/features/shared/components/form/AdvisorFormSection";
import { DeclarationSection } from "@/features/shared/components/form/DeclarationSection";
import { RecognitionDetailSection } from "@/features/recognition/components/RecognitionDetailSection";
import { useMemberForm } from "@/features/shared/hooks/useMemberForm";

export default function CreateRecognitionPage() {
  const memberHook = useMemberForm();

  return (
    <form className='flex flex-col gap-6 animate-in fade-in duration-500 max-w-4xl w-full mx-auto p-4 md:p-0'>
      <MemberFormSection
        title='Peserta Lomba'
        members={memberHook.members}
        addMember={memberHook.addMember}
        removeMember={memberHook.removeMember}
        updateMember={memberHook.updateMember}
      />

      <RecognitionDetailSection />

      <AdvisorFormSection />

      <DeclarationSection
        onSubmit={() => console.log("Submit")}
        onCancel={() => console.log("Cancel")}
      />
    </form>
  );
}
