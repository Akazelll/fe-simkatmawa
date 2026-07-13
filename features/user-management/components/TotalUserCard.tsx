"use client";

import { Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils"; // Pastikan import cn ditambahkan

interface TotalUserCardProps {
  stats?: {
    totalAdmin?: number;
    totalMahasiswa?: number;
  };
  isLoading?: boolean;
}

export function TotalUserCard({ stats, isLoading }: TotalUserCardProps) {
  // TAMPILAN SKELETON (Saat Loading)
  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Skeleton Card 1: Admin (Navy) */}
        <Card
          className={cn(
            "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
            "from-[#1769aa] to-[#0F4C81]",
          )}
        >
          <CardContent className='relative p-6'>
            {/* Watermark bulat meniru ikon */}
            <div className='absolute -bottom-3 -right-2 h-[88px] w-[88px] rounded-full bg-white/10' />
            <div className='relative z-10'>
              <Skeleton className='h-8 w-16 rounded-lg bg-white/30' />
              <Skeleton className='mt-2 h-4 w-24 rounded-md bg-white/25' />
            </div>
          </CardContent>
        </Card>

        {/* Skeleton Card 2: Mahasiswa (Emerald) */}
        <Card
          className={cn(
            "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
            "from-emerald-400 to-green-500",
          )}
        >
          <CardContent className='relative p-6'>
            {/* Watermark bulat meniru ikon */}
            <div className='absolute -bottom-3 -right-2 h-[88px] w-[88px] rounded-full bg-white/10' />
            <div className='relative z-10'>
              <Skeleton className='h-8 w-24 rounded-lg bg-white/30' />
              <Skeleton className='mt-2 h-4 w-32 rounded-md bg-white/25' />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // TAMPILAN ASLI (Saat Data Tersedia)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {/* Card 1: Total Admin */}
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
          "cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg",
          "from-[#1769aa] to-[#0F4C81]",
        )}
      >
        <CardContent className='relative p-6'>
          {/* Watermark icon di pojok kanan bawah */}
          <Shield
            className='absolute -bottom-3 -right-2 text-white/15'
            size={88}
            strokeWidth={1.5}
          />
          <div className='relative z-10'>
            <div className='text-3xl font-bold leading-none'>
              {stats?.totalAdmin || 0}
            </div>
            <p className='mt-2 text-sm font-semibold text-white/95'>
              Total Admin
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Total Mahasiswa */}
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
          "cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg",
          "from-emerald-400 to-green-500",
        )}
      >
        <CardContent className='relative p-6'>
          {/* Watermark icon di pojok kanan bawah */}
          <Users
            className='absolute -bottom-3 -right-2 text-white/15'
            size={88}
            strokeWidth={1.5}
          />
          <div className='relative z-10'>
            <div className='text-3xl font-bold leading-none'>
              {stats?.totalMahasiswa || 0}
            </div>
            <p className='mt-2 text-sm font-semibold text-white/95'>
              Total Mahasiswa
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
