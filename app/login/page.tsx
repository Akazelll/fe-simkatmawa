"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [keepSigned, setKeepSigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] px-4 py-8 gap-5'>
      <div className='flex flex-col items-center gap-2 animate-fade-down'>
        <div className='w-10 h-10 rounded-lg bg-[#1a2b5e] grid place-items-center'>
          <span className='text-white text-[10px] font-bold tracking-wide'>
            SIM
          </span>
        </div>

        <h1 className='text-2xl font-extrabold text-[#1a2b5e] tracking-wide'>
          SIMKATMAWA
        </h1>

        <p className='text-[10px] font-semibold text-muted-foreground text-center tracking-widest uppercase leading-relaxed w-[448px] h-[20px]'>
          Sistem Informasi Manajemen Pemeringkatan
          <br />
          Kemahasiswaan
        </p>
      </div>

      {/* ── Card ───────────────────────────────────────────────── */}
      <Card className='w-full max-w-[420px] shadow-md rounded-2xl border-0 animate-fade-up'>
        <CardContent className='pt-8 pb-2 px-8'>
          {/* Card header */}
          <div className='mb-6'>
            <h2 className='text-xl font-bold text-foreground'>
              Selamat Datang
            </h2>
            <p className='text-sm text-muted-foreground mt-0.5'>
              Masukkan Email dan Password Anda
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault(); 
              router.push("/dashboard");
            }}
            className='space-y-4'
          >
            {/* Email */}
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
                  className='h-12 pl-9 bg-muted/50 border-border focus-visible:ring-[#1a2b5e]/20 focus-visible:border-[#1a2b5e]'
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-1.5'>
              <div className='flex items-center justify-between'>
                <Label
                  htmlFor='password'
                  className='text-[11px] font-bold uppercase tracking-widest text-foreground'
                >
                  Password
                </Label>
                <Link
                  href='/forgot-password'
                  className='text-xs font-semibold text-[#003178] hover:opacity-70 transition-opacity'
                >
                  Forgot?
                </Link>
              </div>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='••••••••••••'
                  required
                  autoComplete='current-password'
                  className='h-12 pl-9 pr-10 bg-muted/50 border-border focus-visible:ring-[#1a2b5e]/20 focus-visible:border-[#1a2b5e]'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
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
              type='button'
              onClick={() => router.push("/dashboard")}
              disabled={isLoading}
              className='w-full bg-gradient-to-r from-[#1a2b5e] to-[#2563eb] hover:from-[#243570] hover:to-[#3b82f6] text-white font-bold tracking-wide rounded-2xl h-11 shadow-md shadow-[#1a2b5e]/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1a2b5e]/30 active:translate-y-0 mt-1'
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className='text-sm text-muted-foreground font-medium'>
        Tidak punya akun?{" "}
        <Link
          href='/register'
          className='text-[#1a2b5e] font-bold hover:underline'
        >
          Daftar
        </Link>
      </p>
    </main>
  );
}
