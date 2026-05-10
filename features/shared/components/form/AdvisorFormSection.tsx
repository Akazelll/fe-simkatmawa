import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdvisorFormSection() {
  return (
    <>
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
          <GraduationCap size={18} className='text-[#0F4C81]' />
        </div>
        <p className='text-sm font-bold text-slate-700 leading-none'>
          Data Dosen Pembimbing
        </p>
      </div>
      <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
        <CardContent className='p-6 md:p-10'>
          <div className='flex flex-col gap-6 w-full'>
            <div className='flex flex-col gap-6 w-full'>
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='dospem'
                  className='text-slate-700 font-bold text-sm'
                >
                  Nama - NIP Dosen Pembimbing{" "}
                  <span className='text-red-500'>*</span>
                </Label>
                <Select required>
                  <SelectTrigger
                    id='dospem'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Dosen Pembimbing' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='Dr. Andi Wijaya - NIP. 123456789'>
                      Dr. Andi Wijaya - NIP. 123456789
                    </SelectItem>
                    <SelectItem value='Dr. Siti Rahma - NIP. 987654321'>
                      Dr. Siti Rahma - NIP. 987654321
                    </SelectItem>
                    <SelectItem value='Dr. Budi Santoso - NIP. 456789123'>
                      Dr. Budi Santoso - NIP. 456789123
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='url-surat-tugas'
                  className='text-slate-700 font-bold text-sm'
                >
                  URL Surat Tugas Dosen Pembimbing{" "}
                  <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='url-surat-tugas'
                  type='url'
                  placeholder='Contoh: https://drive.google.com/...'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
