"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UpdateKemdikbudCredentialPayload } from "@/features/settings/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentEmail?: string;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdateKemdikbudCredentialPayload) => Promise<boolean>;
}

type FormErrors = {
  email: string;
  password: string;
};

const initialErrors: FormErrors = {
  email: "",
  password: "",
};

export function UpdateKemdikbudCredentialModal({
  open,
  onOpenChange,
  currentEmail,
  isSubmitting = false,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  useEffect(() => {
    if (!open) return;

    setEmail(currentEmail ?? "");
    setPassword("");
    setErrors(initialErrors);
  }, [open, currentEmail]);

  const validateForm = () => {
    const newErrors: FormErrors = { ...initialErrors };

    if (!email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!password) {
      newErrors.password = "Password wajib diisi.";
    } else if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter.";
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || !validateForm()) return;

    const ok = await onSubmit({
      email: email.trim(),
      password,
    });

    // Toast sukses/gagal ditangani hook; modal hanya ditutup bila berhasil.
    if (ok) onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (isSubmitting) return; // jangan tutup saat proses simpan berjalan
        onOpenChange(next);
      }}
    >
      <DialogContent className='w-[calc(100vw-2rem)] overflow-hidden rounded-2xl p-0 sm:max-w-[560px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader className='space-y-2 px-6 pb-4 pt-6'>
            <DialogTitle className='text-xl font-extrabold tracking-tight text-[#1a2b5e]'>
              Ubah Kredensial Kemdiktisaintek
            </DialogTitle>

            <DialogDescription className='max-w-[460px] text-sm leading-relaxed text-slate-500'>
              Perubahan ini akan memperbarui akun API yang digunakan worker
              untuk sinkronisasi.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-5 px-6 pb-6'>
            <div className='space-y-4'>
              <div className='space-y-1.5'>
                <Label
                  htmlFor='email'
                  className='text-sm font-bold text-slate-700'
                >
                  Email Akun
                </Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='pusat@udinus.ac.id'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`h-11 rounded-xl text-sm ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.email ? (
                  <p className='text-xs font-semibold text-red-500'>
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className='space-y-1.5'>
                <Label
                  htmlFor='new-password'
                  className='text-sm font-bold text-slate-700'
                >
                  Password Baru
                </Label>
                <Input
                  id='new-password'
                  type='password'
                  placeholder='Masukkan password baru'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={`h-11 rounded-xl text-sm ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.password ? (
                  <p className='text-xs font-semibold text-red-500'>
                    {errors.password}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className='border-t border-slate-100 bg-slate-50 px-6 py-4'>
            <div className='flex items-center justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                size='sm'
                className='h-9 rounded-lg px-4 text-xs font-bold'
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>

              <Button
                type='submit'
                size='sm'
                disabled={isSubmitting}
                className='h-9 rounded-lg bg-[#1a2b5e] px-4 text-xs font-bold text-white hover:bg-[#111d42]'
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='h-3.5 w-3.5 animate-spin' /> Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
