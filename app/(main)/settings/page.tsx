"use client";

import { useState } from "react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { useKemdikbudCredential } from "@/features/settings/hooks/useKemdikbudCredential";
import { KemdikbudIntegrationCard } from "@/features/settings/components/KemdikbudIntegrationCard";
import { UpdateKemdikbudCredentialModal } from "@/features/settings/components/UpdateKemdikbudCredentialModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CardSkeleton } from "@/features/shared/components/CardSkeleton";

export default function SettingsPage() {
  const { isLoaded: isAuthLoaded } = useAuth();
  const {
    credential,
    isLoaded: isCredentialLoaded,
    updateCredential,
  } = useKemdikbudCredential();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='space-y-6 p-4 md:p-6 max-w-7xl mx-auto animate-in fade-in duration-500'>
      <PageHeader
        title='Pengaturan'
        description='Kelola konfigurasi integrasi API Kemdiktisaintek untuk proses sinkronisasi data.'
      />
      <RoleGuard allowedRoles={["superadmin"]}>
        {!isAuthLoaded || !isCredentialLoaded ? (
          <div className='w-full'>
            <CardSkeleton
              lines={6}
              className='mx-auto max-w-3xl min-h-[380px]'
            />
          </div>
        ) : (
          credential && (
            <>
              <KemdikbudIntegrationCard
                credential={credential}
                onEdit={() => setIsModalOpen(true)}
              />

              <UpdateKemdikbudCredentialModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                currentEmail={credential.email}
                onSubmit={updateCredential}
              />
            </>
          )
        )}
      </RoleGuard>
    </div>
  );
}
