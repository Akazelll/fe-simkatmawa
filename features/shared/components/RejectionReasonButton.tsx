"use client";

import { Info, CircleAlert } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface RejectionReasonButtonProps {
  reason: string;
}

export function RejectionReasonButton({ reason }: RejectionReasonButtonProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type='button'
            className='inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-100 transition-colors'
          />
        }
      >
        <Info size={11} />
        Lihat Alasan
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className='flex items-center gap-2.5'>
            <div className='flex items-center justify-center rounded-lg bg-rose-50 p-2'>
              <CircleAlert size={18} className='text-rose-600' />
            </div>
            <DialogTitle>Alasan Penolakan</DialogTitle>
          </div>
          <DialogDescription className='pt-1 leading-relaxed text-slate-600'>
            {reason}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
