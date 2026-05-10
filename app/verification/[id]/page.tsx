"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { SubmissionInfoCard } from "@/features/verification/components/SubmissionInfoCard";
import { DocumentsCard } from "@/features/verification/components/DocumentsCard";
import { VerificationActions } from "@/features/verification/components/VerificationActions";
import { DEFAULT_VERIFICATIONS } from "@/features/verification/constants";

interface VerificationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function VerificationDetailPage({
  params,
}: VerificationDetailPageProps) {
  const { id } = use(params);
  const submission = DEFAULT_VERIFICATIONS.find((s) => s.id === id);

  if (!submission) notFound();

  return (
    <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
      <Link
        href='/verification'
        className='inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors w-fit'
      >
        <ArrowLeft size={16} />
        Kembali
      </Link>

      <PageHeader
        title='Detail Verifikasi'
        description='Review dan verifikasi submission'
      />

      <SubmissionInfoCard submission={submission} />
      <DocumentsCard documents={submission.documents} />
      <VerificationActions submissionId={submission.id} />
    </div>
  );
}
