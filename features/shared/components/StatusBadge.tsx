"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  CloudOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface StatusBadgeProps {
  status: string;
  className?: string;
  // Props opsional khusus untuk menampilkan alasan penolakan
  rejectionReason?: string | null;
  rejectedBy?: string | null;
  rejectedAt?: string | null;
}

export function StatusBadge({
  status,
  className,
  rejectionReason,
  rejectedBy,
  rejectedAt,
}: StatusBadgeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Normalisasi ke uppercase agar cocok dengan response API Backend maupun Dummy
  const normalizedStatus = status?.toUpperCase() || "UNKNOWN";

  let config = {
    label: "Unknown",
    icon: AlertCircle,
    colorClass: "bg-slate-50 text-slate-600 border-slate-200",
  };

  switch (normalizedStatus) {
    case "PENDING":
      config = {
        label: "Menunggu",
        icon: Clock,
        colorClass: "bg-amber-50 text-amber-600 border-amber-200",
      };
      break;
    case "REJECTED":
      config = {
        label: "Ditolak",
        icon: XCircle,
        colorClass: "bg-red-50 text-red-600 border-red-200",
      };
      break;
    case "APPROVED_UNSYNCED":
      config = {
        label: "Disetujui",
        icon: CheckCircle2,
        colorClass: "bg-blue-50 text-blue-600 border-blue-200",
      };
      break;
    case "SYNC_SUCCESS":
      config = {
        label: "Tersinkronisasi",
        icon: CheckCircle2,
        colorClass: "bg-emerald-50 text-emerald-600 border-emerald-200",
      };
      break;
    case "SYNC_FAILED":
      config = {
        label: "Gagal Sync",
        icon: CloudOff,
        colorClass: "bg-orange-50 text-orange-600 border-orange-200",
      };
      break;
  }

  const Icon = config.icon;
  const isRejectedWithReason =
    normalizedStatus === "REJECTED" && !!rejectionReason;

  return (
    <div className='flex flex-col items-start gap-1'>
      {/* BADGE UTAMA */}
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border",
          config.colorClass,
          className,
        )}
      >
        <Icon className='w-3.5 h-3.5 stroke-[2.5]' />
        <span>{config.label}</span>
      </div>

      {/* TOMBOL & MODAL ALASAN PENOLAKAN */}
      {isRejectedWithReason && (
        <>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            className='text-[10px] text-red-600 font-semibold hover:underline cursor-pointer'
          >
            Lihat alasan penolakan
          </button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                    {rejectedBy || "Sistem / Admin"}
                  </span>
                  <span className='font-semibold text-slate-500'>Tanggal</span>
                  <span className='col-span-2 font-medium'>
                    {rejectedAt
                      ? new Date(rejectedAt).toLocaleString("id-ID")
                      : "-"}
                  </span>
                </div>
                <div>
                  <span className='font-semibold text-slate-500 block mb-1'>
                    Komentar / Alasan:
                  </span>
                  <div className='p-3 bg-red-50 text-red-900 rounded-md border border-red-100'>
                    {rejectionReason}
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
