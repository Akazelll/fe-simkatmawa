"use client";

import { StatCard, StatCardSkeleton } from "./StatCard";
import { StatVariant } from "../types";
import {
  Trophy,
  FileBadge,
  Medal,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface StatsGridProps {
  stats?: any;
  isLoading?: boolean;
}

// Warna skeleton mengikuti urutan & warna kartu asli di mappedStats
const SKELETON_VARIANTS: StatVariant[] = [
  "navy",
  "emerald",
  "amber",
  "amber",
  "emerald",
  "rose",
];

export function StatsGrid({ stats, isLoading }: StatsGridProps) {
  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {SKELETON_VARIANTS.slice(0, 3).map((variant, i) => (
              <StatCardSkeleton key={`skel-top-${i}`} variant={variant} />
            ))}
          </div>
        </div>

        <div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {SKELETON_VARIANTS.slice(3, 6).map((variant, i) => (
              <StatCardSkeleton key={`skel-bot-${i}`} variant={variant} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const mappedStats = [
    {
      label: "Total Prestasi",
      value: stats?.total_prestasi || 0,
      icon: Trophy,
      trend: 0,
      variant: "navy",
    },
    {
      label: "Total Sertifikasi",
      value: stats?.total_sertifikasi || 0,
      icon: FileBadge,
      trend: 0,
      variant: "emerald",
    },
    {
      label: "Total Rekognisi",
      value: stats?.total_rekognisi || 0,
      icon: Medal,
      trend: 0,
      variant: "amber",
    },
    {
      label: "Pengajuan Pending",
      value: stats?.status_pending || 0,
      icon: Clock,
      trend: 0,
      variant: "amber",
    },
    {
      label: "Pengajuan Disetujui",
      value: stats?.status_approved || 0,
      icon: CheckCircle2,
      trend: 0,
      variant: "emerald",
    },
    {
      label: "Pengajuan Ditolak",
      value: stats?.status_rejected || 0,
      icon: XCircle,
      trend: 0,
      variant: "rose",
    },
  ];

  return (
    <div className='space-y-6'>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {mappedStats.slice(0, 3).map((stat) => (
            <StatCard key={stat.label} {...(stat as any)} />
          ))}
        </div>
      </div>

      <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {mappedStats.slice(3, 6).map((stat) => (
            <StatCard key={stat.label} {...(stat as any)} />
          ))}
        </div>
      </div>
    </div>
  );
}
