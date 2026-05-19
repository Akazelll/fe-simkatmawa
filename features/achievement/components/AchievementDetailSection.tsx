import { Trophy, Package, Home, Link as LinkIcon, Users, NotebookPen } from "lucide-react";
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
import { IconInput } from "@/features/shared/components/form/IconInput";
import {
  KATEGORI_OPTIONS,
  PERINGKAT_OPTIONS,
  BENTUK_OPTIONS,
  LEVEL_OPTIONS,
} from "../constants";

const SELECT_CLASS =
  "w-full h-11 md:h-12 bg-white border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600";

const LABEL_CLASS = "text-slate-700 font-semibold text-xs";

const Required = () => <span className='text-red-500'>*</span>;

export function AchievementDetailSection() {
  return (
    <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
      <CardContent className='p-6 md:p-8 flex flex-col gap-5'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
            <Trophy size={18} className='text-[#0F4C81]' />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-sm font-bold text-slate-800 leading-none'>
              Data Prestasi
            </p>
            <p className='text-xs text-slate-500'>
              Informasi kompetisi, prestasi, dan dokumen bukti utama.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='level' className={LABEL_CLASS}>
              Level <Required />
            </Label>
            <Select required>
              <SelectTrigger id='level' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Level' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                {LEVEL_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='kategori' className={LABEL_CLASS}>
              Kategori <Required />
            </Label>
            <Select required>
              <SelectTrigger id='kategori' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Kategori' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                {KATEGORI_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='lomba' className={LABEL_CLASS}>
              Nama Kompetisi / Lomba <Required />
            </Label>
            <IconInput
              id='lomba'
              icon={Package}
              placeholder='Nama Kompetisi / Lomba'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='cabang' className={LABEL_CLASS}>
              Nama Cabang <Required />
            </Label>
            <IconInput
              id='cabang'
              icon={Package}
              placeholder='Nama Cabang'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='peringkat' className={LABEL_CLASS}>
              Peringkat <Required />
            </Label>
            <Select required>
              <SelectTrigger id='peringkat' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Peringkat' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                {PERINGKAT_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='penyelenggara' className={LABEL_CLASS}>
              Nama Penyelenggara <Required />
            </Label>
            <IconInput
              id='penyelenggara'
              icon={Home}
              placeholder='Penyelenggara'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='jml-pt' className={LABEL_CLASS}>
              Jumlah PT Peserta <Required />
            </Label>
            <IconInput
              id='jml-pt'
              icon={Users}
              type='number'
              min={1}
              placeholder='Jumlah'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='kepesertaan' className={LABEL_CLASS}>
              Kepesertaan <Required />
            </Label>
            <Select required>
              <SelectTrigger id='kepesertaan' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Kepesertaan' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                <SelectItem value='individu'>Individu</SelectItem>
                <SelectItem value='kelompok'>Kelompok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='bentuk' className={LABEL_CLASS}>
              Bentuk <Required />
            </Label>
            <Select required>
              <SelectTrigger id='bentuk' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Bentuk' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                {BENTUK_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='url-kompetisi' className={LABEL_CLASS}>
              URL Kompetisi / Lomba <Required />
            </Label>
            <IconInput
              id='url-kompetisi'
              icon={LinkIcon}
              type='url'
              placeholder='URL'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='link-sertifikat' className={LABEL_CLASS}>
              Link Dokumen Sertifikat <Required />
            </Label>
            <IconInput
              id='link-sertifikat'
              icon={LinkIcon}
              type='url'
              placeholder='URL'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='tgl-sertifikat' className={LABEL_CLASS}>
              Tanggal Sertifikat <Required />
            </Label>
            <Input
              id='tgl-sertifikat'
              type='date'
              required
              className='w-full h-11 md:h-12 bg-white border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='link-foto' className={LABEL_CLASS}>
              Link Foto UPP
            </Label>
            <IconInput
              id='link-foto'
              icon={LinkIcon}
              type='url'
              placeholder='URL'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='link-undangan' className={LABEL_CLASS}>
              Link Dokumen Undangan
            </Label>
            <IconInput
              id='link-undangan'
              icon={LinkIcon}
              type='url'
              placeholder='URL'
            />
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='keterangan' className={LABEL_CLASS}>
              Keterangan
            </Label>
            <IconInput
              id='keterangan'
              icon={NotebookPen}
              placeholder='Keterangan tambahan'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
