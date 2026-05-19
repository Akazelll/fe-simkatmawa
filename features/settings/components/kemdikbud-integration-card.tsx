"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2, Pencil } from "lucide-react";
import { KemdikbudCredential } from "@/lib/settings/settings-types";
import { PasswordMask } from "./password-mask";
import { SettingsInfoAlert } from "./settings-info-alert";
import { formatDateTime } from "@/lib/utils/date-format";

interface Props {
  credential: KemdikbudCredential;
  onEdit: () => void;
}

export function KemdikbudIntegrationCard({ credential, onEdit }: Props) {
  return (
    <Card className='border border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden max-w-3xl'>
      <CardHeader className='bg-slate-50/50 border-b border-slate-100 pb-4'>
        <div className='flex items-center gap-3'>
          <div className='p-2.5 bg-blue-100 text-blue-600 rounded-lg'>
            <Link2 className='w-5 h-5' />
          </div>
          <div>
            <CardTitle className='text-lg font-bold text-slate-800'>
              Integrasi API Kemdiktisaintek
            </CardTitle>
            <p className='text-xs font-medium text-slate-500 mt-0.5'>
              Kredensial ini digunakan oleh worker untuk login ke API
              Kemdiktisaintek saat proses sinkronisasi data.
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-6 space-y-6'>
        <SettingsInfoAlert />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm'>
          <div className='space-y-1 border-b pb-2 md:border-0 md:pb-0'>
            <span className='font-semibold text-slate-400 uppercase tracking-wider text-[10px]'>
              Email Akun
            </span>
            <div className='font-medium text-slate-800'>{credential.email}</div>
          </div>

          <div className='space-y-1 border-b pb-2 md:border-0 md:pb-0'>
            <span className='font-semibold text-slate-400 uppercase tracking-wider text-[10px]'>
              Password
            </span>
            <div>
              <PasswordMask hasPassword={credential.hasPassword} />
            </div>
          </div>

          <div className='space-y-1 border-b pb-2 md:border-0 md:pb-0'>
            <span className='font-semibold text-slate-400 uppercase tracking-wider text-[10px]'>
              Terakhir Diperbarui
            </span>
            <div className='font-medium text-slate-800'>
              {formatDateTime(credential.updatedAt)}
            </div>
          </div>

          <div className='space-y-1'>
            <span className='font-semibold text-slate-400 uppercase tracking-wider text-[10px]'>
              Diperbarui Oleh
            </span>
            <div className='font-medium text-slate-800'>
              {credential.updatedBy || "—"}
            </div>
          </div>
        </div>

        <div className='flex justify-end pt-2'>
          <Button
            className='bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold shadow-sm flex items-center gap-2'
            onClick={onEdit}
          >
            <Pencil className='w-4 h-4' /> Ubah Kredensial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
