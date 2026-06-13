"use client";

import { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { RejectionReasonButton } from "@/features/shared/components/RejectionReasonButton";
import { DeleteSubmissionDialog } from "@/features/shared/components/DeleteSubmissionDialog";
import { sertifikasiService } from "../services/sertifikasiService";
import { Certificate } from "../types";

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";

const CELL_BASE = "py-4 align-top text-sm text-slate-600";

interface CertificateTableProps {
  data: Certificate[];
  onChanged?: () => void;
}

export function CertificateTable({ data, onChanged }: CertificateTableProps) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await sertifikasiService.deleteSertifikasi(deleteTarget.id);
      setDeleteTarget(null);
      onChanged?.();
    } catch {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white p-0'>
      <div className='flex flex-col gap-3 p-6 border-b border-slate-100 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-base font-bold text-slate-800'>
            Daftar Sertifikasi
          </h2>
          <p className='text-sm text-slate-500'>
            Menampilkan data sesuai cakupan perguruan tinggi pengguna untuk
            semua tahun.
          </p>
        </div>

        <Button
          onClick={() => router.push("/certificate/create")}
          className='gap-2 rounded-xl bg-[#0F4C81] hover:bg-[#0c3e6b] text-white font-bold text-sm px-5 h-10 shadow-sm shrink-0 self-start sm:self-auto'
        >
          <Plus size={16} strokeWidth={3} />
          Tambah Data
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className='border-slate-100 hover:bg-transparent bg-slate-50/50'>
            <TableHead className={`${HEAD_CLASS} pl-6 w-24`}>ID</TableHead>
            <TableHead className={`${HEAD_CLASS} min-w-80`}>
              Nama Sertifikasi
            </TableHead>
            <TableHead className={`${HEAD_CLASS} min-w-48`}>
              Penyelenggara
            </TableHead>
            <TableHead className={`${HEAD_CLASS} min-w-28`}>Level</TableHead>
            <TableHead className={`${HEAD_CLASS} w-20 text-center`}>
              Tahun
            </TableHead>
            <TableHead className={`${HEAD_CLASS} w-28`}>Status</TableHead>
            <TableHead className={`${HEAD_CLASS} pr-6 text-right w-24`}>
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow
                key={row.id}
                className='border-slate-100 hover:bg-slate-50/70 transition-colors'
              >
                <TableCell
                  className={`${CELL_BASE} pl-6 font-semibold text-slate-700`}
                >
                  #{row.id}
                </TableCell>
                <TableCell className={`${CELL_BASE} whitespace-normal`}>
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-slate-800 leading-snug'>
                      {row.nama}
                    </span>
                    <a
                      href={row.url_sertifikat}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-xs text-sky-600 hover:underline break-all line-clamp-1'
                    >
                      {row.url_sertifikat}
                    </a>
                  </div>
                </TableCell>
                <TableCell className={`${CELL_BASE} whitespace-normal`}>
                  {row.penyelenggara}
                </TableCell>
                <TableCell className={CELL_BASE}>{row.level}</TableCell>
                <TableCell className={`${CELL_BASE} text-center`}>
                  {row.tahun}
                </TableCell>
                <TableCell className={CELL_BASE}>
                  <div className='flex flex-col items-start gap-1.5'>
                    <StatusBadge status={row.status_internal} />
                    {row.status_internal === "REJECTED" &&
                      row.alasan_penolakan && (
                        <RejectionReasonButton reason={row.alasan_penolakan} />
                      )}
                  </div>
                </TableCell>
                <TableCell className={`${CELL_BASE} pr-6`}>
                  <div className='flex items-center justify-end gap-2'>
                    <button
                      onClick={() => router.push(`/certificate/${row.id}`)}
                      className='p-2 rounded-lg text-sky-500 bg-sky-50 hover:bg-sky-100 transition-colors'
                      title='Lihat Detail'
                    >
                      <Eye size={16} />
                    </button>
                    {row.can_edit && (
                      <button
                        onClick={() =>
                          router.push(`/certificate/${row.id}/edit`)
                        }
                        className='p-2 rounded-lg text-amber-500 bg-amber-50 hover:bg-amber-100 transition-colors'
                        title='Edit Pengajuan'
                      >
                        <Pencil size={16} />
                      </button>
                    )}
                    {row.can_delete && (
                      <button
                        onClick={() => setDeleteTarget(row)}
                        className='p-2 rounded-lg text-rose-500 bg-rose-50 hover:bg-rose-100 transition-colors'
                        title='Hapus Pengajuan'
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <DeleteSubmissionDialog
        open={!!deleteTarget}
        title={deleteTarget?.nama ?? ""}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </Card>
  );
}
