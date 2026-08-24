"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import type { AlasanPenolakan, AlasanPenolakanInput } from "@/features/settings/types";

interface AlasanPenolakanFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: AlasanPenolakan | null;
  isSubmitting: boolean;
  onSubmit: (data: AlasanPenolakanInput) => Promise<boolean>;
}

export function AlasanPenolakanFormModal({
  open,
  onOpenChange,
  item,
  isSubmitting,
  onSubmit,
}: AlasanPenolakanFormModalProps) {
  const isEdit = !!item;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AlasanPenolakanInput>({
    defaultValues: {
      judul: "",
      alasan: "",
      is_active: true,
    },
  });

  useEffect(() => {
    if (open) {
      if (item) {
        reset({
          judul: item.judul,
          alasan: item.alasan,
          is_active: item.is_active,
        });
      } else {
        reset({
          judul: "",
          alasan: "",
          is_active: true,
        });
      }
    }
  }, [open, item, reset]);

  const handleFormSubmit = async (data: AlasanPenolakanInput) => {
    const success = await onSubmit(data);
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl border-slate-200 bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-slate-800">
            {isEdit ? "Edit Alasan Penolakan" : "Tambah Alasan Penolakan"}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            {isEdit
              ? "Perbarui data alasan penolakan di bawah ini."
              : "Isi data alasan penolakan baru di bawah ini."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Judul <span className="text-rose-500">*</span>
            </label>
            <Input
              {...register("judul", { required: "Judul wajib diisi" })}
              placeholder="Masukkan judul alasan penolakan"
              className="rounded-xl border-slate-200"
              disabled={isSubmitting}
            />
            {errors.judul && (
              <p className="text-xs text-rose-500">{errors.judul.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Alasan <span className="text-rose-500">*</span>
            </label>
            <Textarea
              {...register("alasan", { required: "Alasan wajib diisi" })}
              placeholder="Masukkan alasan penolakan"
              rows={4}
              className="rounded-xl border-slate-200 resize-none"
              disabled={isSubmitting}
            />
            {errors.alasan && (
              <p className="text-xs text-rose-500">{errors.alasan.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="space-y-0.5">
              <label className="text-sm font-semibold text-slate-700">Status</label>
              <p className="text-xs text-slate-500">
                {watch("is_active") ? "Aktif dan dapat digunakan" : "Non-aktif"}
              </p>
            </div>
            <Switch
              checked={watch("is_active")}
              onCheckedChange={(checked) => setValue("is_active", checked)}
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter className="gap-2 pt-2">
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
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#0F4C81] text-white hover:bg-[#0c3e6b]"
            >
              {isSubmitting ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Tambahkan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
