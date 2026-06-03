"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string) => void | Promise<void>;
  title: string;
  isProcessing?: boolean;
}

// Daftar alasan cepat untuk mempermudah Admin
const QUICK_REASONS = [
  "Akses link Google Drive dikunci, harap buka akses menjadi publik.",
  "Dokumen bukti yang diunggah buram atau tidak terbaca jelas.",
  "Tingkat/Level kegiatan tidak sesuai dengan dokumen bukti.",
  "Nama/NIM pada sertifikat tidak sesuai dengan profil mahasiswa.",
  "Sertifikat yang diunggah merupakan sertifikat kepesertaan, bukan kompetensi.",
];

export function RejectSubmissionModal({
  isOpen,
  onClose,
  onReject,
  title,
  isProcessing = false,
}: Props) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setReason("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (reason.trim().length < 10) {
      setError("Alasan penolakan wajib diisi minimal 10 karakter.");
      return;
    }
    await onReject(reason);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isProcessing) onClose();
      }}
    >
      <DialogContent className='sm:max-w-md overflow-hidden p-0 rounded-2xl border-slate-200/60 shadow-lg'>
        <DialogHeader className='p-6 pb-0'>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0 flex items-center justify-center w-12 h-12 bg-rose-50 rounded-full border border-rose-100'>
              <X className='text-rose-600' strokeWidth={2.5} size={24} />
            </div>
            <div className='flex flex-col gap-1'>
              <DialogTitle className='text-lg font-bold text-slate-900 text-left'>
                Tolak Pengajuan
              </DialogTitle>
              <p className='text-sm text-slate-500 leading-relaxed text-left'>
                Pilih alasan cepat atau ketik detail penolakan untuk{" "}
                <span className='font-semibold text-slate-800'>"{title}"</span>.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className='px-6 py-4 space-y-4'>
          {/* Bagian Pilihan Alasan Cepat */}
          <div className='space-y-1.5'>
            <Label className='text-xs font-semibold text-slate-400 uppercase tracking-wider'>
              Pilih Alasan Cepat
            </Label>
            <div className='flex flex-wrap gap-1.5'>
              {QUICK_REASONS.map((item, idx) => (
                <button
                  key={idx}
                  type='button'
                  disabled={isProcessing}
                  onClick={() => {
                    setReason(item);
                    setError("");
                  }}
                  className='text-left text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors disabled:opacity-50'
                >
                  {item.length > 40 ? `${item.substring(0, 40)}...` : item}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input Alasan */}
          <div className='flex flex-col gap-2'>
            <Label className='text-sm font-semibold text-slate-700'>
              Detail Alasan Penolakan <span className='text-rose-500'>*</span>
            </Label>
            <Textarea
              placeholder='Ketik detail alasan spesifik di sini...'
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              disabled={isProcessing}
              className={`min-h-[100px] resize-none rounded-xl text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-0 ${
                error
                  ? "border-rose-300 focus-visible:ring-rose-500/30 bg-rose-50/30"
                  : "border-slate-200 focus-visible:ring-slate-300 bg-slate-50/50"
              }`}
            />
            {error && (
              <p className='text-xs text-rose-500 font-medium tracking-wide'>
                {error}
              </p>
            )}
          </div>
        </div>

        <div className='flex items-center justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100'>
          <Button
            type='button'
            variant='outline'
            className='h-10 px-5 rounded-xl text-sm font-semibold bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors'
            onClick={onClose}
            disabled={isProcessing}
          >
            Batal
          </Button>

          <Button
            type='button'
            onClick={handleSubmit}
            disabled={isProcessing}
            className='h-10 px-6 gap-2 rounded-xl text-sm font-semibold bg-rose-500 text-white shadow-sm hover:bg-rose-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0'
          >
            {isProcessing ? "Memproses..." : "Ya, Tolak"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
