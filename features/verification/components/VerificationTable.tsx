"use client";

import { Eye, Inbox } from "lucide-react";
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
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { useRouter } from "next/navigation";

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-top text-sm text-slate-600";

interface VerificationTableProps {
  data: any[]; // Bisa diganti dengan VerificationItem
  isLoading?: boolean;
}

export function VerificationTable({ data, isLoading }: VerificationTableProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <Card className='border-slate-200 shadow-sm rounded-2xl p-12 flex justify-center items-center bg-white'>
        <div className='animate-pulse flex flex-col items-center gap-2'>
          <div className='w-8 h-8 border-4 border-[#0F4C81] border-t-transparent rounded-full animate-spin'></div>
          <p className='text-sm text-slate-500 font-medium'>
            Memuat antrean...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0'>
      <Table>
        <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
          <TableRow className='hover:bg-transparent'>
            <TableHead className={`${HEAD_CLASS} pl-6 w-[25%]`}>
              Nama Pengajuan
            </TableHead>
            <TableHead className={`${HEAD_CLASS} w-[25%]`}>Mahasiswa</TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>Tanggal</TableHead>
            <TableHead className={`${HEAD_CLASS} w-[15%]`}>Status</TableHead>
            <TableHead className={`${HEAD_CLASS} pr-6 w-[20%] text-right`}>
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className='h-32 text-center text-sm font-medium text-slate-500'
              >
                <div className='flex flex-col items-center justify-center gap-2'>
                  <Inbox className='h-8 w-8 opacity-50' />
                  <p>Tidak ada antrean verifikasi.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((submission) => (
              <TableRow
                key={submission.id}
                className='border-b border-slate-100 transition-colors hover:bg-slate-50/70'
              >
                <TableCell
                  className={`${CELL_BASE} pl-6 whitespace-normal break-words`}
                >
                  <div className='font-semibold text-slate-800 leading-snug line-clamp-2'>
                    {submission.nama_kegiatan ||
                      submission.lomba ||
                      submission.nama}
                  </div>
                </TableCell>

                <TableCell className={CELL_BASE}>
                  <div className='font-semibold text-slate-700'>
                    {submission.mahasiswa_nama ||
                      submission.mahasiswa?.[0]?.nama}
                  </div>
                  <div className='text-xs text-slate-400'>
                    {submission.mahasiswa_nim || submission.mahasiswa?.[0]?.nim}
                  </div>
                </TableCell>

                <TableCell
                  className={`${CELL_BASE} whitespace-nowrap font-medium text-slate-500`}
                >
                  {new Date(
                    submission.tanggal_pengajuan || submission.created_at,
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell className={CELL_BASE}>
                  <StatusBadge status={submission.status_internal} />
                </TableCell>

                <TableCell className={`${CELL_BASE} pr-6 text-right`}>
                  <div className='flex items-center justify-end'>
                    <Button
                      type='button'
                      size='sm'
                      variant='secondary'
                      className='h-8 rounded-lg bg-sky-50 px-3 text-xs font-bold text-sky-600 hover:bg-sky-100'
                      onClick={() => {
                        const rawType =
                          submission.tipe_kegiatan ||
                          submission.type ||
                          "prestasi";
                        const urlType =
                          rawType === "sertifikasi" ? "sertifikat" : rawType;
                        router.push(
                          `/verification/${urlType}/${submission.id}`,
                        );
                      }}
                    >
                      <Eye className='mr-1.5 h-3.5 w-3.5' />
                      Review
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
