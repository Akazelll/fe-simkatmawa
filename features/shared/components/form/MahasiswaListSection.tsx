import { UserRound, Plus, Trash2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MahasiswaRow } from "@/features/shared/hooks/useFieldList";
import { MahasiswaNameAutocomplete } from "./MahasiswaNameAutocomplete";

interface Props {
  description?: string;
  items: MahasiswaRow[];
  add: () => void;
  remove: (index: number) => void;
  update: (index: number, field: keyof MahasiswaRow, value: string) => void;
}

const INPUT_CLASS =
  "h-11 md:h-12 bg-white border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all placeholder:text-slate-400";

export function MahasiswaListSection({
  description = "Minimal satu mahasiswa wajib diisi sebelum data dapat disimpan.",
  items,
  add,
  remove,
  update,
}: Props) {
  return (
    <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
      <CardContent className='p-6 md:p-8 flex flex-col gap-5'>
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
              <UserRound size={18} className='text-[#0F4C81]' />
            </div>
            <div className='flex flex-col gap-0.5'>
              <p className='text-sm font-bold text-slate-800 leading-none'>
                Data Mahasiswa
              </p>
              <p className='text-xs text-slate-500'>{description}</p>
            </div>
          </div>

          <Button
            type='button'
            onClick={add}
            variant='outline'
            className='gap-1.5 rounded-xl bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 font-semibold text-sm h-10 px-4'
          >
            <Plus size={16} />
            Tambah
          </Button>
        </div>

        <div className='flex flex-col gap-5'>
          {items.map((row, index) => {
            const isMulti = items.length > 1;
            const isKetua = index === 0;
            const namaLabel = isMulti && !isKetua ? "Nama Anggota" : "Nama Mahasiswa";

            return (
              <div
                key={index}
                className='flex flex-col gap-2.5 animate-in slide-in-from-top-1 duration-200'
              >
                {isMulti && (
                  <span
                    className={cn(
                      "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold",
                      isKetua
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-600",
                    )}
                  >
                    {isKetua ? <Crown size={12} /> : <UserRound size={12} />}
                    {isKetua ? "Ketua Kelompok" : `Anggota ${index}`}
                  </span>
                )}

                <div className='flex flex-col gap-3 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-end sm:gap-3 sm:border-0 sm:p-0'>
                  <div className='flex flex-col gap-1.5 sm:flex-1'>
                    <Label className='text-slate-700 font-semibold text-xs'>
                      NIM <span className='text-red-500'>*</span>
                    </Label>
                    <Input
                      value={row.nim}
                      onChange={(e) => update(index, "nim", e.target.value)}
                      placeholder='NIM'
                      required
                      autoComplete='off'
                      className={INPUT_CLASS}
                    />
                  </div>

                  <div className='flex flex-col gap-1.5 sm:flex-2'>
                    <Label className='text-slate-700 font-semibold text-xs'>
                      {namaLabel} <span className='text-red-500'>*</span>
                    </Label>
                    <MahasiswaNameAutocomplete
                      value={row.nama}
                      onChange={(val) => update(index, "nama", val)}
                      onPick={(m) => {
                        update(index, "nim", m.nim);
                        update(index, "nama", m.nama);
                      }}
                      placeholder={namaLabel}
                      required
                      className={INPUT_CLASS}
                    />
                  </div>

                  <Button
                    type='button'
                    onClick={() => remove(index)}
                    variant='ghost'
                    disabled={items.length <= 1}
                    className='h-11 md:h-12 w-full sm:w-12 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl shrink-0 disabled:opacity-40 disabled:hover:bg-transparent'
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
