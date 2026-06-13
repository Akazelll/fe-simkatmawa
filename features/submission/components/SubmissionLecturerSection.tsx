"use client";

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

export function SubmissionLecturerSection({
  lecturer,
  onChange,
}: SubmissionLecturerSectionProps) {
  return (
    <section className='space-y-4 rounded-2xl border bg-white p-5'>
      <div>
        <h3 className='text-base font-bold text-slate-900'>Dosen Pembimbing</h3>
        <p className='text-sm text-slate-500'>
          Cari dosen pembimbing berdasarkan nama.
        </p>
      </div>

      <SearchablePersonInput
        type='dosen'
        value={lecturer.dosen_id || ""}
        placeholder='Ketik nama dosen...'
        onChange={(id, nama) => {
          onChange({
            dosen_id: id,
            nama: nama,
            nuptk: id,
          });
        }}
      />
    </section>
  );
}
