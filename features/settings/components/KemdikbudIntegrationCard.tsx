"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Pencil, CheckCircle2, AlertCircle } from "lucide-react";
import { KemdikbudCredential } from "@/features/settings/types";
import { PasswordMask } from "./PasswordMask";
import { formatDateTime } from "@/lib/utils/dateFormat";

interface Props {
  credential: KemdikbudCredential;
  onEdit: () => void;
}

export function KemdikbudIntegrationCard({ credential, onEdit }: Props) {
  return (
    <Card className='mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
      <CardHeader className='bg-[#0F4C81] p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white'>
              <Link className='h-6 w-6' />
            </div>
            <div>
              <CardTitle className='text-lg font-bold text-white'>
                Integrasi API Kemdiktisaintek
              </CardTitle>
              <p className='text-[13px] text-blue-100 font-medium'>
                Sinkronisasi data worker terpusat
              </p>
            </div>
          </div>

          {credential.hasPassword ? (
            <div className='flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-100 rounded-full text-xs font-bold border border-emerald-400/30'>
              <CheckCircle2 size={14} /> Connected
            </div>
          ) : (
            <div className='flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-100 rounded-full text-xs font-bold border border-red-400/30'>
              <AlertCircle size={14} /> Setup Required
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className='p-6 sm:p-8 space-y-6'>
        {/* Layout grid proporsional sesuai standar UI SIMKATMAWA */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='space-y-1'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
              Email Akun
            </span>
            <div className='font-semibold text-slate-800 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100'>
              {credential.email}
            </div>
          </div>

          <div className='space-y-1'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
              Password
            </span>
            <div className='font-semibold text-slate-800 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100'>
              <PasswordMask hasPassword={credential.hasPassword} />
            </div>
          </div>

          <div className='space-y-1'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
              Terakhir Update
            </span>
            <div className='font-medium text-slate-700 text-sm'>
              {formatDateTime(credential.updatedAt)}
            </div>
          </div>

          <div className='space-y-1'>
            <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
              Diperbarui Oleh
            </span>
            <div className='font-medium text-slate-700 text-sm'>
              {credential.updatedBy || "—"}
            </div>
          </div>
        </div>

        <div className='pt-4 border-t border-slate-100 flex justify-end'>
          <Button
            onClick={onEdit}
            className='flex items-center gap-2 rounded-xl bg-[#0F4C81] hover:bg-[#0c3e6b] px-6 py-5 text-sm font-bold text-white shadow-sm transition-all'
          >
            <Pencil className='h-4 w-4' /> Ubah Kredensial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
