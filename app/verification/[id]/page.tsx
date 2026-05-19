"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { BackLink } from "@/features/shared/components/BackLink";
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
      <BackLink href='/verification' />

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
