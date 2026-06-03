"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ForbiddenPage() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-[#f0f2f5] px-4 py-8 gap-6'>
      <div className='flex flex-col items-center gap-2 animate-fade-down'>
        <div className='w-12 h-12 rounded-xl bg-white shadow-sm grid place-items-center'>
          <Image
            src='/logo-udinus.png'
            alt='Logo Udinus'
            width={40}
            height={40}
            className='object-contain'
          />
        </div>
        <h1 className='text-xl font-extrabold text-[#1a2b5e] tracking-wide'>
          SIMKATMAWA
        </h1>
      </div>

      {/* Main Card */}
      <Card className='w-full max-w-[420px] shadow-md rounded-3xl border-0 animate-fade-up overflow-hidden'>
        <CardContent className='pt-10 pb-8 px-8 flex flex-col items-center text-center'>
          {/* Icon Container */}
          <div className='relative flex items-center justify-center mb-6'>
            <div className='absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20' />
            <div className='w-20 h-20 bg-red-50 rounded-full flex items-center justify-center border-[6px] border-red-50/50 relative z-10'>
              <ShieldAlert className='w-10 h-10 text-red-500' strokeWidth={2} />
            </div>
          </div>

          {/* Texts */}
          <h2 className='text-2xl font-bold text-[#1a2b5e] mb-3'>
            Akses Ditolak
          </h2>
          <p className='text-[13px] font-medium text-slate-500 mb-8 leading-relaxed px-4'>
            Maaf, Anda tidak memiliki izin untuk
            mengakses halaman ini.
          </p>

          {/* Themed Button */}
          <Button
            className='w-full bg-gradient-to-r from-[#1a2b5e] to-[#2563eb] hover:from-[#243570] hover:to-[#3b82f6] text-white font-bold tracking-wide rounded-2xl h-12 shadow-md shadow-[#1a2b5e]/25 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#1a2b5e]/30 active:translate-y-0'
          >
            <Link
              href='/dashboard'
              className='flex items-center justify-center gap-2'
            >
              <ArrowLeft className='w-4 h-4' strokeWidth={2.5} />
              Kembali ke Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
