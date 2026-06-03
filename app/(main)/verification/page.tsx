"use client";

import { useState } from "react";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationTable } from "@/features/verification/components/VerificationTable";
import { useVerifikasiList } from "@/features/verification/hooks/useVerifikasiList";
import { TipeKegiatan } from "@/features/verification/types";
import { RoleGuard } from "@/features/auth/components/RoleGuard";

export default function VerificationPage() {
  const [activeTab, setActiveTab] = useState<TipeKegiatan>("prestasi");

  const { data, isLoading } = useVerifikasiList(activeTab);

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
        <PageHeader
          title='Verifikasi Pengajuan'
          description='Review dan setujui pengajuan prestasi, sertifikasi, dan rekognisi mahasiswa.'
        />

        <Tabs
          defaultValue='prestasi'
          onValueChange={(val) => setActiveTab(val as TipeKegiatan)}
          className='w-full'
        >
          <TabsList className='bg-slate-100 p-1 mb-6 rounded-xl'>
            <TabsTrigger
              value='prestasi'
              className='rounded-lg px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-[#0F4C81] data-[state=active]:shadow-sm font-semibold'
            >
              Prestasi
            </TabsTrigger>
            <TabsTrigger
              value='sertifikasi'
              className='rounded-lg px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-[#0F4C81] data-[state=active]:shadow-sm font-semibold'
            >
              Sertifikasi
            </TabsTrigger>
            <TabsTrigger
              value='rekognisi'
              className='rounded-lg px-6 py-2 data-[state=active]:bg-white data-[state=active]:text-[#0F4C81] data-[state=active]:shadow-sm font-semibold'
            >
              Rekognisi
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='prestasi'
            className='m-0 focus-visible:outline-none'
          >
            <VerificationTable data={data} isLoading={isLoading} />
          </TabsContent>
          <TabsContent
            value='sertifikasi'
            className='m-0 focus-visible:outline-none'
          >
            <VerificationTable data={data} isLoading={isLoading} />
          </TabsContent>
          <TabsContent
            value='rekognisi'
            className='m-0 focus-visible:outline-none'
          >
            <VerificationTable data={data} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  );
}
