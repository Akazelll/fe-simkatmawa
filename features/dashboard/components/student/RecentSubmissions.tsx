"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { prestasiService } from "@/features/achievement/services/prestasiService";
import { sertifikasiService } from "@/features/certificate/services/sertifikasiService";
import { rekognisiService } from "@/features/recognition/services/rekognisiService";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

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

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl'>
      <CardHeader>
        <CardTitle className='text-base font-bold'>Submisi Terbaru</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {loading ? (
          /* ========================================== */
          /* SKELETON LOADING UNTUK LIST RECENT SUBMISSION */
          /* ========================================== */
          [1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className='flex items-center justify-between p-3 bg-slate-50 rounded-xl'
            >
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-20' />
              </div>
              <Skeleton className='h-6 w-24 rounded-full' />
            </div>
          ))
        ) : data.length === 0 ? (
          /* TAMPILAN JIKA DATA KOSONG */
          <div className='text-center text-sm text-slate-500 py-4'>
            Belum ada submisi terbaru.
          </div>
        ) : (
          /* ========================================== */
          /* DATA ASLI SETELAH FETCH SELESAI            */
          /* ========================================== */
          data.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className='flex items-center justify-between p-3 bg-slate-50 rounded-xl'
            >
              <div>
                <p className='text-sm font-semibold'>
                  {item.nama || item.lomba}
                </p>
                <p className='text-xs text-slate-500'>{item.type}</p>
              </div>
              <StatusBadge status={item.status_internal} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
