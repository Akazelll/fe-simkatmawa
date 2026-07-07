"use client";

import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Link2,
  Pencil,
  CheckCircle2,
  AlertCircle,
  Mail,
  KeyRound,
  Clock,
  User,
} from "lucide-react";
import { KemdikbudCredential } from "@/features/settings/types";
import { PasswordMask } from "./PasswordMask";
import { formatDateTime } from "@/lib/utils/dateFormat";

interface Props {
  credential: KemdikbudCredential;
  onEdit: () => void;
}

export function KemdikbudIntegrationCard({ credential, onEdit }: Props) {
  const fields: { icon: typeof Mail; label: string; value: ReactNode }[] = [
    { icon: Mail, label: "Email Akun", value: credential.email },
    {
      icon: KeyRound,
      label: "Password",
      value: <PasswordMask hasPassword={credential.is_password_set} />,
    },
    {
      icon: Clock,
      label: "Terakhir Update",
      value: formatDateTime(credential.terakhir_diperbarui),
    },
    {
      icon: User,
      label: "Diperbarui Oleh",
      value: credential.diperbarui_oleh || "—",
    },
  ];

  return (
    <Card className='mx-auto max-w-3xl overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm'>
      <CardContent className='space-y-6 p-6 sm:p-8'>
        {/* Header */}
        <div className='flex items-start justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#0F4C81]/10 text-[#0F4C81]'>
              <Link2 className='h-6 w-6' />
            </div>
            <div className='flex flex-col gap-0.5'>
              <h2 className='text-lg font-bold leading-tight text-slate-800'>
                Integrasi API Kemdiktisaintek
              </h2>
              <p className='text-sm text-slate-500'>
                Sinkronisasi data worker terpusat
              </p>
            </div>
          </div>

          {credential.is_password_set ? (
            <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600'>
              <CheckCircle2 size={14} /> Connected
            </span>
          ) : (
            <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600'>
              <AlertCircle size={14} /> Setup Required
            </span>
          )}
        </div>

        {/* Detail grid */}
        <div className='grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2'>
          {fields.map((field) => (
            <div key={field.label} className='space-y-1.5'>
              <span className='flex items-center gap-1.5 text-xs font-semibold text-slate-500'>
                <field.icon size={14} className='text-slate-400' />
                {field.label}
              </span>
              <div className='rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm font-semibold text-slate-800'>
                {field.value}
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-end border-t border-slate-100 pt-5'>
          <Button
            onClick={onEdit}
            className='flex items-center gap-2 rounded-xl bg-[#0F4C81] px-6 py-5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0c3e6b]'
          >
            <Pencil className='h-4 w-4' /> Ubah Kredensial
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
