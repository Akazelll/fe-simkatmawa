"use client";

import { Eye, Inbox, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
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
import type { SkeletonColumn } from "@/features/shared/components/TableSkeleton";
import { TipeKegiatan, PengajuanItem, VerifikasiQueryParams } from "../types";

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-top text-sm text-slate-600";

export const VERIFICATION_TABLE_COLUMNS: SkeletonColumn[] = [
  { width: "w-[25%]" }, // Nama Kegiatan
  { width: "w-[20%]" }, // Mahasiswa
  { width: "w-[12%]" }, // Level
  { width: "w-[12%]" }, // Kategori / Jenis
  { width: "w-[10%]" }, // Tahun
  { width: "w-[11%]", pill: true }, // Status
  { width: "w-[10%]" }, // Tgl Verifikasi
  { width: "w-[10%]", align: "right", cell: "h-8 w-20 rounded-lg" }, // Aksi
];

interface VerificationTableProps {
  tipeKegiatan: TipeKegiatan;
  data: PengajuanItem[];
  isLoading?: boolean;
  params?: VerifikasiQueryParams;
  updateParams?: (newParams: Partial<VerifikasiQueryParams>) => void;
}

function getYearDisplay(item: PengajuanItem) {
  if (item.tahun) return String(item.tahun);
  if (item.tgl_sertifikat) {
    try {
      const year = new Date(item.tgl_sertifikat).getFullYear();
      if (!isNaN(year)) return String(year);
      return item.tgl_sertifikat.slice(0, 4);
    } catch {
      return item.tgl_sertifikat.slice(0, 4);
    }
  }
  return "-";
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function SortableHead({
  label,
  sortKey,
  currentSortBy,
  currentSortDir,
  onSort,
  className = "",
}: {
  label: string;
  sortKey?: string;
  currentSortBy?: string;
  currentSortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
  className?: string;
}) {
  if (!sortKey || !onSort) {
    return <TableHead className={`${HEAD_CLASS} ${className}`}>{label}</TableHead>;
  }

  const isActive = currentSortBy === sortKey;

  const handleClick = () => {
    if (!isActive) {
      onSort(sortKey);
    } else if (currentSortDir === "asc") {
      onSort(sortKey);
    } else {
      onSort(sortKey);
    }
  };

  return (
    <TableHead className={`${HEAD_CLASS} ${className}`}>
      <button
        type='button'
        onClick={handleClick}
        className='flex items-center gap-1.5 font-bold text-[11px] tracking-wide uppercase text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group text-left'
      >
        <span>{label}</span>
        {isActive ? (
          currentSortDir === "asc" ? (
            <ArrowUp size={13} className='text-[#0F4C81] shrink-0 font-bold' />
          ) : (
            <ArrowDown size={13} className='text-[#0F4C81] shrink-0 font-bold' />
          )
        ) : (
          <ArrowUpDown size={12} className='text-slate-300 group-hover:text-slate-500 shrink-0' />
        )}
      </button>
    </TableHead>
  );
}

export function VerificationTable({
  tipeKegiatan,
  data,
  isLoading,
  params,
  updateParams,
}: VerificationTableProps) {
  const router = useRouter();

  const handleSort = (key: string) => {
    if (!updateParams) return;
    if (params?.sort_by !== key) {
      updateParams({ sort_by: key, sort_dir: "asc" });
    } else if (params?.sort_dir === "asc") {
      updateParams({ sort_by: key, sort_dir: "desc" });
    } else {
      updateParams({ sort_by: undefined, sort_dir: undefined });
    }
  };

  const nameSortKey = tipeKegiatan === "prestasi" ? "lomba" : "nama";

  if (isLoading) {
    return (
      <Card className='border-slate-200 shadow-sm rounded-2xl p-12 flex justify-center items-center bg-white'>
        <div className='animate-pulse flex flex-col items-center gap-2'>
          <div className='w-8 h-8 border-4 border-[#0F4C81] border-t-transparent rounded-full animate-spin'></div>
          <p className='text-sm text-slate-500 font-medium'>
            Memuat daftar pengajuan...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0 w-full'>
      <div className='w-full overflow-x-auto'>
        <Table className='w-full'>
          <TableHeader className='bg-slate-50/70 border-b border-slate-200/80'>
            <TableRow className='hover:bg-transparent'>
              <SortableHead
                label='Nama Kegiatan'
                sortKey={nameSortKey}
                currentSortBy={params?.sort_by}
                currentSortDir={params?.sort_dir}
                onSort={handleSort}
                className='pl-6'
              />
              <TableHead className={HEAD_CLASS}>Mahasiswa</TableHead>
              <SortableHead
                label='Level'
                sortKey='level'
                currentSortBy={params?.sort_by}
                currentSortDir={params?.sort_dir}
                onSort={handleSort}
              />
              {tipeKegiatan === "prestasi" && (
                <SortableHead
                  label='Kategori'
                  sortKey='kategori'
                  currentSortBy={params?.sort_by}
                  currentSortDir={params?.sort_dir}
                  onSort={handleSort}
                />
              )}
              {tipeKegiatan === "rekognisi" && (
                <SortableHead
                  label='Jenis'
                  sortKey='jenis'
                  currentSortBy={params?.sort_by}
                  currentSortDir={params?.sort_dir}
                  onSort={handleSort}
                />
              )}
              {tipeKegiatan === "prestasi" && (
                <SortableHead
                  label='Peringkat'
                  sortKey='peringkat'
                  currentSortBy={params?.sort_by}
                  currentSortDir={params?.sort_dir}
                  onSort={handleSort}
                />
              )}
              <SortableHead
                label='Tahun'
                sortKey='tgl_sertifikat'
                currentSortBy={params?.sort_by}
                currentSortDir={params?.sort_dir}
                onSort={handleSort}
              />
              <SortableHead
                label='Status'
                sortKey='status_internal'
                currentSortBy={params?.sort_by}
                currentSortDir={params?.sort_dir}
                onSort={handleSort}
              />
              <SortableHead
                label='Tgl Verifikasi'
                sortKey='approved_at'
                currentSortBy={params?.sort_by}
                currentSortDir={params?.sort_dir}
                onSort={handleSort}
              />
              <TableHead className={`${HEAD_CLASS} pr-6 text-right`}>
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className='h-36 text-center text-sm font-medium text-slate-500'
                >
                  <div className='flex flex-col items-center justify-center gap-2 py-4'>
                    <Inbox className='h-8 w-8 text-slate-300' />
                    <p>Tidak ada data pengajuan yang ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((submission) => {
                const urlType =
                  tipeKegiatan === "sertifikasi" ? "sertifikat" : tipeKegiatan;
                const namaKegiatan =
                  submission.nama_kegiatan ||
                  submission.lomba ||
                  submission.nama ||
                  "Tanpa Nama";
                const mhsNama =
                  submission.mahasiswa_nama ||
                  submission.mahasiswa?.[0]?.nama ||
                  "-";
                const mhsNim =
                  submission.mahasiswa_nim ||
                  submission.mahasiswa?.[0]?.nim ||
                  "-";

                return (
                  <TableRow
                    key={submission.id}
                    className='border-b border-slate-100 transition-colors hover:bg-slate-50/70'
                  >
                    {/* Nama Kegiatan */}
                    <TableCell className={`${CELL_BASE} pl-6 whitespace-normal break-words max-w-xs`}>
                      <div className='font-semibold text-slate-800 leading-snug line-clamp-2'>
                        {namaKegiatan}
                      </div>
                      {submission.cabang && (
                        <div className='text-[11px] text-slate-400 mt-0.5'>
                          Cabang: {submission.cabang}
                        </div>
                      )}
                    </TableCell>

                    {/* Mahasiswa */}
                    <TableCell className={`${CELL_BASE} whitespace-nowrap`}>
                      <div className='font-semibold text-slate-700 leading-tight'>
                        {mhsNama}
                      </div>
                      <div className='text-[11px] font-mono text-slate-400 mt-0.5'>
                        {mhsNim}
                      </div>
                    </TableCell>

                    {/* Level */}
                    <TableCell className={`${CELL_BASE} whitespace-nowrap font-medium text-slate-700`}>
                      {submission.level || "-"}
                    </TableCell>

                    {/* Kategori (Prestasi) */}
                    {tipeKegiatan === "prestasi" && (
                      <TableCell className={`${CELL_BASE} whitespace-nowrap font-medium text-slate-600`}>
                        {submission.kategori || "-"}
                      </TableCell>
                    )}

                    {/* Jenis (Rekognisi) */}
                    {tipeKegiatan === "rekognisi" && (
                      <TableCell className={`${CELL_BASE} whitespace-nowrap font-medium text-slate-600`}>
                        {submission.jenis || "-"}
                      </TableCell>
                    )}

                    {/* Peringkat (Prestasi) */}
                    {tipeKegiatan === "prestasi" && (
                      <TableCell className={`${CELL_BASE} whitespace-nowrap font-medium text-slate-600`}>
                        {submission.peringkat || "-"}
                      </TableCell>
                    )}

                    {/* Tahun */}
                    <TableCell className={`${CELL_BASE} whitespace-nowrap font-semibold text-slate-700`}>
                      {getYearDisplay(submission)}
                    </TableCell>

                    {/* Status */}
                    <TableCell className={`${CELL_BASE} whitespace-nowrap`}>
                      <StatusBadge status={submission.status_internal} />
                    </TableCell>

                    {/* Tgl Verifikasi */}
                    <TableCell className={`${CELL_BASE} whitespace-nowrap text-slate-500`}>
                      {formatDate(submission.approved_at)}
                    </TableCell>

                    {/* Aksi */}
                    <TableCell className={`${CELL_BASE} pr-6 text-right whitespace-nowrap`}>
                      <Button
                        type='button'
                        size='sm'
                        variant='secondary'
                        className='h-8 rounded-lg bg-sky-50 px-3 text-xs font-bold text-sky-700 hover:bg-sky-100 hover:text-sky-800 transition-colors'
                        onClick={() =>
                          router.push(`/verification/${urlType}/${submission.id}`)
                        }
                      >
                        <Eye className='mr-1.5 h-3.5 w-3.5' />
                        {submission.status_internal === "PENDING" ? "Review" : "Detail"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
