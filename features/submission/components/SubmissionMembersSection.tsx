"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  lookupService,
  MahasiswaLookupItem,
} from "@/features/submission/services/lookupService";
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

  const selectedIds = members
    .map((member) => member.mahasiswa_id)
    .filter((id): id is string => Boolean(id));

  return (
    <section className='space-y-4 rounded-2xl border bg-white p-5'>
      <div>
        <h3 className='text-base font-bold text-slate-900'>Data Anggota</h3>
        <p className='text-sm text-slate-500'>
          Cari anggota berdasarkan nama atau NIM, lalu pilih dari daftar
          sugesti.
        </p>
      </div>

      <div className='space-y-3'>
        {members.map((member, index) => {
          const selectedValue: MahasiswaLookupItem | null =
            member.nim && member.nama
              ? {
                  id: member.nim,
                  nama: member.nama,
                  nim: member.nim,
                  label: `${member.nama} - ${member.nim}`,
                }
              : null;

          return (
            <div
              key={index}
              className='grid gap-3 rounded-xl border bg-slate-50 p-4 md:grid-cols-[1fr_auto]'
            >
              <SearchablePersonInput<MahasiswaLookupItem>
                label={`Anggota ${index + 1}`}
                value={selectedValue}
                placeholder='Ketik nama atau NIM mahasiswa...'
                onSearch={async (
                  query: string,
                ): Promise<MahasiswaLookupItem[]> => {
                  const result: MahasiswaLookupItem[] =
                    await lookupService.searchMahasiswa(query);

                  return result.filter((item: MahasiswaLookupItem) => {
                    return (
                      !selectedIds.includes(item.id) ||
                      item.id === member.mahasiswa_id
                    );
                  });
                }}
                getOptionLabel={(item) => item.nama}
                getOptionDescription={(item) => `NIM: ${item.nim}`}
                onSelect={(item) => {
                  updateMember(index, {
                    mahasiswa_id: item.id,
                    nama: item.nama,
                    nim: item.nim,
                  });
                }}
                onClear={() => {
                  updateMember(index, { ...emptyMember });
                }}
              />

              <Button
                type='button'
                variant='outline'
                onClick={() => removeMember(index)}
                className='mt-6 h-11 border-red-200 text-red-600 hover:bg-red-50'
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
