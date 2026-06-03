"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { AlertCircle } from "lucide-react";

export interface VerificationSubmissionData {
  name: string;
  status: string;
  category: string;
  level: string;
  organizer: string;
  date: Date;
  submittedBy: string;
  nim: string;
  rejectionReason?: string; // Tambahan field alasan penolakan
}

interface SubmissionInfoCardProps {
  submission: VerificationSubmissionData;
}

interface InfoFieldProps {
  label: string;
  value: string;
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className='flex flex-col gap-1.5 min-w-0'>
      <span className='text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
        {label}
      </span>
      <span className='text-sm font-semibold text-slate-800 wrap-break-word'>
        {value}
      </span>
    </div>
  );
}

export function SubmissionInfoCard({ submission }: SubmissionInfoCardProps) {
  const formattedDate = submission.date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const isRejected = submission.status === "REJECTED";

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden'>
      <CardContent className='p-6 md:p-8 space-y-6'>
        {/* Header Title & Status */}
        <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5'>
          <h2 className='text-lg md:text-xl font-bold text-slate-900 leading-snug'>
            {submission.name}
          </h2>
          <StatusBadge status={submission.status} className='shrink-0' />
        </div>

        {/* Grid Informasi */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'>
          <InfoField label='Kategori' value={submission.category} />
          <InfoField label='Level' value={submission.level} />
          <InfoField label='Penyelenggara' value={submission.organizer} />
          <InfoField label='Tanggal Pengajuan' value={formattedDate} />
          <InfoField
            label='Diajukan Oleh'
            value={`${submission.submittedBy} (${submission.nim})`}
          />
        </div>

        {/* Tampilkan Blok Alasan Penolakan Jika Status REJECTED */}
        {isRejected && submission.rejectionReason && (
          <div className='flex gap-3 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300'>
            <AlertCircle className='shrink-0 mt-0.5 text-rose-500' size={18} />
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-bold text-rose-900'>
                Alasan Penolakan Admin
              </span>
              <p className='text-[13px] text-rose-700 leading-relaxed font-medium'>
                {submission.rejectionReason}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
