"use client";

import { useEffect, useState } from "react";
import { FileText, Trophy, ScrollText, LayoutDashboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prestasiService } from "@/features/achievement/services/prestasiService";
import { sertifikasiService } from "@/features/certificate/services/sertifikasiService";
import { rekognisiService } from "@/features/recognition/services/rekognisiService";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

export function SubmissionStatsGrid() {
  const [stats, setStats] = useState({
    prestasi: 0,
    sertifikasi: 0,
    rekognisi: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [prestasi, sertif, rekog] = await Promise.all([
          prestasiService.getPrestasiList({ page: 1 }),
          sertifikasiService.getSertifikasiList({ page: 1 }),
          rekognisiService.getRekognisiList({ page: 1 }),
        ]);

        setStats({
          prestasi: prestasi.meta?.total || prestasi.data?.length || 0,
          sertifikasi: sertif.meta?.total || sertif.data?.length || 0,
          rekognisi: rekog.meta?.total || rekog.data?.length || 0,
        });
      } catch (error) {
        console.error("Gagal memuat statistik:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const totalSubmissions = stats.prestasi + stats.sertifikasi + stats.rekognisi;

  const items = [
    {
      label: "Total Keseluruhan",
      value: totalSubmissions,
      icon: LayoutDashboard,
      caption: "Keseluruhan",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      label: "Total Prestasi Mandiri",
      value: stats.prestasi,
      icon: Trophy,
      caption: "Lomba & Kompetisi",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      label: "Total Rekognisi",
      value: stats.rekognisi,
      icon: ScrollText,
      caption: "Pengakuan",
      gradient: "from-emerald-400 to-green-500",
    },
    {
      label: "Total Sertifikasi",
      value: stats.sertifikasi,
      icon: FileText,
      caption: "Pelatihan",
      gradient: "from-sky-400 to-blue-500",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {items.map((item) => (
        <Card
          key={item.label}
          className={`relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br ${item.gradient} cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg`}
        >
          <CardContent className='relative p-6'>
            {/* Watermark icon di pojok kanan bawah */}
            <item.icon
              className='absolute -bottom-3 -right-2 text-white/15'
              size={88}
              strokeWidth={1.5}
            />

            <div className='relative z-10'>
              <div className='min-h-9'>
                {isLoading ? (
                  <Skeleton className='h-9 w-16 bg-white/30' />
                ) : (
                  <h3 className='text-3xl font-bold leading-none'>
                    {item.value}
                  </h3>
                )}
              </div>
              <p className='mt-2 text-sm font-semibold text-white/95'>
                {item.label}
              </p>
              <div className='mt-3 flex items-center gap-1.5 text-xs font-medium text-white/80'>
                <item.icon size={14} />
                {item.caption}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
