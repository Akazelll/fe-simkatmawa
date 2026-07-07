"use client";

import { useState } from "react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { useKemdikbudCredential } from "@/features/settings/hooks/useKemdikbudCredential";
import { KemdikbudIntegrationCard } from "@/features/settings/components/KemdikbudIntegrationCard";
import { UpdateKemdikbudCredentialModal } from "@/features/settings/components/UpdateKemdikbudCredentialModal";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { FormSkeleton } from "@/features/shared/components/FormSkeleton";

export default function SettingsPage() {
  const { isLoaded: isAuthLoaded } = useAuth();
  const {
    credential,
    isLoaded: isCredentialLoaded,
    isUpdating,
    error,
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
          <FormSkeleton
            sections={[5]}
            footer={false}
            className='mx-auto max-w-3xl'
          />
        ) : credential ? (
          <>
            <KemdikbudIntegrationCard
              credential={credential}
              onEdit={() => setIsModalOpen(true)}
            />

            <UpdateKemdikbudCredentialModal
              open={isModalOpen}
              onOpenChange={setIsModalOpen}
              currentEmail={credential.email}
              isSubmitting={isUpdating}
              onSubmit={updateCredential}
            />
          </>
        ) : (
          <div className='mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm font-semibold text-red-600'>
            {error || "Gagal memuat kredensial Kemdiktisaintek."}
          </div>
        )}
      </RoleGuard>
    </div>
  );
}
