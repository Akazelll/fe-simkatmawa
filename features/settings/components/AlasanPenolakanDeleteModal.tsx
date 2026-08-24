"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import type { AlasanPenolakan } from "@/features/settings/types";

interface AlasanPenolakanDeleteModalProps {
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
}: AlasanPenolakanDeleteModalProps) {
  const handleConfirm = async () => {
    const success = await onConfirm();
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-slate-200 bg-white">
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-100">
            <AlertTriangle className="size-6 text-rose-600" />
          </div>
          <DialogTitle className="text-center text-lg font-bold text-slate-800">
            Hapus Alasan Penolakan
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-slate-500">
            Apakah Anda yakin ingin menghapus alasan penolakan{" "}
            <span className="font-semibold text-slate-700">"{item?.judul}"</span>?
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-center gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="rounded-xl border-slate-200"
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="rounded-xl bg-rose-600 text-white hover:bg-rose-700"
          >
            {isSubmitting ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
