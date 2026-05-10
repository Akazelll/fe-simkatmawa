import { Users, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MemberFormSectionProps {
  members: string[];
  addMember: () => void;
  removeMember: (index: number) => void;
  updateMember: (index: number, value: string) => void;
  title?: string;
}

export function MemberFormSection({
  members,
  addMember,
  removeMember,
  updateMember,
  title = "Peserta Lomba",
}: MemberFormSectionProps) {
  return (
    <>
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
          <Users size={18} className='text-[#0F4C81]' />
        </div>
        <p className='text-sm font-bold text-slate-700 leading-none'>{title}</p>
      </div>

      <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
        <CardContent className='p-6 md:p-8 flex flex-col gap-4'>
          <Label
            htmlFor='NIM'
            className='text-slate-700 font-semibold text-sm md:text-base'
          >
            NIM Ketua dan Anggota Kelompok
          </Label>

          <div className='flex flex-col gap-3'>
            {members.map((nim, index) => (
              <div
                key={index}
                className='flex items-center gap-2 animate-in slide-in-from-top-1 duration-200'
              >
                <div className='relative flex-1'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-slate-400 uppercase tracking-tighter'>
                    NIM {index + 1}
                  </span>
                  <Input
                    value={nim}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder='Contoh: A11.2024.15598'
                    required
                    className='h-11 md:h-12 pl-16 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                  />
                </div>

                {index === 0 ? (
                  <Button
                    type='button'
                    onClick={addMember}
                    className='h-11 w-11 md:h-12 md:w-12 p-0 bg-[#0F4C81] hover:bg-[#0c3e6b] text-white rounded-xl shadow-sm shrink-0'
                  >
                    <Plus size={20} strokeWidth={3} />
                  </Button>
                ) : (
                  <Button
                    type='button'
                    onClick={() => removeMember(index)}
                    variant='ghost'
                    className='h-11 w-11 md:h-12 md:w-12 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl shrink-0'
                  >
                    <Trash2 size={18} />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <p className='text-[11px] text-slate-400 font-medium italic'>
            *Klik tombol + untuk menambahkan anggota kelompok.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
