"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Info } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void | Promise<void>;
  title: string;
  isProcessing?: boolean;
}

export function ApproveSubmissionModal({
  isOpen,
  onClose,
  onApprove,
  title,
  isProcessing = false,
}: Props) {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isProcessing) {
          onClose();
        }
      }}
    >
      <DialogContent className='sm:max-w-md overflow-hidden p-0 rounded-2xl border-slate-200/60 shadow-lg'>
        <DialogHeader className='p-6 pb-0'>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0 flex items-center justify-center w-12 h-12 bg-emerald-50 rounded-full border border-emerald-100'>
              <Check className='text-emerald-600' strokeWidth={2.5} size={24} />
            </div>
            <div className='flex flex-col gap-1'>
              <DialogTitle className='text-lg font-bold text-slate-900'>
                Konfirmasi Persetujuan
              </DialogTitle>
              <p className='text-sm text-slate-500 leading-relaxed'>
                Anda akan menyetujui pengajuan{" "}
                <span className='font-semibold text-slate-800'>"{title}"</span>.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className='px-6 py-5'>
          <div className='flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100'>
            <Info className='shrink-0 mt-0.5 text-slate-400' size={18} />
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-semibold text-slate-700'>
                Tindakan Lanjutan
              </span>
              <p className='text-[13px] text-slate-500 leading-relaxed'>
                Pengajuan yang disetujui akan diubah statusnya menjadi{" "}
                <strong>APPROVED</strong> dan otomatis masuk ke dalam antrean
                sinkronisasi sistem.
              </p>
            </div>
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
            onClick={onApprove}
            disabled={isProcessing}
            className='h-10 px-6 gap-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0'
          >
            {isProcessing ? "Memproses..." : "Ya, Setujui"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
