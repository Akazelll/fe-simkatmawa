"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DocumentItem, type SubmissionDocument } from "./DocumentItem";

interface DocumentsCardProps {
  documents: SubmissionDocument[];
}

export function DocumentsCard({ documents }: DocumentsCardProps) {
  if (documents.length === 0) return null;

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
      <CardContent className='p-6 md:p-8'>
        <div className='flex flex-col gap-1 mb-6'>
          <div className='flex items-center gap-2'>
            <h3 className='text-base md:text-lg font-bold text-slate-900'>
              Dokumen Bukti
            </h3>
            <span className='inline-flex items-center justify-center min-w-6 h-5 px-1.5 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600'>
              {documents.length}
            </span>
          </div>
          <p className='text-sm text-slate-500'>
            Periksa dokumen lampiran (Google Drive) sebelum melakukan
            verifikasi.
          </p>
        </div>

        <div className='flex flex-col gap-2.5'>
          {documents.map((doc) => (
            <DocumentItem key={doc.id} document={doc} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
