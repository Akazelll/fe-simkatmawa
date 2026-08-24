"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { BackLink } from "@/features/shared/components/BackLink";
import { VerificationActions } from "@/features/verification/components/VerificationActions";
import { RejectSubmissionModal } from "@/features/verification/components/RejectSubmissionModal";
import { ApproveSubmissionModal } from "@/features/verification/components/ApproveSubmissionModal";
import { verifikasiService } from "@/features/verification/services/verifikasiService";
import { TipeKegiatan } from "@/features/verification/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { customToast } from "@/lib/custom-toast";
import { normalizeSubmissionDetail } from "@/features/verification/utils/verificationMapper";
import { SubmissionDetailBody } from "@/features/verification/components/SubmissionDetailBody";

export default function VerificationDetailPage() {
  const params = useParams();
  const router = useRouter();

  const type = params?.type as string;
  const id = params?.id as string;

  const apiType = (
    type === "sertifikat" ? "sertifikasi" : type
  ) as TipeKegiatan;

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

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
        const response = await verifikasiService.getDetail(apiType, id);
        setData(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [type, id, apiType]);

  const submitApprove = async () => {
    if (!type || !id) return;
    setIsProcessing(true);
    try {
      await verifikasiService.verify(apiType, id, { status: "APPROVE" });
      setIsApproveModalOpen(false);
      customToast.success("Disetujui!", {
        description: "Pengajuan berhasil disetujui.",
      });
      router.push(`/verification/${type}`);
    } catch (error: any) {
      console.error("Gagal menyetujui:", error);
      customToast.error("Gagal Disetujui", {
        description: error?.response?.data?.message || "Terjadi kesalahan saat menyetujui pengajuan.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const submitReject = async (payload: {
    alasan_penolakan_id?: number;
    alasan_penolakan?: string;
  }) => {
    if (!type || !id) return;
    setIsProcessing(true);
    try {
      await verifikasiService.verify(apiType, id, {
        status: "REJECT",
        ...payload,
      });
      setIsRejectModalOpen(false);
      customToast.warning("Ditolak", {
        description: "Pengajuan telah ditolak.",
      });
      router.push(`/verification/${type}`);
    } catch (error: any) {
      console.error("Gagal menolak:", error);
      customToast.error("Gagal Menolak", {
        description: error?.response?.data?.message || "Terjadi kesalahan saat menolak pengajuan.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Normalisasi data mentah dari endpoint admin agar kompatibel dengan DetailView.
  const detail = useMemo(
    () => (data ? normalizeSubmissionDetail(data) : null),
    [data],
  );

  const submissionName = detail?.lomba || detail?.nama || "Pengajuan";

  return (
    <div className='space-y-6 p-6 max-w-5xl mx-auto animate-in fade-in duration-500'>
      <BackLink href={`/verification/${type || "prestasi"}`} label='Kembali ke Daftar Pengajuan' />

      <PageHeader
        title='Review Pengajuan'
        description='Periksa detail informasi dan dokumen bukti sebelum melakukan verifikasi.'
      />

      {isLoading ? (
        <div className='space-y-6'>
          {/* Skeleton kartu detail */}
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
          Data pengajuan tidak ditemukan atau telah dihapus.
        </div>
      ) : (
        <>
          <SubmissionDetailBody detail={detail} type={apiType} audience='admin' />

          {detail.status_internal === "PENDING" && (
            <div className='pt-4 border-t border-slate-200'>
              <VerificationActions
                submissionId={id}
                onApprove={() => setIsApproveModalOpen(true)}
                onReject={() => setIsRejectModalOpen(true)}
                isProcessing={isProcessing}
              />
            </div>
          )}
        </>
      )}

      {/* Modal hanya dirender jika data sudah siap */}
      {detail && (
        <>
          <ApproveSubmissionModal
            isOpen={isApproveModalOpen}
            onClose={() => setIsApproveModalOpen(false)}
            title={submissionName}
            onApprove={submitApprove}
            isProcessing={isProcessing}
          />

          <RejectSubmissionModal
            isOpen={isRejectModalOpen}
            onClose={() => setIsRejectModalOpen(false)}
            title={submissionName}
            onReject={submitReject}
            isProcessing={isProcessing}
          />
        </>
      )}
    </div>
  );
}
