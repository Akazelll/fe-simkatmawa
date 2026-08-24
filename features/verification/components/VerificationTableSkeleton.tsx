"use client";

import { Card } from "@/components/ui/card";

interface VerificationTableSkeletonProps {
  rows?: number;
}

export function VerificationTableSkeleton({ rows = 5 }: VerificationTableSkeletonProps) {
  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl p-12 flex justify-center items-center bg-white">
      <div className="animate-pulse flex flex-col items-center gap-2 w-full">
        <div className="w-full space-y-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-lg" />
          ))}
        </div>
        <p className="text-sm text-slate-500 font-medium">
          Memuat daftar pengajuan...
        </p>
      </div>
    </Card>
  );
}