import { ScrollText, Package, Home, Link as LinkIcon, NotebookPen } from "lucide-react";
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
import { LEVEL_OPTIONS } from "@/features/achievement/constants";

const SELECT_CLASS =
  "w-full h-11 md:h-12 bg-white border-slate-200 rounded-xl focus:ring-[#0F4C81]/20 transition-all text-slate-600";

const LABEL_CLASS = "text-slate-700 font-semibold text-xs";

const Required = () => <span className='text-red-500'>*</span>;

export function CertificateDetailSection() {
  return (
    <Card className='w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white'>
      <CardContent className='p-6 md:p-8 flex flex-col gap-5'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center bg-[#6CBDFE1A] p-2 rounded-xl'>
            <ScrollText size={18} className='text-[#0F4C81]' />
          </div>
          <div className='flex flex-col gap-0.5'>
            <p className='text-sm font-bold text-slate-800 leading-none'>
              Data Sertifikasi
            </p>
            <p className='text-xs text-slate-500'>
              Informasi sertifikasi profesi dan dokumen bukti.
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
            <Label htmlFor='nama-sertifikasi' className={LABEL_CLASS}>
              Nama Sertifikasi <Required />
            </Label>
            <IconInput
              id='nama-sertifikasi'
              icon={Package}
              placeholder='Nama Sertifikasi'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='penyelenggara' className={LABEL_CLASS}>
              Penyelenggara <Required />
            </Label>
            <IconInput
              id='penyelenggara'
              icon={Home}
              placeholder='Penyelenggara'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5 md:col-span-2'>
            <Label htmlFor='url-sertifikasi' className={LABEL_CLASS}>
              URL Sertifikasi <Required />
            </Label>
            <IconInput
              id='url-sertifikasi'
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
              Link Foto
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
