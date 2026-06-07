"use client";

import {
  DosenLookupItem,
  lookupService,
} from "@/features/submission/services/lookupService";
import { SearchablePersonInput } from "./SearchablePersonInput";

export type SubmissionLecturer = {
  dosen_id: string | null;
  nama: string;
  nuptk?: string | null;
};

type SubmissionLecturerSectionProps = {
  lecturer: SubmissionLecturer;
  onChange: (lecturer: SubmissionLecturer) => void;
};

const emptyLecturer: SubmissionLecturer = {
  dosen_id: null,
  nama: "",
  nuptk: null,
};

export function SubmissionLecturerSection({
  lecturer,
  onChange,
}: SubmissionLecturerSectionProps) {
  const selectedValue =
    lecturer.dosen_id && lecturer.nama
      ? {
          id: lecturer.dosen_id,
          nama: lecturer.nama,
          nuptk: lecturer.nuptk ?? "",
          label: lecturer.nuptk
            ? `${lecturer.nama} - ${lecturer.nuptk}`
            : lecturer.nama,
        }
      : null;

  return (
    <section className='space-y-4 rounded-2xl border bg-white p-5'>
      <div>
        <h3 className='text-base font-bold text-slate-900'>Dosen Pembimbing</h3>
        <p className='text-sm text-slate-500'>
          Cari dosen berdasarkan nama atau NUPTK.
        </p>
      </div>

      <SearchablePersonInput<DosenLookupItem>
        label='Nama Dosen'
        value={selectedValue}
        placeholder='Ketik nama atau NUPTK dosen...'
        onSearch={lookupService.searchDosen}
        getOptionLabel={(item) => item.nama}
        getOptionDescription={(item) =>
          item.nuptk ? `NUPTK: ${item.nuptk}` : "Tanpa NUPTK"
        }
        onSelect={(item) => {
          onChange({
            dosen_id: item.id,
            nama: item.nama,
            nuptk: item.nuptk,
          });
        }}
        onClear={() => {
          onChange(emptyLecturer);
        }}
      />
    </section>
  );
}
