"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ForbiddenAccessProps = {
  title?: string;
  description?: string;
};

export function ForbiddenAccess({
  title = "Akses Ditolak",
  description = "Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan kembali ke dashboard atau hubungi administrator jika ini adalah kesalahan.",
}: ForbiddenAccessProps) {
  return (
    <main className='relative min-h-screen overflow-hidden bg-[#f0f2f5] px-4 py-8'>
      <div className='absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl' />
      <div className='absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl' />

      <section className='relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6'>
        <div className='flex flex-col items-center gap-3 animate-fade-down'>
          <div className='grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70'>
            <Image
              src='/logo-udinus.png'
              alt='Logo Udinus'
              width={42}
              height={42}
              className='object-contain'
              priority
            />
          </div>

          <div className='text-center'>
            <h1 className='text-2xl font-extrabold tracking-wide text-[#1a2b5e]'>
              SIMKATMAWA
            </h1>
            <p className='mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500'>
              Access Control
            </p>
          </div>
        </div>

        <Card className='w-full max-w-[460px] overflow-hidden rounded-[2rem] border-0 shadow-xl shadow-slate-300/40 animate-fade-up'>
          <CardContent className='px-8 py-10'>
            <div className='flex flex-col items-center text-center'>
              <div className='relative mb-7 flex items-center justify-center'>
                <div className='absolute h-28 w-28 rounded-full bg-red-100/70' />
                <div className='absolute h-24 w-24 rounded-full bg-red-100/80 animate-ping opacity-30' />

                <div className='relative z-10 grid h-24 w-24 place-items-center rounded-full bg-red-50 ring-8 ring-red-50/60'>
                  <ShieldAlert
                    className='h-11 w-11 text-red-500'
                    strokeWidth={2.2}
                  />
                </div>
              </div>

              <div className='mb-7 space-y-3'>
                <p className='inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-red-500'>
                  Forbidden
                </p>

                <h2 className='text-2xl font-extrabold tracking-tight text-[#1a2b5e]'>
                  {title}
                </h2>

                <p className='mx-auto max-w-sm text-sm font-medium leading-6 text-slate-500'>
                  {description}
                </p>
              </div>

              <div className='grid w-full gap-3 sm:grid-cols-2'>
                <Button
                  asChild
                  className='h-12 rounded-2xl bg-gradient-to-r from-[#1a2b5e] to-[#2563eb] font-bold text-white shadow-md shadow-[#1a2b5e]/25 transition-all hover:-translate-y-0.5 hover:from-[#243570] hover:to-[#3b82f6] hover:shadow-lg hover:shadow-[#1a2b5e]/30 active:translate-y-0'
                >
                  <Link
                    href='/dashboard'
                    className='flex items-center justify-center gap-2'
                  >
                    <Home className='h-4 w-4' strokeWidth={2.5} />
                    Dashboard
                  </Link>
                </Button>

                <Button
                  asChild
                  variant='outline'
                  className='h-12 rounded-2xl border-slate-200 bg-white font-bold text-slate-600 transition-all hover:-translate-y-0.5 hover:bg-slate-50 active:translate-y-0'
                >
                  <Link
                    href='/'
                    className='flex items-center justify-center gap-2'
                  >
                    <ArrowLeft className='h-4 w-4' strokeWidth={2.5} />
                    Kembali
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
