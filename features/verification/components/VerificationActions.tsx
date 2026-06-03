"use client";

import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VerificationActionsProps {
  submissionId: string | number;
  onApprove: (id: string | number) => void;
  onReject: (id: string | number) => void;
  isProcessing?: boolean;
}

export function VerificationActions({
  submissionId,
  onApprove,
  onReject,
  isProcessing = false,
}: VerificationActionsProps) {
  return (
    <div className='flex items-center justify-end gap-3'>
      <Button
        onClick={() => onApprove(submissionId)}
        disabled={isProcessing}
        className='h-11 px-6 gap-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white shadow-sm transition-all duration-150 hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0'
      >
        {isProcessing ? (
          <Loader2 className='animate-spin' size={18} />
        ) : (
          <CheckCircle2 size={18} />
        )}
        Approve
      </Button>
      <Button
        onClick={() => onReject(submissionId)}
        disabled={isProcessing}
        className='h-11 px-6 gap-2 rounded-xl text-sm font-semibold bg-rose-500 text-white shadow-sm transition-all duration-150 hover:bg-rose-600 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-rose-500/30 focus-visible:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0'
      >
        <XCircle size={18} />
        Reject
      </Button>
    </div>
  );
}
