"use client";

import { useState } from "react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { Badge } from "@/components/ui/badge";
import { useKemdikbudCredential } from "@/features/settings/hooks/use-kemdikbud-credential";
import { KemdikbudIntegrationCard } from "@/features/settings/components/kemdikbud-integration-card";
import { UpdateKemdikbudCredentialModal } from "@/features/settings/components/update-kemdikbud-credential-modal";

export default function SettingsPage() {
  const { credential, isLoaded, updateCredential } = useKemdikbudCredential();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded || !credential) return null; // Cegah hydration mismatch / UI bocor

  return (
    <RoleGuard allowedRoles={["superadmin"]}>
      <div className='p-6 space-y-6 max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col gap-1 border-b border-slate-100 pb-5'>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl font-extrabold text-[#1a2b5e] tracking-tight'>
              Pengaturan Sistem
            </h1>
            <Badge className='bg-red-50 text-red-600 font-bold text-[10px] rounded-md tracking-wider border border-red-100 uppercase px-2 py-0.5'>
              Superadmin Only
            </Badge>
          </div>
          <p className='text-xs font-medium text-slate-500'>
            Kelola konfigurasi integrasi API Kemdiktisaintek untuk proses
            sinkronisasi data.
          </p>
        </div>

        {/* Card Utama */}
        <KemdikbudIntegrationCard
          credential={credential}
          onEdit={() => setIsModalOpen(true)}
        />

        {/* Modal Form */}
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
