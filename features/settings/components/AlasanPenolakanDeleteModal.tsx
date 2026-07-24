"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import type { AlasanPenolakan } from "@/features/settings/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AlasanPenolakan | null;
  isSubmitting: boolean;
  onConfirm: () => Promise<boolean>;
}

export function AlasanPenolakanDeleteModal({
  open,
  onOpenChange,
  item,
  isSubmitting,
  onConfirm,
}: Props) {
  if (!item) return null;

  const handleConfirm = async () => {
    const success = await onConfirm();
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val && !isSubmitting) onOpenChange(false);
      }}
    >
      <DialogContent className='sm:max-w-md overflow-hidden p-0 rounded-2xl border-slate-200 shadow-xl'>
        <DialogHeader className='p-6 pb-0'>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0 flex items-center justify-center w-12 h-12 bg-rose-50 rounded-xl border border-rose-100 text-rose-600'>
              <AlertTriangle size={24} strokeWidth={2.5} />
            </div>
            <div className='flex flex-col gap-1'>
              <DialogTitle className='text-lg font-bold text-slate-900 text-left'>
                Hapus Master Alasan Penolakan
              </DialogTitle>
              <p className='text-sm text-slate-500 leading-relaxed text-left'>
                Apakah Anda yakin ingin menghapus template alasan{" "}
                <span className='font-semibold text-slate-800'>"{item.judul}"</span>?
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className='p-6 pt-4 text-xs text-slate-500 bg-rose-50/40 border-y border-rose-100 my-2 mx-6 rounded-xl'>
          <strong>Catatan:</strong> Pengajuan yang sudah ditolak sebelumnya menggunakan alasan ini tidak akan terpengaruh.
        </div>

        <div className='flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100'>
          <Button
            type='button'
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className='h-10 px-5 rounded-xl border-slate-200 text-slate-600 font-semibold'
          >
            Batal
          </Button>

          <Button
            type='button'
            onClick={handleConfirm}
            disabled={isSubmitting}
            className='h-10 px-6 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700'
          >
            {isSubmitting ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
