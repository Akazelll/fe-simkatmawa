// features/achievement/components/AchievementDetailSection.tsx

import {
  Trophy,
  Package,
  Home,
  Link as LinkIcon,
  Users,
  NotebookPen,
} from "lucide-react";
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
import { Prestasi } from "../types";

const SELECT_CLASS =
  "w-full h-11 md:h-12 bg-white border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600";

const LABEL_CLASS = "text-slate-700 font-semibold text-xs";

const Required = () => <span className='text-red-500'>*</span>;

interface AchievementDetailSectionProps {
  defaultData?: Prestasi;
}

export function AchievementDetailSection({
  defaultData,
}: AchievementDetailSectionProps) {
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
          {/* LEVEL */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='level' className={LABEL_CLASS}>
              Level <Required />
            </Label>
            <Select name='level' required defaultValue={defaultData?.level}>
              <SelectTrigger id='level' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Level' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                <SelectItem value='KAB'>Kabupaten/Kota</SelectItem>
                <SelectItem value='PROV'>Provinsi</SelectItem>
                <SelectItem value='NAS'>Nasional</SelectItem>
                <SelectItem value='INT'>Internasional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* KATEGORI */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='kategori' className={LABEL_CLASS}>
              Kategori <Required />
            </Label>
            <Select
              name='kategori'
              required
              defaultValue={defaultData?.kategori}
            >
              <SelectTrigger id='kategori' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Kategori' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                <SelectItem value='RISNOV'>Riset dan Inovasi STEM</SelectItem>
                <SelectItem value='RISNOVSSH'>Riset dan Inovasi SSH</SelectItem>
                <SelectItem value='SENBUD'>Seni dan Budaya</SelectItem>
                <SelectItem value='OLAHRAGA'>Olahraga</SelectItem>
                <SelectItem value='MINAT'>Minat Khusus</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* NAMA LOMBA */}
          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='lomba' className={LABEL_CLASS}>
              Nama Kompetisi / Lomba <Required />
            </Label>
            <IconInput
              id='lomba'
              name='lomba'
              icon={Package}
              placeholder='Nama Kompetisi / Lomba'
              required
              defaultValue={defaultData?.lomba}
            />
          </div>

          {/* CABANG */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='cabang' className={LABEL_CLASS}>
              Nama Cabang <Required />
            </Label>
            <IconInput
              id='cabang'
              name='cabang'
              icon={Package}
              placeholder='Nama Cabang'
              required
              defaultValue={defaultData?.cabang}
            />
          </div>

          {/* PERINGKAT */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='peringkat' className={LABEL_CLASS}>
              Peringkat <Required />
            </Label>
            <Select
              name='peringkat'
              required
              defaultValue={defaultData?.peringkat}
            >
              <SelectTrigger id='peringkat' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Peringkat' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                <SelectItem value='JUARA1'>Juara 1</SelectItem>
                <SelectItem value='JUARA2'>Juara 2</SelectItem>
                <SelectItem value='JUARA3'>Juara 3</SelectItem>
                <SelectItem value='HARAPAN1'>Harapan 1</SelectItem>
                <SelectItem value='HARAPAN2'>Harapan 2</SelectItem>
                <SelectItem value='HARAPAN3'>Harapan 3</SelectItem>
                <SelectItem value='APRESIASI'>
                  Apresiasi / Penghargaan
                </SelectItem>
                <SelectItem value='PESERTA'>Peserta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* PENYELENGGARA */}
          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='penyelenggara' className={LABEL_CLASS}>
              Nama Penyelenggara <Required />
            </Label>
            <IconInput
              id='penyelenggara'
              name='penyelenggara'
              icon={Home}
              placeholder='Penyelenggara'
              required
              defaultValue={defaultData?.penyelenggara}
            />
          </div>

          {/* JUMLAH PT PESERTA */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='jml-pt' className={LABEL_CLASS}>
              Jumlah PT Peserta <Required />
            </Label>
            <IconInput
              id='jml-pt'
              name='jumlah_unit_peserta'
              icon={Users}
              type='number'
              min={1}
              placeholder='Jumlah'
              required
              defaultValue={defaultData?.jumlah_unit_peserta}
            />
          </div>

          {/* KEPESERTAAN */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='kepesertaan' className={LABEL_CLASS}>
              Kepesertaan <Required />
            </Label>
            <Select
              name='kelompok_prestasi'
              required
              defaultValue={defaultData?.kelompok_prestasi}
            >
              <SelectTrigger id='kepesertaan' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Kepesertaan' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                <SelectItem value='INDIVIDU'>Individu</SelectItem>
                <SelectItem value='KELOMPOK'>Kelompok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BENTUK */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='bentuk' className={LABEL_CLASS}>
              Bentuk <Required />
            </Label>
            <Select name='bentuk' required defaultValue={defaultData?.bentuk}>
              <SelectTrigger id='bentuk' className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Bentuk' />
              </SelectTrigger>
              <SelectContent className='rounded-xl border-slate-200'>
                <SelectItem value='DARING'>Daring (Online)</SelectItem>
                <SelectItem value='LURING'>Luring (Offline)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* URL PESERTA (URL KOMPETISI) */}
          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='url-kompetisi' className={LABEL_CLASS}>
              URL Kompetisi / Lomba <Required />
            </Label>
            <IconInput
              id='url-kompetisi'
              name='url_peserta'
              icon={LinkIcon}
              type='url'
              placeholder='https://...'
              required
              defaultValue={defaultData?.url_peserta}
            />
          </div>

          {/* URL SERTIFIKAT */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='link-sertifikat' className={LABEL_CLASS}>
              Link Dokumen Sertifikat <Required />
            </Label>
            <IconInput
              id='link-sertifikat'
              name='url_sertifikat'
              icon={LinkIcon}
              type='url'
              placeholder='https://...'
              required
              defaultValue={defaultData?.url_sertifikat}
            />
          </div>

          {/* TANGGAL SERTIFIKAT */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='tgl-sertifikat' className={LABEL_CLASS}>
              Tanggal Sertifikat <Required />
            </Label>
            <Input
              id='tgl-sertifikat'
              name='tgl_sertifikat'
              type='date'
              required
              defaultValue={defaultData?.tgl_sertifikat?.slice(0, 10)}
              className='w-full h-11 md:h-12 bg-white border-slate-200 rounded-xl focus-visible:ring-[#0F4C81]/20 focus-visible:border-[#0F4C81] transition-all'
            />
          </div>

          {/* URL FOTO UPP */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='link-foto' className={LABEL_CLASS}>
              Link Foto UPP <Required />
            </Label>
            <IconInput
              id='link-foto'
              name='url_foto_upp'
              icon={LinkIcon}
              type='url'
              placeholder='https://...'
              required
              defaultValue={defaultData?.url_foto_upp}
            />
          </div>

          {/* URL UNDANGAN */}
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='link-undangan' className={LABEL_CLASS}>
              Link Dokumen Undangan <Required />
            </Label>
            <IconInput
              id='link-undangan'
              name='url_dokumen_undangan'
              icon={LinkIcon}
              type='url'
              placeholder='https://...'
              required
              defaultValue={defaultData?.url_dokumen_undangan}
            />
          </div>

          {/* KETERANGAN */}
          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='keterangan' className={LABEL_CLASS}>
              Keterangan
            </Label>
            <IconInput
              id='keterangan'
              name='keterangan'
              icon={NotebookPen}
              placeholder='Keterangan tambahan'
              defaultValue={defaultData?.keterangan ?? ""}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
