"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { useRouter } from "next/navigation";
import type { TipeKegiatan, PengajuanItem } from "../types";
import {
  getYearDisplay,
  formatDate,
  getUrlType,
  getNamaKegiatan,
  getMahasiswaInfo,
  CELL_BASE,
} from "../utils/VerificationTableUtils";

interface VerificationTableRowProps {
  tipeKegiatan: TipeKegiatan;
  submission: PengajuanItem;
}

export function VerificationTableRow({ tipeKegiatan, submission }: VerificationTableRowProps) {
  const router = useRouter();
  const urlType = getUrlType(tipeKegiatan);
  const namaKegiatan = getNamaKegiatan(submission);
  const { mhsNama, mhsNim } = getMahasiswaInfo(submission);

  return (
    <TableRow
      key={submission.id}
      className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
    >
      {/* Nama Kegiatan */}
      <TableCell className={`${CELL_BASE} pl-6 whitespace-normal break-words max-w-xs`}>
        <div className="font-semibold text-slate-800 leading-snug line-clamp-2">
          {namaKegiatan}
        </div>
        {submission.cabang && (
          <div className="text-[11px] text-slate-400 mt-0.5">
            Cabang: {submission.cabang}
          </div>
        )}
      </TableCell>

      {/* Mahasiswa */}
      <TableCell className={`${CELL_BASE} whitespace-nowrap`}>
        <div className="font-semibold text-slate-700 leading-tight">
          {mhsNama}
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-0.5">
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
        <StatusBadge status={submission.status_internal || "UNKNOWN"} />
      </TableCell>

      {/* Tgl Verifikasi */}
      <TableCell className={`${CELL_BASE} whitespace-nowrap text-slate-500`}>
        {formatDate(submission.approved_at)}
      </TableCell>

      {/* Aksi */}
      <TableCell className={`${CELL_BASE} pr-6 text-right whitespace-nowrap`}>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="h-8 rounded-lg bg-sky-50 px-3 text-xs font-bold text-sky-700 hover:bg-sky-100 hover:text-sky-800 transition-colors"
          onClick={() => router.push(`/verification/${urlType}/${submission.id}`)}
        >
          <Eye className="mr-1.5 h-3.5 w-3.5" />
          {submission.status_internal === "PENDING" ? "Review" : "Detail"}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function VerificationTableEmpty() {
  return (
    <TableRow>
      <TableCell colSpan={10} className="h-36 text-center text-sm font-medium text-slate-500">
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <svg
            className="h-8 w-8 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p>Tidak ada data pengajuan yang ditemukan.</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function VerificationTableRows({
  tipeKegiatan,
  data,
}: {
  tipeKegiatan: TipeKegiatan;
  data: PengajuanItem[];
}) {
  return (
    <TableBody>
      {data.length === 0 ? (
        <VerificationTableEmpty />
      ) : (
        data.map((submission) => (
          <VerificationTableRow key={submission.id} tipeKegiatan={tipeKegiatan} submission={submission} />
        ))
      )}
    </TableBody>
  );
}
