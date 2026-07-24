"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Ban } from "lucide-react";
import type {
  AlasanPenolakan,
  AlasanPenolakanInput,
} from "@/features/settings/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AlasanPenolakan | null;
  isSubmitting: boolean;
  onSubmit: (data: AlasanPenolakanInput) => Promise<boolean>;
}

export function AlasanPenolakanFormModal({
  open,
  onOpenChange,
  item,
  isSubmitting,
  onSubmit,
}: Props) {
  const isEdit = Boolean(item);
  const [judul, setJudul] = useState("");
  const [alasan, setAlasan] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<{ judul?: string; alasan?: string }>({});

  useEffect(() => {
    if (open) {
      if (item) {
        setJudul(item.judul);
        setAlasan(item.alasan);
        setIsActive(item.is_active);
      } else {
        setJudul("");
        setAlasan("");
        setIsActive(true);
      }
      setErrors({});
    }
  }, [open, item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { judul?: string; alasan?: string } = {};

    if (!judul.trim()) {
      newErrors.judul = "Judul alasan penolakan wajib diisi.";
    } else if (judul.length > 255) {
      newErrors.judul = "Judul maksimal 255 karakter.";
    }

    if (!alasan.trim()) {
      newErrors.alasan = "Detail alasan penolakan wajib diisi.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = await onSubmit({
      judul: judul.trim(),
      alasan: alasan.trim(),
      is_active: isActive,
    });

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
      <DialogContent className='sm:max-w-lg overflow-hidden p-0 rounded-2xl border-slate-200 shadow-xl'>
        <DialogHeader className='p-6 pb-0'>
          <div className='flex items-start gap-4'>
            <div className='flex-shrink-0 flex items-center justify-center w-12 h-12 bg-amber-50 rounded-xl border border-amber-100 text-amber-600'>
              <Ban size={22} strokeWidth={2.5} />
            </div>
            <div className='flex flex-col gap-1'>
              <DialogTitle className='text-lg font-bold text-slate-900 text-left'>
                {isEdit ? "Edit Master Alasan Penolakan" : "Tambah Master Alasan Penolakan"}
              </DialogTitle>
              <p className='text-sm text-slate-500 leading-relaxed text-left'>
                {isEdit
                  ? "Perbarui template alasan penolakan untuk verifikasi."
                  : "Buat template alasan penolakan baru yang dapat digunakan admin."}
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className='p-6 space-y-4'>
            {/* Input Judul */}
            <div className='space-y-1.5'>
              <Label className='text-sm font-semibold text-slate-700'>
                Judul Alasan <span className='text-rose-500'>*</span>
              </Label>
              <Input
                placeholder='Contoh: Dokumen Tidak Lengkap'
                value={judul}
                onChange={(e) => {
                  setJudul(e.target.value);
                  if (errors.judul) setErrors((prev) => ({ ...prev, judul: undefined }));
                }}
                disabled={isSubmitting}
                className={`rounded-xl h-11 text-sm ${
                  errors.judul ? "border-rose-300 bg-rose-50/30" : "border-slate-200"
                }`}
              />
              {errors.judul && (
                <p className='text-xs text-rose-500 font-medium'>{errors.judul}</p>
              )}
            </div>

            {/* Input Detail Alasan */}
            <div className='space-y-1.5'>
              <Label className='text-sm font-semibold text-slate-700'>
                Detail Alasan / Deskripsi Penolakan <span className='text-rose-500'>*</span>
              </Label>
              <Textarea
                placeholder='Contoh: Berkas lampiran pendukung yang diunggah tidak sesuai atau kurang lengkap.'
                value={alasan}
                onChange={(e) => {
                  setAlasan(e.target.value);
                  if (errors.alasan) setErrors((prev) => ({ ...prev, alasan: undefined }));
                }}
                disabled={isSubmitting}
                rows={4}
                className={`resize-none rounded-xl text-sm ${
                  errors.alasan ? "border-rose-300 bg-rose-50/30" : "border-slate-200"
                }`}
              />
              {errors.alasan && (
                <p className='text-xs text-rose-500 font-medium'>{errors.alasan}</p>
              )}
            </div>

            {/* Checkbox Status Aktif */}
            <div className='flex items-center gap-3 pt-2'>
              <Checkbox
                id='is_active_checkbox'
                checked={isActive}
                onCheckedChange={(checked) => setIsActive(Boolean(checked))}
                disabled={isSubmitting}
                className='rounded-md border-slate-300 data-[state=checked]:bg-[#0F4C81]'
              />
              <Label
                htmlFor='is_active_checkbox'
                className='text-sm font-medium text-slate-700 cursor-pointer select-none'
              >
                Aktifkan alasan ini (dapat dipilih di modal verifikasi penolakan)
              </Label>
            </div>
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
              type='submit'
              disabled={isSubmitting}
              className='h-10 px-6 rounded-xl bg-[#0F4C81] text-white font-semibold hover:bg-[#0c3e6b]'
            >
              {isSubmitting
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Tambah Alasan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
