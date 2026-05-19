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
import { RefreshCw, Trash2 } from "lucide-react";
import { FailedQueueJob } from "@/lib/queue/queue-types";
import { formatDateTime } from "@/lib/utils/date-format";
import { SubmissionTypeBadge } from "./submission-type-badge";
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

// Sub-komponen untuk memisahkan state Modal per baris
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
    <tr className='border-b hover:bg-slate-50/50 transition-colors text-sm'>
      <TableCell className='p-4'>
        <SubmissionTypeBadge type={job.type} />
      </TableCell>
      <TableCell className='p-4 font-semibold text-slate-700'>
        {job.title}
      </TableCell>
      <TableCell className='p-4 text-slate-500 text-xs font-medium'>
        {formatDateTime(job.failedAt)}
      </TableCell>
      <TableCell className='p-4'>
        <span className='text-red-600 font-medium text-xs bg-red-50 px-2 py-1 rounded-md border border-red-100'>
          {job.reason}
        </span>
      </TableCell>
      <TableCell className='p-4 text-right space-x-1.5 whitespace-nowrap'>
        {/* Tombol Retry per item */}
        <Button
          size='icon'
          variant='outline'
          className='h-8 w-8 rounded-lg text-blue-600 border-blue-100 hover:bg-blue-50'
          onClick={() => {
            onRetry(job.id);
            toast.success("Job berhasil dimasukkan kembali ke antrean");
          }}
        >
          <RefreshCw className='w-3.5 h-3.5' />
        </Button>

        {/* Tombol Delete per item yang memicu Dialog */}
        <Button
          size='icon'
          variant='outline'
          className='h-8 w-8 rounded-lg text-red-600 border-red-100 hover:bg-red-50'
          onClick={() => setOpenDelete(true)}
        >
          <Trash2 className='w-3.5 h-3.5' />
        </Button>

        {/* Modal Konfirmasi Delete */}
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
    </tr>
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
      {/* Tombol Bulk Action */}
      {jobs.length > 0 && (
        <div className='flex justify-end'>
          <Button
            size='sm'
            className='bg-gradient-to-r from-[#1a2b5e] to-[#2563eb] font-bold rounded-xl shadow-sm text-white flex items-center gap-2'
            onClick={() => setOpenRetryAll(true)}
          >
            <RefreshCw className='w-3.5 h-3.5' /> Coba Ulang Semua
          </Button>

          {/* Modal Konfirmasi Bulk Retry */}
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
                  className='bg-blue-600 hover:bg-blue-700 rounded-xl text-white'
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

      {/* Tabel */}
      <div className='border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-sm'>
        <Table>
          <TableHeader className='bg-slate-50/70'>
            <TableRow>
              <TableHead className='w-[100px] font-bold text-slate-500'>
                Tipe
              </TableHead>
              <TableHead className='font-bold text-slate-500'>
                Nama Kegiatan
              </TableHead>
              <TableHead className='font-bold text-slate-500'>
                Gagal Pada
              </TableHead>
              <TableHead className='font-bold text-slate-500'>
                Penyebab
              </TableHead>
              <TableHead className='w-[120px] text-right font-bold text-slate-500'>
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className='text-center py-10 text-slate-400 font-medium'
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
      </div>
    </div>
  );
}
