"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteSubmissionDialogProps {
  open: boolean;
  title: string;
  isDeleting?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function DeleteSubmissionDialog({
  open,
  title,
  isDeleting = false,
  onConfirm,
  onClose,
}: DeleteSubmissionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && !isDeleting && onClose()}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <div className='flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 mb-2'>
            <AlertTriangle className='w-6 h-6 text-rose-600' />
          </div>
          <DialogTitle className='text-lg font-bold text-slate-900'>
            Hapus Pengajuan?
          </DialogTitle>
          <DialogDescription className='text-sm text-slate-500'>
            Pengajuan{" "}
            <span className='font-semibold text-slate-700'>{title}</span> akan
            dihapus. Tindakan ini tidak bisa dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='gap-2 sm:gap-2'>
          <Button
            type='button'
            variant='ghost'
            onClick={onClose}
            disabled={isDeleting}
            className='rounded-xl font-semibold text-slate-500 hover:bg-slate-100'
          >
            Batal
          </Button>
          <Button
            type='button'
            onClick={onConfirm}
            disabled={isDeleting}
            className='gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold'
          >
            {isDeleting && <Loader2 className='w-4 h-4 animate-spin' />}
            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
