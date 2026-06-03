"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Pencil } from "lucide-react";
import { KemdikbudCredential } from "@/lib/settings/types";
import { PasswordMask } from "./PasswordMask";
import { formatDateTime } from "@/lib/utils/dateFormat";

interface Props {
  credential: KemdikbudCredential;
  onEdit: () => void;
}

export function KemdikbudIntegrationCard({ credential, onEdit }: Props) {
  return (
    <Card className='mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
      <CardHeader className='bg-slate-50 border-b border-slate-200 p-5 sm:p-6'>
        <div className='flex items-center gap-4'>
          <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shadow-sm'>
            <Link className='h-6 w-6' />
          </div>

          <div className='flex flex-col justify-center'>
            <CardTitle className='text-lg font-extrabold tracking-tight text-[#1a2b5e]'>
              Integrasi API Kemdiktisaintek
            </CardTitle>
            <p className='mt-1 text-xs font-medium text-slate-500 leading-relaxed'>
              Kredensial ini digunakan oleh worker untuk login ke API
              Kemdiktisaintek saat proses sinkronisasi data.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className='p-6 sm:p-8 space-y-8'>
        <div className='grid grid-cols-1 gap-y-6 gap-x-8 text-sm sm:grid-cols-2'>
          <div className='space-y-1.5 border-b border-slate-100 pb-4 sm:border-0 sm:pb-0'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
              Email Akun
            </span>
            <div className='font-medium text-slate-800'>{credential.email}</div>
          </div>

          <div className='space-y-1.5 border-b border-slate-100 pb-4 sm:border-0 sm:pb-0'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
              Password
            </span>
            <div>
              <PasswordMask hasPassword={credential.hasPassword} />
            </div>
          </div>

          <div className='space-y-1.5 border-b border-slate-100 pb-4 sm:border-0 sm:pb-0'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
              Terakhir Diperbarui
            </span>
            <div className='font-medium text-slate-800'>
              {formatDateTime(credential.updatedAt)}
            </div>
          </div>

          <div className='space-y-1.5'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
              Diperbarui Oleh
            </span>
            <div className='font-medium text-slate-800'>
              {credential.updatedBy || "—"}
            </div>
          </div>
        </div>

        <div className='flex justify-end pt-2'>
          <Button
            className='flex items-center gap-2 rounded-xl bg-[#1a2b5e] px-6 py-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#111d42]'
            onClick={onEdit}
          >
            <Pencil className='h-4 w-4' /> Ubah Kredensial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
