"use client";

import { useEffect, useState } from "react";
import { FileText, Trophy, ScrollText, LayoutDashboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { prestasiService } from "@/features/achievement/services/prestasiService";
import { sertifikasiService } from "@/features/certificate/services/sertifikasiService";
import { rekognisiService } from "@/features/recognition/services/rekognisiService";

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
          prestasiService.getPrestasiList(),
          sertifikasiService.getSertifikasiList(),
          rekognisiService.getRekognisiList(),
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
      label: "Total Submission",
      value: totalSubmissions,
      icon: LayoutDashboard,
      color: "text-indigo-500",
    },
    {
      label: "Total Prestasi",
      value: stats.prestasi,
      icon: Trophy,
      color: "text-amber-500",
    },
    {
      label: "Total Sertifikat",
      value: stats.sertifikasi,
      icon: FileText,
      color: "text-sky-500",
    },
    {
      label: "Total Rekognisi",
      value: stats.rekognisi,
      icon: ScrollText,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {items.map((item) => (
        <Card
          key={item.label}
          className='border-slate-200 shadow-sm rounded-2xl'
        >
          <CardContent className='p-6 flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-500 font-medium'>{item.label}</p>
              <h3 className='text-2xl font-bold mt-1'>
                {isLoading ? "..." : item.value}
              </h3>
            </div>
            <div className={`p-3 bg-slate-50 rounded-xl ${item.color}`}>
              <item.icon size={24} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
