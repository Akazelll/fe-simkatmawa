"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/features/auth/services/authService";
import { tokenStorage } from "@/lib/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepSigned, setKeepSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = tokenStorage.get();
    if (token) {
      router.replace("/dashboard");
    } else {
      setIsChecking(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.login({ email, password });

      if (!result.success) {
        setError(result.message || "Email atau password salah.");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 422) {
        setError("Format email atau password tidak valid.");
      } else {
        setError(
          err.response?.data?.message ||
            "Terjadi kesalahan koneksi. Pastikan backend berjalan.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-slate-50'>
        <div className='animate-pulse flex flex-col items-center gap-2'>
          <div className='w-8 h-8 border-4 border-[#0F4C81] border-t-transparent rounded-full animate-spin'></div>
          <p className='text-sm text-slate-500 font-medium'>
            Memverifikasi sesi...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] px-4 py-8 gap-5'>
      <div className='flex flex-col items-center gap-2 animate-fade-down'>
        <div className='w-10 h-10 rounded-lg bg-[#ffffff] grid place-items-center'>
          <Image
            src='/logo-udinus.png'
            alt='Logo Udinus'
            width={60}
            height={60}
            className='object-contain'
          />
        </div>

        <h1 className='text-2xl font-extrabold text-[#1a2b5e] tracking-wide'>
          SIMKATMAWA
        </h1>

        <p className='text-[10px] font-semibold text-muted-foreground text-center tracking-widest uppercase leading-relaxed md:w-[448px]'>
          Sistem Informasi Manajemen Pemeringkatan
          <br />
          Kemahasiswaan
        </p>
      </div>

      <Card className='w-full max-w-[420px] shadow-md rounded-2xl border-0 animate-fade-up'>
        <CardContent className='pt-8 pb-4 px-8'>
          <div className='mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Selamat Datang
            </h2>
            <p className='text-sm text-muted-foreground mt-0.5'>
              Masukkan Email dan Password Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
              <div className='flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100'>
                <AlertCircle className='w-4 h-4 shrink-0' />
                <span className='font-medium'>{error}</span>
              </div>
            )}

            <div className='space-y-1.5'>
              <Label
                htmlFor='email'
                className='text-[11px] font-bold uppercase tracking-widest text-foreground'
              >
                Email
              </Label>
              <div className='relative'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='email'
                  type='email'
                  placeholder='username@mhs.dinus.ac.id'
                  required
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='h-12 pl-9 bg-muted/50 border-border focus-visible:ring-[#1a2b5e]/20 focus-visible:border-[#1a2b5e]'
                />
              </div>
            </div>

            <div className='space-y-1.5'>
              <div className='flex items-center justify-between'>
                <Label
                  htmlFor='password'
                  className='text-[11px] font-bold uppercase tracking-widest text-foreground'
                >
                  Password
                </Label>
              </div>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='••••••••••••'
                  required
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='h-12 pl-9 pr-10 bg-muted/50 border-border focus-visible:ring-[#1a2b5e]/20 focus-visible:border-[#1a2b5e]'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((p) => !p)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </button>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Checkbox
                id='keep-signed'
                checked={keepSigned}
                onCheckedChange={(v) => setKeepSigned(Boolean(v))}
                className='data-[state=checked]:bg-[#1a2b5e] data-[state=checked]:border-[#1a2b5e]'
              />
              <Label
                htmlFor='keep-signed'
                className='text-sm font-medium text-muted-foreground cursor-pointer'
              >
                Keep me signed in
              </Label>
            </div>

            <Button
              type='submit'
              disabled={isLoading}
              className='w-full bg-gradient-to-r from-[#1a2b5e] to-[#2563eb] hover:from-[#243570] hover:to-[#3b82f6] text-white font-bold tracking-wide rounded-2xl h-11 shadow-md shadow-[#1a2b5e]/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1a2b5e]/30 active:translate-y-0 mt-1'
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
