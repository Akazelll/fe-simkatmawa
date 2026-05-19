"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Submission } from "@/lib/submission/submission-types";
import { canShowRejectionReason } from "@/lib/submission/submission-rules";

export function SubmissionStatusBadge({
  submission,
}: {
  submission: Submission;
}) {
  const [open, setOpen] = useState(false);
  const isRejected = submission.status === "REJECTED";

  const getVariant = () => {
    switch (submission.status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED_UNSYNCED":
        return "bg-blue-100 text-blue-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "SYNC_SUCCESS":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='flex flex-col items-start gap-1'>
      <Badge
        className={`${getVariant()} hover:${getVariant()} border-none shadow-none`}
      >
        {submission.status}
      </Badge>

      {canShowRejectionReason(submission) && (
        <>
          <button
            onClick={() => setOpen(true)}
            className='text-[10px] text-red-600 font-semibold hover:underline cursor-pointer'
          >
            Lihat alasan penolakan
          </button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='text-red-600'>
                  Alasan Penolakan
                </DialogTitle>
                <DialogDescription>
                  Informasi penolakan pengajuan.
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4 text-sm mt-2'>
                <div className='grid grid-cols-3 gap-2 border-b pb-2'>
                  <span className='font-semibold text-slate-500'>
                    Ditolak oleh
                  </span>
                  <span className='col-span-2 font-medium'>
                    {submission.rejectedBy}
                  </span>
                  <span className='font-semibold text-slate-500'>Tanggal</span>
                  <span className='col-span-2 font-medium'>
                    {submission.rejectedAt
                      ? new Date(submission.rejectedAt).toLocaleString("id-ID")
                      : "-"}
                  </span>
                </div>
                <div>
                  <span className='font-semibold text-slate-500 block mb-1'>
                    Komentar / Alasan:
                  </span>
                  <div className='p-3 bg-red-50 text-red-900 rounded-md border border-red-100'>
                    {submission.rejectionReason}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
