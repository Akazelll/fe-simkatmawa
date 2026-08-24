import type { SkeletonColumn } from "@/features/shared/components/TableSkeleton";

export const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
export const CELL_BASE = "py-4 align-top text-sm text-slate-600";

export const VERIFICATION_TABLE_COLUMNS: SkeletonColumn[] = [
  { width: "w-[25%]" },
  { width: "w-[20%]" },
  { width: "w-[12%]" },
  { width: "w-[12%]" },
  { width: "w-[10%]" },
  { width: "w-[11%]", pill: true },
  { width: "w-[10%]" },
  { width: "w-[10%]", align: "right", cell: "h-8 w-20 rounded-lg" },
];

export function getYearDisplay(item: { tahun?: number | string; tgl_sertifikat?: string }) {
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

export function formatDate(dateStr?: string | null) {
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

export function getNameSortKey(tipeKegiatan: string) {
  return tipeKegiatan === "prestasi" ? "lomba" : "nama";
}

export function getUrlType(tipeKegiatan: string) {
  return tipeKegiatan === "sertifikasi" ? "sertifikat" : tipeKegiatan;
}

export function getNamaKegiatan(submission: { nama_kegiatan?: string; lomba?: string; nama?: string }) {
  return submission.nama_kegiatan || submission.lomba || submission.nama || "Tanpa Nama";
}

export function getMahasiswaInfo(submission: { mahasiswa_nama?: string; mahasiswa_nim?: string; mahasiswa?: { nama?: string; nim?: string }[] }) {
  const mhsNama = submission.mahasiswa_nama || submission.mahasiswa?.[0]?.nama || "-";
  const mhsNim = submission.mahasiswa_nim || submission.mahasiswa?.[0]?.nim || "-";
  return { mhsNama, mhsNim };
}