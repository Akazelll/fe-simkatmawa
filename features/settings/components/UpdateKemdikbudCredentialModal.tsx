"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UpdateKemdikbudCredentialPayload } from "@/lib/settings/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentEmail?: string;
  onSubmit: (payload: UpdateKemdikbudCredentialPayload) => void;
}

type FormErrors = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initialErrors: FormErrors = {
  email: "",
  password: "",
  confirmPassword: "",
};

export function UpdateKemdikbudCredentialModal({
  open,
  onOpenChange,
  currentEmail,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  useEffect(() => {
    if (!open) return;

    setEmail(currentEmail ?? "");
    setPassword("");
    setConfirmPassword("");
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

    if (!confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok.";
    }

    setErrors(newErrors);

    return (
      !newErrors.email && !newErrors.password && !newErrors.confirmPassword
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit({
      email: email.trim(),
      password,
      confirmPassword,
    });

    toast.success("Kredensial berhasil diperbarui.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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

              <div className='space-y-1.5'>
                <Label
                  htmlFor='confirm-password'
                  className='text-sm font-bold text-slate-700'
                >
                  Konfirmasi Password
                </Label>
                <Input
                  id='confirm-password'
                  type='password'
                  placeholder='Ulangi password baru'
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={`h-11 rounded-xl text-sm ${
                    errors.confirmPassword
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {errors.confirmPassword ? (
                  <p className='text-xs font-semibold text-red-500'>
                    {errors.confirmPassword}
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
