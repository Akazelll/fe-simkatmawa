"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { prestasiService } from "@/features/achievement/services/prestasiService";
import { sertifikasiService } from "@/features/certificate/services/sertifikasiService";
import { rekognisiService } from "@/features/recognition/services/rekognisiService";

export function RecentSubmissions() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prestasi, sertif, rekog] = await Promise.all([
          prestasiService.getPrestasiList({ page: 1 }),
          sertifikasiService.getSertifikasiList({ page: 1 }),
          rekognisiService.getRekognisiList({ page: 1 }),
        ]);

        const combined = [
          ...(prestasi.data || []).map((i: any) => ({
            ...i,
            type: "Prestasi",
          })),
          ...(sertif.data || []).map((i: any) => ({
            ...i,
            type: "Sertifikat",
          })),
          ...(rekog.data || []).map((i: any) => ({ ...i, type: "Rekognisi" })),
        ]
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .slice(0, 5);

        setData(combined);
      } catch (err) {
        console.error("Gagal memuat dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl'>
      <CardHeader>
        <CardTitle className='text-base font-bold'>Submisi Terbaru</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {data.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className='flex items-center justify-between p-3 bg-slate-50 rounded-xl'
          >
            <div>
              <p className='text-sm font-semibold'>{item.nama || item.lomba}</p>
              <p className='text-xs text-slate-500'>{item.type}</p>
            </div>
            <StatusBadge status={item.status_internal} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
