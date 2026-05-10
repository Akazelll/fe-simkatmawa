import { Trophy } from "lucide-react";
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

export function CertificateDetailSection() {
  return (
    <>
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
          <Trophy size={18} className='text-[#0F4C81]' />
        </div>
        <p className='text-sm font-bold text-slate-700 leading-none'>
          Detail Kegiatan Sertifikasi
        </p>
      </div>

      <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
        <CardContent className='p-6 md:p-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div className='flex flex-col gap-6 w-full'>
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='sertifikat'
                  className='text-slate-700 font-bold text-sm'
                >
                  Nama Skema Sertifikasi <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='sertifikat'
                  type='text'
                  placeholder='Nama Sertifikat'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='url-kegiatan'
                  className='text-slate-700 font-bold text-sm'
                >
                  URL KEGIATAN <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='url-kegiatan'
                  type='url'
                  placeholder='Contoh: https://drive.google.com/...'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='url-sertifikat'
                  className='text-slate-700 font-bold text-sm'
                >
                  Sertifikat/Piagam Sertifikasi{" "}
                  <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='url-sertifikat'
                  type='url'
                  placeholder='Contoh: https://drive.google.com/...'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>
            </div>

            <div className='hidden lg:flex flex-col gap-6 pt-2 w-full'>
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='penyelenggara'
                  className='text-slate-700 font-bold text-sm'
                >
                  Penyelenggara Kegiatan <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='penyelenggara'
                  type='text'
                  placeholder='Contoh: Fakultas Ilmu Komputer'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>

              <div className='grid grid-cols-2 gap-4 w-full'>
                <div className='flex flex-col gap-2.5'>
                  <Label
                    htmlFor='date-start'
                    className='text-slate-700 font-bold text-sm'
                  >
                    Tanggal Sertfikasi
                  </Label>
                  <Input
                    id='date-start'
                    type='date'
                    required
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all text-slate-600'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='tingkat'
                  className='text-slate-700 font-bold text-sm'
                >
                  Kategori Sertifikasi <span className='text-red-500'>*</span>
                </Label>
                <Select required>
                  <SelectTrigger
                    id='tingkat'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Kategori....' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='kota'>Kabupaten/Kota</SelectItem>
                    <SelectItem value='provinsi'>Provinsi</SelectItem>
                    <SelectItem value='nasional'>Nasional</SelectItem>
                    <SelectItem value='internasional'>Internasional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
