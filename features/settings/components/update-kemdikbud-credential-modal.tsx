"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { UpdateKemdikbudCredentialPayload } from "@/lib/settings/settings-types";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentEmail?: string;
  onSubmit: (payload: UpdateKemdikbudCredentialPayload) => void;
}

export function UpdateKemdikbudCredentialModal({
  open,
  onOpenChange,
  currentEmail,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Reset form saat modal dibuka
  useEffect(() => {
    if (open) {
      setEmail(currentEmail || "");
      setPassword("");
      setConfirmPassword("");
      setErrors({ email: "", password: "", confirmPassword: "" });
    }
  }, [open, currentEmail]);

  const handleSubmit = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };

    // Validasi Email
    if (!email) {
      newErrors.email = "Email wajib diisi.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid.";
      isValid = false;
    }

    // Validasi Password
    if (!password) {
      newErrors.password = "Password wajib diisi.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter.";
      isValid = false;
    }

    // Validasi Konfirmasi Password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi.";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      onSubmit({ email, password });
      toast.success(
        "Kredensial berhasil diperbarui. Worker akan login ulang pada sinkronisasi berikutnya.",
      );
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px] rounded-2xl'>
        <DialogHeader>
          <DialogTitle className='text-[#1a2b5e]'>
            Ubah Kredensial Kemdiktisaintek
          </DialogTitle>
          <DialogDescription>
            Perubahan ini akan memperbarui email dan password akun API
            Kemdiktisaintek yang digunakan worker untuk sinkronisasi.
          </DialogDescription>
        </DialogHeader>

        <div className='bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-lg flex items-start gap-2.5 my-2'>
          <AlertTriangle className='w-4 h-4 mt-0.5 shrink-0 text-yellow-600' />
          <p className='text-xs font-medium leading-tight'>
            Token aktif akan dihapus. Sistem akan login ulang secara otomatis
            saat worker berikutnya berjalan.
          </p>
        </div>

        <div className='space-y-4 py-2'>
          <div className='space-y-1.5'>
            <Label htmlFor='email'>
              Email Akun <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='email'
              type='email'
              placeholder='pusat@udinus.ac.id'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={
                errors.email ? "border-red-500 focus-visible:ring-red-200" : ""
              }
            />
            {errors.email && (
              <p className='text-xs text-red-500 font-medium'>{errors.email}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='new-password'>
              Password Baru <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='new-password'
              type='password'
              placeholder='Masukkan password baru'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={
                errors.password
                  ? "border-red-500 focus-visible:ring-red-200"
                  : ""
              }
            />
            {errors.password && (
              <p className='text-xs text-red-500 font-medium'>
                {errors.password}
              </p>
            )}
          </div>

          <div className='space-y-1.5'>
            <Label htmlFor='confirm-password'>
              Konfirmasi Password <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='confirm-password'
              type='password'
              placeholder='Ulangi password baru'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={
                errors.confirmPassword
                  ? "border-red-500 focus-visible:ring-red-200"
                  : ""
              }
            />
            {errors.confirmPassword && (
              <p className='text-xs text-red-500 font-medium'>
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className='pt-2'>
          <Button
            variant='outline'
            className='rounded-xl'
            onClick={() => onOpenChange(false)}
          >
            Batal
          </Button>
          <Button
            className='bg-blue-600 hover:bg-blue-700 rounded-xl text-white'
            onClick={handleSubmit}
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
