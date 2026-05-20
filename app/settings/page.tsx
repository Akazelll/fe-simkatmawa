"use client";

import { useState } from "react";
import { RoleGuard } from "@/features/auth/components/RoleGuard"; // PascalCase
import { PageHeader } from "@/features/shared/components/PageHeader";
import { useKemdikbudCredential } from "@/features/settings/hooks/useKemdikbudCredential";
import { KemdikbudIntegrationCard } from "@/features/settings/components/KemdikbudIntegrationCard";
import { UpdateKemdikbudCredentialModal } from "@/features/settings/components/UpdateKemdikbudCredentialModal";

export default function SettingsPage() {
  const { credential, isLoaded, updateCredential } = useKemdikbudCredential();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded || !credential) return null;

  return (
    <RoleGuard allowedRoles={["superadmin"]}>
      <div className='space-y-6 p-4 md:p-6 max-w-7xl mx-auto animate-in fade-in duration-500'>
        <PageHeader
          title='Pengaturan'
          description='Kelola konfigurasi integrasi API Kemdiktisaintek untuk proses sinkronisasi data.'
        />

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
      </div>
    </RoleGuard>
  );
}
