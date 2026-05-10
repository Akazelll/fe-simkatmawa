"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface VerificationActionsProps {
  submissionId: string;
}

export function VerificationActions({ submissionId }: VerificationActionsProps) {
  const router = useRouter();

  const handleApprove = () => {
    console.log("Approve submission:", submissionId);
    router.push("/verification");
  };

  const handleReject = () => {
    console.log("Reject submission:", submissionId);
    router.push("/verification");
  };

  return (
    <div className='flex items-center justify-end gap-3'>
      <Button
        onClick={handleApprove}
        className='h-11 px-6 gap-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white shadow-sm transition-all duration-150 hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:ring-offset-2'
      >
        <CheckCircle2 size={18} />
        Approve
      </Button>
      <Button
        onClick={handleReject}
        className='h-11 px-6 gap-2 rounded-xl text-sm font-semibold bg-rose-500 text-white shadow-sm transition-all duration-150 hover:bg-rose-600 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:ring-offset-2'
      >
        <XCircle size={18} />
        Reject
      </Button>
    </div>
  );
}
