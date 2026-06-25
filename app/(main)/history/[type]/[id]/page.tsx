"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { BackLink } from "@/features/shared/components/BackLink";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { verifikasiService } from "@/features/verification/services/verifikasiService";
import { TipeKegiatan } from "@/features/verification/types";
import { normalizeSubmissionDetail } from "@/features/verification/utils/verificationMapper";
import { SubmissionDetailBody } from "@/features/verification/components/SubmissionDetailBody";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function HistoryDetailPage() {
  const params = useParams();

  const type = params?.type as string;
  const id = params?.id as string;

  const apiType = (
    type === "sertifikat" ? "sertifikasi" : type
  ) as TipeKegiatan;

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !type ||
      type === "undefined" ||
      !id ||
      id === "undefined" ||
      !apiType
    ) {
      return;
    }

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const response = await verifikasiService.getHistoryDetail(apiType, id);
        setData(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail riwayat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [type, id, apiType]);

  const detail = useMemo(
    () => (data ? normalizeSubmissionDetail(data) : null),
    [data],
  );

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className='space-y-6 p-6 max-w-5xl mx-auto animate-in fade-in duration-500'>
        <BackLink href={`/history`} label='Kembali ke Riwayat' />

        <PageHeader
          title='Detail Riwayat'
          description='Rincian pengajuan mahasiswa yang telah diproses.'
        />

        {isLoading ? (
          <div className='space-y-6'>
            <Card className='border-slate-200 shadow-sm rounded-2xl bg-white overflow-hidden'>
              <CardContent className='p-6 md:p-8 space-y-6'>
                <div className='flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between'>
                  <Skeleton className='h-6 w-64 max-w-full' />
                  <Skeleton className='h-6 w-24 shrink-0 rounded-full' />
                </div>
                <div className='grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-3'>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className='flex flex-col gap-2'>
                      <Skeleton className='h-3 w-24' />
                      <Skeleton className='h-4 w-3/4' />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
              <CardContent className='p-6 md:p-8'>
                <Skeleton className='mb-6 h-5 w-40' />
                <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                  {[0, 1, 2, 3].map((i) => (
                    <Skeleton key={i} className='h-12 w-full rounded-xl' />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : !detail ? (
          <div className='p-8 bg-white border rounded-xl text-center text-slate-500 shadow-sm'>
            Data riwayat tidak ditemukan atau telah dihapus.
          </div>
        ) : (
          <SubmissionDetailBody detail={detail} type={apiType} audience='admin' />
        )}
      </div>
    </RoleGuard>
  );
}
