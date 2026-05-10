"use client";

import { PageHeader } from "@/features/shared/components/PageHeader";
import { SystemStatusCard } from "@/features/settings/components/SystemStatusCard";
import { ApiConfigCard } from "@/features/settings/components/ApiConfigCard";
import { SyncConfigCard } from "@/features/settings/components/SyncConfigCard";

export default function SettingsPage() {
  return (
    <div className='flex flex-col gap-8 animate-in fade-in duration-500'>
      <PageHeader
        title='System Settings'
        description='Konfigurasi integrasi sistem dan parameter sinkronisasi'
      />

      <div className='flex flex-col gap-6'>
        {/* Status Section */}
        <div>
          <h2 className='text-base font-bold text-slate-800 mb-4 px-1'>
            System Status
          </h2>
          <SystemStatusCard />
        </div>

        {/* Configuration Section (2 Columns Grid on Desktop) */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2'>
          <ApiConfigCard />
          <SyncConfigCard />
        </div>
      </div>
    </div>
  );
}
