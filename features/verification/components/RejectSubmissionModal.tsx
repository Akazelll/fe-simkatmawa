"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string) => void;
  title: string;
}

export function RejectSubmissionModal({
  isOpen,
  onClose,
  onReject,
  title,
}: Props) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (reason.trim().length < 10) {
      setError("Alasan penolakan wajib diisi minimal 10 karakter.");
      return;
    }
    onReject(reason);
    setReason("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tolak Pengajuan: {title}</DialogTitle>
        </DialogHeader>
        <div className='space-y-3 py-4'>
          <Label>
            Komentar / Alasan Penolakan <span className='text-red-500'>*</span>
          </Label>
          <Textarea
            placeholder='Berikan alasan mengapa pengajuan ditolak...'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={error ? "border-red-500" : ""}
          />
          {error && <p className='text-xs text-red-500 font-medium'>{error}</p>}
        </div>
        <div className='border-t border-slate-100 bg-slate-50 px-6 py-4'>
          <div className='flex items-center justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              size='sm'
              className='h-9 rounded-lg px-4 text-xs font-bold'
              onClick={() => onClose()}
            >
              Batal
            </Button>

            <Button
              type='submit'
              size='sm'
              className='h-9 rounded-lg bg-[#1a2b5e] px-4 text-xs font-bold text-white hover:bg-[#111d42]'
            >
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
