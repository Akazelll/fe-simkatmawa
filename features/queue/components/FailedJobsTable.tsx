"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Tambahan import Card
import { RefreshCw, Trash2 } from "lucide-react";
import { FailedQueueJob } from "@/lib/queue/types";
import { formatDateTime } from "@/lib/utils/dateFormat";
import { SubmissionTypeBadge } from "../../shared/components/SubmissionTypeBadge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  jobs: FailedQueueJob[];
  onRetry: (id: string) => void;
  onDelete: (id: string) => void;
  onRetryAll: () => void;
}
function FailedJobRow({
  job,
  onRetry,
  onDelete,
}: {
  job: FailedQueueJob;
  onRetry: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <TableRow className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'>
      <TableCell className='pl-5'>
        <SubmissionTypeBadge type={job.type} />
      </TableCell>
      <TableCell className='text-sm font-semibold text-slate-800'>
        {job.title}
      </TableCell>
      <TableCell className='text-xs font-medium text-slate-500'>
        {formatDateTime(job.failedAt)}
      </TableCell>
      <TableCell>
        <span className='inline-flex items-center rounded-md border border-red-200 bg-red-50 px-2.5 py-0.5 text-[11px] font-medium text-red-600'>
          {job.reason}
        </span>
      </TableCell>
      <TableCell className='pr-5 text-right space-x-1.5 whitespace-nowrap'>
        <Button
          size='icon'
          variant='outline'
          className='h-8 w-8 rounded-lg border-blue-200 bg-blue-50 text-blue-600 transition-all hover:bg-blue-100 hover:text-blue-700'
          onClick={() => {
            onRetry(job.id);
            toast.success("Job berhasil dimasukkan kembali ke antrean");
          }}
        >
          <RefreshCw className='h-3.5 w-3.5' />
        </Button>
        <Button
          size='icon'
          variant='outline'
          className='h-8 w-8 rounded-lg border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100 hover:text-red-700'
          onClick={() => setOpenDelete(true)}
        >
          <Trash2 className='h-3.5 w-3.5' />
        </Button>
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogContent className='rounded-2xl'>
            <DialogHeader>
              <DialogTitle className='text-red-600'>
                Hapus Log Kegagalan?
              </DialogTitle>
              <DialogDescription>
                Tindakan ini akan menghapus rekaman error job ini dari daftar
                secara permanen.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant='outline'
                className='rounded-xl'
                onClick={() => setOpenDelete(false)}
              >
                Batal
              </Button>
              <Button
                variant='destructive'
                className='rounded-xl'
                onClick={() => {
                  setOpenDelete(false);
                  onDelete(job.id);
                  toast.success("Failed job berhasil dihapus");
                }}
              >
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

export function FailedJobsTable({
  jobs,
  onRetry,
  onDelete,
  onRetryAll,
}: Props) {
  const [openRetryAll, setOpenRetryAll] = useState(false);

  return (
    <div className='space-y-4'>
      {jobs.length > 0 && (
        <div className='flex justify-end'>
          <Button
            size='sm'
            className='flex items-center gap-2 rounded-xl bg-[#1a2b5e] font-bold text-white shadow-sm hover:bg-[#111d42] transition-all'
            onClick={() => setOpenRetryAll(true)}
          >
            <RefreshCw className='h-3.5 w-3.5' /> Coba Ulang Semua
          </Button>
          <Dialog open={openRetryAll} onOpenChange={setOpenRetryAll}>
            <DialogContent className='rounded-2xl'>
              <DialogHeader>
                <DialogTitle className='text-[#1a2b5e]'>
                  Coba Ulang Semua Antrean Gagal?
                </DialogTitle>
                <DialogDescription>
                  Semua job gagal akan dimasukkan kembali ke antrean utama.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant='outline'
                  className='rounded-xl'
                  onClick={() => setOpenRetryAll(false)}
                >
                  Batal
                </Button>
                <Button
                  className='rounded-xl bg-[#1a2b5e] text-white hover:bg-[#111d42]'
                  onClick={() => {
                    setOpenRetryAll(false);
                    onRetryAll();
                    toast.success(
                      "Semua failed jobs berhasil dimasukkan kembali ke antrean",
                    );
                  }}
                >
                  Konfirmasi
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Tabel Utama Dibungkus Card */}
      <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
        <Table>
          <TableHeader className='bg-slate-50 border-b border-slate-200'>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='w-[120px] pl-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Tipe
              </TableHead>
              <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Nama Kegiatan
              </TableHead>
              <TableHead className='w-[180px] text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Gagal Pada
              </TableHead>
              <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Penyebab
              </TableHead>
              <TableHead className='w-[120px] pr-5 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='h-24 text-center text-sm font-medium text-slate-500'
                >
                  Bersih! Tidak ada job sinkronisasi yang gagal.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => (
                <FailedJobRow
                  key={job.id}
                  job={job}
                  onRetry={onRetry}
                  onDelete={onDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
