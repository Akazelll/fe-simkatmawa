import { StatCard } from "./StatCard";
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
}

export function StatsGrid({ stats }: StatsGridProps) {
  const mappedStats = [
    // --- 3 KARTU KATEGORI DATA ---
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
    // --- 3 KARTU STATUS PENGAJUAN ---
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
      {/* Baris Pertama: Kategori Utama */}
      <div>
        <h3 className='text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3'>
          Ringkasan Berkas Pengajuan
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {mappedStats.slice(0, 3).map((stat) => (
            <StatCard key={stat.label} {...(stat as any)} />
          ))}
        </div>
      </div>

      {/* Baris Kedua: Status Verifikasi */}
      <div>
        <h3 className='text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3'>
          Status Alur Verifikasi
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {mappedStats.slice(3, 6).map((stat) => (
            <StatCard key={stat.label} {...(stat as any)} />
          ))}
        </div>
      </div>
    </div>
  );
}
