"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { SyncQueueStats } from "@/features/queue/types";

interface CardConfig {
  key: "pending" | "processing" | "success" | "failed";
  label: string;
  caption: string;
  icon: LucideIcon;
  gradient: string;
}

// Kartu warna-warni bergaya dashboard (gradient + watermark icon).
const CARD_CONFIG: CardConfig[] = [
  {
    key: "pending",
    label: "Menunggu",
    caption: "Dalam antrean",
    icon: Clock,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    key: "processing",
    label: "Diproses",
    caption: "Sedang dikirim",
    icon: RefreshCw,
    gradient: "from-sky-400 to-blue-500",
  },
  {
    key: "success",
    label: "Berhasil",
    caption: "Tersinkronisasi",
    icon: CheckCircle2,
    gradient: "from-emerald-400 to-green-500",
  },
  {
    key: "failed",
    label: "Gagal",
    caption: "Gagal sinkronisasi",
    icon: AlertTriangle,
    gradient: "from-rose-400 to-red-500",
  },
];

interface Props {
  stats: Pick<SyncQueueStats, "pending" | "processing" | "success" | "failed">;
}

export function QueueStatCards({ stats }: Props) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {CARD_CONFIG.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.key}
            className={`relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br ${card.gradient} cursor-default transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg`}
          >
            <CardContent className='relative p-6'>
              {/* Watermark icon di pojok kanan bawah */}
              <Icon
                className='absolute -bottom-3 -right-2 text-white/15'
                size={88}
                strokeWidth={1.5}
              />

              <div className='relative z-10'>
                <div className='text-3xl font-bold leading-none'>
                  {stats[card.key] ?? 0}
                </div>
                <p className='mt-2 text-sm font-semibold text-white/95'>
                  {card.label}
                </p>
                <div className='mt-3 flex items-center gap-1.5 text-xs font-medium text-white/80'>
                  <Icon size={14} />
                  {card.caption}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// Skeleton warna-warni — meniru layout & gradient kartu asli.
export function QueueStatCardsSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      {CARD_CONFIG.map((card) => (
        <Card
          key={card.key}
          className={`relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br ${card.gradient}`}
        >
          <CardContent className='relative p-6'>
            {/* Watermark bulat meniru ikon di pojok kanan bawah */}
            <div className='absolute -bottom-3 -right-2 h-22 w-22 rounded-full bg-white/10' />

            <div className='relative z-10'>
              <Skeleton className='h-8 w-16 rounded-lg bg-white/30' />
              <Skeleton className='mt-2 h-4 w-24 rounded-md bg-white/25' />
              <Skeleton className='mt-3 h-3 w-20 rounded-md bg-white/20' />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
