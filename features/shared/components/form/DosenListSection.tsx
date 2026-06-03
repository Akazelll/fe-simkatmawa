import { Users, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DosenRow } from "@/features/shared/hooks/useFieldList";

interface Props {
  description?: string;
  items: DosenRow[];
  add: () => void;
  remove: (index: number) => void;
  update: (index: number, field: keyof DosenRow, value: string) => void;
}

const INPUT_CLASS =
  "h-11 md:h-12 bg-white border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all placeholder:text-slate-400";

export function DosenListSection({
  description = "Isi dosen pendamping beserta tautan surat tugasnya.",
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
              <Users size={18} className='text-[#0F4C81]' />
            </div>
            <div className='flex flex-col gap-0.5'>
              <p className='text-sm font-bold text-slate-800 leading-none'>
                Data Dosen Pendamping
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

        <div className='flex flex-col gap-4'>
          {items.map((row, index) => (
            <div
              key={index}
              className='flex flex-col gap-3 rounded-xl border border-slate-100 p-4 md:flex-row md:items-end md:gap-3 md:border-0 md:p-0 animate-in slide-in-from-top-1 duration-200'
            >
              <div className='flex flex-col gap-1.5 md:flex-1'>
                <Label className='text-slate-700 font-semibold text-xs'>
                  NIDN/NUPTK <span className='text-red-500'>*</span>
                </Label>
                <Input
                  // Ubah dari row.nidn menjadi row.nuptk
                  value={row.nuptk || ""}
                  onChange={(e) => update(index, "nuptk", e.target.value)}
                  placeholder='NIDN/NUPTK'
                  className={INPUT_CLASS}
                  required
                />
              </div>

              <div className='flex flex-col gap-1.5 md:flex-1'>
                <Label className='text-slate-700 font-semibold text-xs'>
                  Nama Dosen <span className='text-red-500'>*</span>
                </Label>
                <Input
                  value={row.nama || ""}
                  onChange={(e) => update(index, "nama", e.target.value)}
                  placeholder='Nama Lengkap Dosen'
                  className={INPUT_CLASS}
                  required
                />
              </div>

              <div className='flex flex-col gap-1.5 md:flex-1'>
                <Label className='text-slate-700 font-semibold text-xs'>
                  URL Surat Tugas <span className='text-red-500'>*</span>
                </Label>
                <Input
                  // Ubah dari row.suratTugas menjadi row.url_surat_tugas
                  value={row.url_surat_tugas || ""}
                  onChange={(e) =>
                    update(index, "url_surat_tugas", e.target.value)
                  }
                  placeholder='https://...'
                  type='url'
                  className={INPUT_CLASS}
                  required
                />
              </div>

              <Button
                type='button'
                onClick={() => remove(index)}
                variant='ghost'
                disabled={items.length <= 1} // Mencegah hapus jika tinggal 1 (opsional tergantung aturan bisnis)
                className='h-11 md:h-12 w-full md:w-12 p-0 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl shrink-0 disabled:opacity-40 disabled:hover:bg-transparent'
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
