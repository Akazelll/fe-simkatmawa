"use client";

import { CheckCircle2, Inbox, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubmissionStatusBadge } from "@/features/shared/components/SubmissionStatusBadge";
import type { Submission } from "@/features/submission/types/types";

interface VerificationTableProps {
  data: Submission[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function VerificationTable({
  data,
  onApprove,
  onReject,
}: VerificationTableProps) {
  return (
    <Card className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader className='border-b border-slate-200 bg-slate-50'>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='pl-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Nama Pengajuan
              </TableHead>
              <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Mahasiswa
              </TableHead>
              <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Tanggal
              </TableHead>
              <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Status
              </TableHead>
              <TableHead className='pr-5 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow className='hover:bg-transparent'>
                <TableCell colSpan={5} className='px-4 py-10 sm:py-12 md:py-16'>
                  <div className='mx-auto flex max-w-sm flex-col items-center justify-center text-center'>
                    <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 sm:h-12 sm:w-12 sm:rounded-2xl'>
                      <Inbox className='h-5 w-5 sm:h-6 sm:w-6' />
                    </div>

                    <h3 className='text-xs font-bold text-slate-700 sm:text-sm'>
                      Tidak ada antrean verifikasi
                    </h3>

                    <p className='mt-1 max-w-xs text-[11px] leading-relaxed text-slate-500 sm:text-xs'>
                      Saat ini belum ada submission yang menunggu proses
                      verifikasi.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((submission) => (
                <TableRow
                  key={submission.id}
                  className='border-b border-slate-100 transition-colors hover:bg-slate-50/70'
                >
                  <TableCell className='pl-5'>
                    <div className='font-semibold text-slate-800'>
                      {submission.title}
                    </div>
                    <div className='mt-0.5 text-xs capitalize text-slate-400'>
                      {submission.type}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className='font-semibold text-slate-700'>
                      {submission.studentName}
                    </div>
                    <div className='text-xs text-slate-400'>
                      {submission.studentNim}
                    </div>
                  </TableCell>

                  <TableCell className='text-sm font-medium text-slate-500'>
                    {new Date(submission.submittedAt).toLocaleDateString(
                      "id-ID",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </TableCell>

                  <TableCell>
                    <SubmissionStatusBadge submission={submission} />
                  </TableCell>

                  <TableCell className='pr-5'>
                    <div className='flex items-center justify-end gap-2'>
                      <Button
                        type='button'
                        size='sm'
                        className='h-8 rounded-lg bg-[#1a2b5e] px-3 text-xs font-bold text-white hover:bg-[#111d42]'
                        onClick={() => onApprove(submission.id)}
                      >
                        <CheckCircle2 className='mr-1.5 h-3.5 w-3.5' />
                        Approve
                      </Button>

                      <Button
                        type='button'
                        size='sm'
                        variant='destructive'
                        className='h-8 rounded-lg px-3 text-xs font-bold'
                        onClick={() => onReject(submission.id)}
                      >
                        <XCircle className='mr-1.5 h-3.5 w-3.5' />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
