"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchablePersonInput } from "./SearchablePersonInput";

export type SubmissionMember = {
  mahasiswa_id: string | null;
  nama: string;
  nim: string;
};

type SubmissionMembersSectionProps = {
  members: SubmissionMember[];
  onChange: (members: SubmissionMember[]) => void;
};

const emptyMember: SubmissionMember = {
  mahasiswa_id: null,
  nama: "",
  nim: "",
};

export function SubmissionMembersSection({
  members,
  onChange,
}: SubmissionMembersSectionProps) {
  const addMember = () => {
    onChange([...members, { ...emptyMember }]);
  };

  const removeMember = (index: number) => {
    onChange(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, value: SubmissionMember) => {
    const nextMembers = [...members];
    nextMembers[index] = value;
    onChange(nextMembers);
  };

  return (
    <section className='space-y-4 rounded-2xl border bg-white p-5'>
      <div>
        <h3 className='text-base font-bold text-slate-900'>Data Anggota</h3>
        <p className='text-sm text-slate-500'>
          Cari anggota berdasarkan nama mahasiswa.
        </p>
      </div>

      <div className='space-y-3'>
        {members.map((member, index) => {
          return (
            <div
              key={index}
              className='grid gap-3 rounded-xl border bg-slate-50 p-4 md:grid-cols-[1fr_auto] items-end'
            >
              <div className='space-y-1.5 w-full'>
                <label className='text-sm font-medium text-slate-700'>
                  Anggota {index + 1}
                </label>
                <SearchablePersonInput
                  type='mahasiswa'
                  value={member.mahasiswa_id || ""}
                  placeholder='Ketik nama mahasiswa...'
                  onChange={(id, nama) => {
                    updateMember(index, {
                      mahasiswa_id: id,
                      nama: nama,
                      nim: id, // ID dari backend saat ini adalah NIM mahasiswa
                    });
                  }}
                />
              </div>

              <Button
                type='button'
                variant='outline'
                onClick={() => removeMember(index)}
                className='h-10 border-red-200 text-red-600 hover:bg-red-50'
              >
                <Trash2 className='mr-2 h-4 w-4' />
                Hapus
              </Button>
            </div>
          );
        })}
      </div>

      <Button type='button' variant='outline' onClick={addMember}>
        <Plus className='mr-2 h-4 w-4' />
        Tambah Anggota
      </Button>
    </section>
  );
}
