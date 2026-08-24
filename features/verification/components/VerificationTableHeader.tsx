"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TipeKegiatan, VerifikasiQueryParams } from "../types";
import { getNameSortKey, HEAD_CLASS } from "../utils/VerificationTableUtils";
import { SortableHead } from "./SortableHead";

interface VerificationTableHeaderProps {
  tipeKegiatan: TipeKegiatan;
  params?: VerifikasiQueryParams;
  onSort: (key: string) => void;
}

export function VerificationTableHeader({
  tipeKegiatan,
  params,
  onSort,
}: VerificationTableHeaderProps) {
  const nameSortKey = getNameSortKey(tipeKegiatan);

  return (
    <TableHeader className="bg-slate-50/70 border-b border-slate-200/80">
      <TableRow className="hover:bg-transparent">
        <SortableHead
          label="Nama Kegiatan"
          sortKey={nameSortKey}
          currentSortBy={params?.sort_by}
          currentSortDir={params?.sort_dir}
          onSort={onSort}
          className="pl-6"
        />
        <TableHead className={HEAD_CLASS}>Mahasiswa</TableHead>
        <SortableHead
          label="Level"
          sortKey="level"
          currentSortBy={params?.sort_by}
          currentSortDir={params?.sort_dir}
          onSort={onSort}
        />
        {tipeKegiatan === "prestasi" && (
          <SortableHead
            label="Kategori"
            sortKey="kategori"
            currentSortBy={params?.sort_by}
            currentSortDir={params?.sort_dir}
            onSort={onSort}
          />
        )}
        {tipeKegiatan === "rekognisi" && (
          <SortableHead
            label="Jenis"
            sortKey="jenis"
            currentSortBy={params?.sort_by}
            currentSortDir={params?.sort_dir}
            onSort={onSort}
          />
        )}
        {tipeKegiatan === "prestasi" && (
          <SortableHead
            label="Peringkat"
            sortKey="peringkat"
            currentSortBy={params?.sort_by}
            currentSortDir={params?.sort_dir}
            onSort={onSort}
          />
        )}
        <SortableHead
          label="Tahun"
          sortKey="tgl_sertifikat"
          currentSortBy={params?.sort_by}
          currentSortDir={params?.sort_dir}
          onSort={onSort}
        />
        <SortableHead
          label="Status"
          sortKey="status_internal"
          currentSortBy={params?.sort_by}
          currentSortDir={params?.sort_dir}
          onSort={onSort}
        />
        <SortableHead
          label="Tgl Verifikasi"
          sortKey="approved_at"
          currentSortBy={params?.sort_by}
          currentSortDir={params?.sort_dir}
          onSort={onSort}
        />
        <TableHead className={`${HEAD_CLASS} pr-6 text-right`}>
          Aksi
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
