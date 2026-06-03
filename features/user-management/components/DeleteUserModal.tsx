"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; // Bisa diganti dengan interface User yang lebih spesifik
  onSuccess: () => void;
}

export function DeleteUserModal({
  isOpen,
  onClose,
  user,
  onSuccess,
}: DeleteUserModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    if (!user) return;

    setIsProcessing(true);
    try {
      // TODO: Panggil API Delete UserService di sini
      // contoh: await userService.deleteUser(user.id);

      // Simulasi delay API
      await new Promise((resolve) => setTimeout(resolve, 800));

      onSuccess();
    } catch (error) {
      console.error("Gagal menghapus pengguna:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) return null;

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
            <div className='flex-shrink-0 flex items-center justify-center w-12 h-12 bg-rose-50 rounded-full border border-rose-100'>
              <Trash2 className='text-rose-600' strokeWidth={2.5} size={24} />
            </div>
            <div className='flex flex-col gap-1'>
              <DialogTitle className='text-lg font-bold text-slate-900 text-left'>
                Hapus Pengguna
              </DialogTitle>
              <p className='text-sm text-slate-500 leading-relaxed text-left'>
                Anda akan menghapus pengguna{" "}
                <span className='font-semibold text-slate-800'>
                  "{user.name}"
                </span>
                .
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className='px-6 py-5'>
          <div className='flex gap-3 p-4 rounded-xl bg-rose-50/50 border border-rose-100/60 text-rose-800'>
            <AlertTriangle
              className='shrink-0 mt-0.5 text-rose-500'
              size={18}
            />
            <div className='flex flex-col gap-1'>
              <span className='text-sm font-semibold text-rose-900'>
                Tindakan Permanen
              </span>
              <p className='text-[13px] text-rose-700 leading-relaxed'>
                Data pengguna ini akan dihapus secara permanen dari sistem dan
                tidak dapat dipulihkan. Pengguna ini juga tidak akan bisa lagi
                mengakses sistem SIMKATMAWA.
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
            onClick={handleDelete}
            disabled={isProcessing}
            className='h-10 px-6 gap-2 rounded-xl text-sm font-semibold bg-rose-500 text-white shadow-sm hover:bg-rose-600 hover:-translate-y-0.5 hover:shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0'
          >
            {isProcessing ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
