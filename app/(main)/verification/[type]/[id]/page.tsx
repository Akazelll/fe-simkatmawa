"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { BackLink } from "@/features/shared/components/BackLink";
import { SubmissionInfoCard } from "@/features/verification/components/SubmissionInfoCard";
import { DocumentsCard } from "@/features/verification/components/DocumentsCard";
import { VerificationActions } from "@/features/verification/components/VerificationActions";
import { RejectSubmissionModal } from "@/features/verification/components/RejectSubmissionModal";
import { ApproveSubmissionModal } from "@/features/verification/components/ApproveSubmissionModal";
import { verifikasiService } from "@/features/verification/services/verifikasiService";
import { TipeKegiatan } from "@/features/verification/types";

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
      router.push(`/verification`);
    } catch (error) {
      console.error("Gagal menyetujui:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const submitReject = async (reason: string) => {
    if (!type || !id) return;
    setIsProcessing(true);
    try {
      await verifikasiService.verify(apiType, id, {
        status: "REJECT",
        alasan_penolakan: reason,
      });
      setIsRejectModalOpen(false);
      router.push(`/verification`);
    } catch (error) {
      console.error("Gagal menolak:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <div className='p-6'>Memuat data...</div>;
  if (!data) return <div className='p-6'>Data tidak ditemukan.</div>;

  const mappedSubmission = {
    name: data.lomba || data.nama || "Tanpa Nama",
    status: data.status_internal,
    category: data.kategori || "Tidak ada kategori",
    level: data.level || "-",
    organizer: data.penyelenggara || "-",
    date: new Date(data.created_at),
    submittedBy: data.mahasiswa?.[0]?.nama || "-",
    nim: data.mahasiswa?.[0]?.nim || "-",
    rejectionReason: data.alasan_penolakan,
  };

  const mappedDocuments = [];
  if (data.url_sertifikat)
    mappedDocuments.push({
      id: 1,
      title: "Sertifikat",
      url: data.url_sertifikat,
    });
  if (data.url_dokumen_undangan)
    mappedDocuments.push({
      id: 2,
      title: "Dokumen Undangan",
      url: data.url_dokumen_undangan,
    });
  if (data.url_peserta)
    mappedDocuments.push({
      id: 3,
      title: "Bukti Peserta",
      url: data.url_peserta,
    });

  return (
    <div className='space-y-6 p-6 max-w-5xl mx-auto animate-in fade-in duration-500'>
      <BackLink href={`/verification`} label='Kembali ke Antrean' />

      <PageHeader
        title='Review Pengajuan'
        description='Periksa detail informasi dan dokumen bukti sebelum melakukan verifikasi.'
      />

      <SubmissionInfoCard submission={mappedSubmission} />

      {mappedDocuments.length > 0 && (
        <DocumentsCard documents={mappedDocuments} />
      )}

      {data.status_internal === "PENDING" && (
        <div className='pt-4 border-t border-slate-200'>
          <VerificationActions
            submissionId={id}
            onApprove={() => setIsApproveModalOpen(true)}
            onReject={() => setIsRejectModalOpen(true)}
            isProcessing={isProcessing}
          />
        </div>
      )}

      <ApproveSubmissionModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        title={mappedSubmission.name}
        onApprove={submitApprove}
        isProcessing={isProcessing}
      />

      <RejectSubmissionModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title={mappedSubmission.name}
        onReject={submitReject}
        isProcessing={isProcessing}
      />
    </div>
  );
}
