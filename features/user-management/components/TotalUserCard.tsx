"use client";

import { Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
        {/* Skeleton Card 1 */}
        <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
          <CardContent className='p-6 flex items-center gap-4'>
            <Skeleton className='w-12 h-12 rounded-full shrink-0' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-7 w-16' />
            </div>
          </CardContent>
        </Card>

        {/* Skeleton Card 2 */}
        <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
          <CardContent className='p-6 flex items-center gap-4'>
            <Skeleton className='w-12 h-12 rounded-full shrink-0' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-7 w-16' />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // TAMPILAN ASLI (Saat Data Tersedia)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center border border-sky-100 shrink-0'>
            <Shield className='text-sky-600' size={24} />
          </div>
          <div>
            <p className='text-sm font-semibold text-slate-500'>Total Admin</p>
            <h3 className='text-2xl font-bold text-slate-900'>
              {stats?.totalAdmin || 0}
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shrink-0'>
            <Users className='text-emerald-600' size={24} />
          </div>
          <div>
            <p className='text-sm font-semibold text-slate-500'>
              Total Mahasiswa
            </p>
            <h3 className='text-2xl font-bold text-slate-900'>
              {stats?.totalMahasiswa || 0}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
