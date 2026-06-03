// features/recognition/components/RecognitionDetailSection.tsx
import {
  ScrollText,
  Package,
  Home,
  Link as LinkIcon,
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
import { Rekognisi } from "../types";

const SELECT_CLASS =
  "w-full h-11 md:h-12 bg-white border-slate-200 rounded-xl focus:ring-[#0F4C81]/20";
const LABEL_CLASS = "text-slate-700 font-semibold text-xs";
const Required = () => <span className='text-red-500'>*</span>;

interface RecognitionDetailSectionProps {
  defaultData?: Rekognisi;
}

export function RecognitionDetailSection({
  defaultData,
}: RecognitionDetailSectionProps) {
  return (
    <Card className='w-full shadow-sm rounded-2xl border-slate-200 bg-white'>
      <CardContent className='p-6 md:p-8 flex flex-col gap-5'>
        {/* Header Section */}
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
            <ScrollText size={18} className='text-[#0F4C81]' />
          </div>
          <div>
            <p className='text-sm font-bold text-slate-800'>Data Rekognisi</p>
            <p className='text-xs text-slate-500'>
              Lengkapi informasi kegiatan rekognisi.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Sesuai Migrasi: 'jenis' (Enum) */}
          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              Jenis Rekognisi <Required />
            </Label>
            <Select name='jenis' required defaultValue={defaultData?.jenis}>
              <SelectTrigger className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Jenis' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='SERKOM'>
                  Sertifikasi Kompetensi (SERKOM)
                </SelectItem>
                <SelectItem value='JURIOR'>Juri/Pelatih (JURIOR)</SelectItem>
                <SelectItem value='JURINOR'>Juri/Pelatih (JURINOR)</SelectItem>
                <SelectItem value='KEYCONF'>
                  Keynote Speaker/Narasumber (KEYCONF)
                </SelectItem>
                <SelectItem value='KEYWORK'>
                  Keynote Speaker/Workshop (KEYWORK)
                </SelectItem>
                <SelectItem value='PAMERAN'>Pameran (PAMERAN)</SelectItem>
                <SelectItem value='KARYA'>Karya (KARYA)</SelectItem>
                <SelectItem value='BUKU'>Buku (BUKU)</SelectItem>
                <SelectItem value='PATEN'>Paten (PATEN)</SelectItem>
                <SelectItem value='PUB'>Publikasi (PUB)</SelectItem>
                <SelectItem value='DUTA'>Duta (DUTA)</SelectItem>
                <SelectItem value='PTG'>PTG (PTG)</SelectItem>
                <SelectItem value='PSB'>PSB (PSB)</SelectItem>
                <SelectItem value='PKD'>PKD (PKD)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sesuai Migrasi: 'level' (Enum) */}
          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              Level <Required />
            </Label>
            <Select name='level' required defaultValue={defaultData?.level}>
              <SelectTrigger className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Level' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='KAB'>Kabupaten/Kota</SelectItem>
                <SelectItem value='PROV'>Provinsi</SelectItem>
                <SelectItem value='NAS'>Nasional</SelectItem>
                <SelectItem value='INT'>Internasional</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Field lainnya sesuai resource */}
          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              Nama Kegiatan <Required />
            </Label>
            <IconInput
              name='nama'
              icon={Package}
              placeholder='Contoh: Juri Lomba IT'
              required
              defaultValue={defaultData?.nama}
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              Penyelenggara <Required />
            </Label>
            <IconInput
              name='penyelenggara'
              icon={Home}
              placeholder='Contoh: Kemdikbud'
              required
              defaultValue={defaultData?.penyelenggara}
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              URL Peserta <Required />
            </Label>
            <IconInput
              name='url_peserta'
              icon={LinkIcon}
              type='url'
              placeholder='https://...'
              required
              defaultValue={defaultData?.url_peserta}
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              URL Sertifikat <Required />
            </Label>
            <IconInput
              name='url_sertifikat'
              icon={LinkIcon}
              type='url'
              placeholder='https://...'
              required
              defaultValue={defaultData?.url_sertifikat}
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              Tanggal Sertifikat <Required />
            </Label>
            <Input
              name='tgl_sertifikat'
              type='date'
              required
              defaultValue={defaultData?.tgl_sertifikat?.slice(0, 10)}
              className='h-11 md:h-12 rounded-xl border-slate-200'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              URL Foto UPP <Required />
            </Label>
            <IconInput
              name='url_foto_upp'
              icon={LinkIcon}
              type='url'
              placeholder='https://...'
              required
              defaultValue={defaultData?.url_foto_upp}
            />
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label className={LABEL_CLASS}>
              URL Dokumen Undangan/Tugas <Required />
            </Label>
            <IconInput
              name='url_dokumen_undangan'
              icon={LinkIcon}
              type='url'
              placeholder='https://...'
              required
              defaultValue={defaultData?.url_dokumen_undangan}
            />
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label className={LABEL_CLASS}>Keterangan</Label>
            <IconInput
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
