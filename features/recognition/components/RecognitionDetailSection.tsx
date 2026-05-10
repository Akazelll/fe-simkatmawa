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

export function RecognitionDetailSection() {
  return (
    <>
      <div className='flex items-center gap-3'>
        <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
          <Trophy size={18} className='text-[#0F4C81]' />
        </div>
        <p className='text-sm font-bold text-slate-700 leading-none'>
          Detail Lomba
        </p>
      </div>

      <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
        <CardContent className='p-6 md:p-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <div className='flex flex-col gap-6 w-full'>
              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='lomba'
                  className='text-slate-700 font-bold text-sm'
                >
                  Nama Lomba <span className='text-red-500'>*</span>
                </Label>
                <Input
                  id='lomba'
                  type='text'
                  placeholder='Esai Nasional'
                  required
                  className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
                />
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='jns-kepesertaan'
                  className='text-slate-700 font-bold text-sm'
                >
                  Jenis Kepesertaan <span className='text-red-500'>*</span>
                </Label>
                <Select required>
                  <SelectTrigger
                    id='jns-kepesertaan'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Jenis Kepesertaan' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='individu'>Individu</SelectItem>
                    <SelectItem value='kelompok'>Kelompok</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='jml-perguruan-tinggi'
                  className='text-slate-700 font-bold text-sm'
                >
                  Jumlah Perguruan Tinggi yang terlibat
                </Label>
                <Select required>
                  <SelectTrigger
                    id='jml-perguruan-tinggi'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Jumlah Perguruan Tinggi' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='1-10'>
                      1 - 10 Perguruan Tinggi
                    </SelectItem>
                    <SelectItem value='11-20'>
                      11 - 20 Perguruan Tinggi
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='jml-peserta'
                  className='text-slate-700 font-bold text-sm'
                >
                  Jumlah Peserta
                </Label>
                <Input
                  id='jml-peserta'
                  type='text'
                  placeholder='Contoh: 50 Peserta'
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
                    Tanggal Mulai
                  </Label>
                  <Input
                    id='date-start'
                    type='date'
                    required
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all text-slate-600'
                  />
                </div>
                <div className='flex flex-col gap-2.5'>
                  <Label
                    htmlFor='date-end'
                    className='text-slate-700 font-bold text-sm'
                  >
                    Tanggal Selesai
                  </Label>
                  <Input
                    id='date-end'
                    type='date'
                    required
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all text-slate-600'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='mode-pelaksanaan'
                  className='text-slate-700 font-bold text-sm'
                >
                  Mode Pelaksanaan Lomba
                </Label>
                <Select required>
                  <SelectTrigger
                    id='mode-pelaksanaan'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Mode Pelaksanaan Lomba' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='offline'>Offline</SelectItem>
                    <SelectItem value='online'>Online</SelectItem>
                  </SelectContent>
                </Select>
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

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='tingkat'
                  className='text-slate-700 font-bold text-sm'
                >
                  Tingkat Lomba <span className='text-red-500'>*</span>
                </Label>
                <Select required>
                  <SelectTrigger
                    id='tingkat'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Tingkat Lomba' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='kota'>Kabupaten/Kota</SelectItem>
                    <SelectItem value='provinsi'>Provinsi</SelectItem>
                    <SelectItem value='nasional'>Nasional</SelectItem>
                    <SelectItem value='internasional'>Internasional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='negara-internasional'
                  className='text-slate-700 font-bold text-sm'
                >
                  Jumlah Negara (Kategori Internasional)
                </Label>
                <Select required>
                  <SelectTrigger
                    id='negara-internasional'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Jumlah Negara' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='1-10'>1 - 10 Negara</SelectItem>
                    <SelectItem value='11-20'>11 - 20 Negara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='capaian-prestasi'
                  className='text-slate-700 font-bold text-sm'
                >
                  Capaian Prestasi <span className='text-red-500'>*</span>
                </Label>
                <Select required>
                  <SelectTrigger
                    id='capaian-prestasi'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Capaian Prestasi' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='Juara 1'>Juara 1</SelectItem>
                    <SelectItem value='Juara 2'>Juara 2</SelectItem>
                    <SelectItem value='Juara 3'>Juara 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='jenis-prestasi'
                  className='text-slate-700 font-bold text-sm'
                >
                  Jenis Prestasi <span className='text-red-500'>*</span>
                </Label>
                <Select required>
                  <SelectTrigger
                    id='jenis-prestasi'
                    className='w-full h-11 md:h-12 bg-[#E6E8EB] border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600'
                  >
                    <SelectValue placeholder='Pilih Jenis Prestasi' />
                  </SelectTrigger>
                  <SelectContent className='rounded-xl border-slate-200'>
                    <SelectItem value='individu'>Individu</SelectItem>
                    <SelectItem value='kelompok'>Kelompok</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col gap-2.5 w-full'>
                <Label
                  htmlFor='url-sertifikat'
                  className='text-slate-700 font-bold text-sm'
                >
                  URL SERTIFIKAT DAN KEGIATAN{" "}
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
          </div>
        </CardContent>
      </Card>
    </>
  );
}
