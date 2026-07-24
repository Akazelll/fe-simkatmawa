"use client";

import { useSearchParams } from "next/navigation";
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

type OptionItem = { value: string; label: string };

const JENIS_GROUP_OPTIONS: Record<string, OptionItem[]> = {
  juri: [
    { value: "JURIOR", label: "Juri/Pelatih Olahraga" },
    { value: "JURINOR", label: "Juri/Pelatih Non Olahraga" },
  ],
  keynote: [
    { value: "KEYCONF", label: "Keynote Speaker Conference" },
    { value: "KEYWORK", label: "Keynote Speaker Workshop / Pelatihan" },
  ],
  karya_seni: [
    { value: "PAMERAN", label: "Pameran Karya Seni" },
    { value: "KARYA", label: "Cipta Lagu / Tari" },
  ],
  buku: [{ value: "BUKU", label: "Penulis Buku" }],
  paten: [{ value: "PATEN", label: "Paten / Paten Sederhana" }],
  publikasi: [{ value: "PUB", label: "Publikasi Artikel Ilmiah" }],
  duta: [{ value: "DUTA", label: "Duta / Brand Ambassador" }],
  produk: [
    { value: "PTG", label: "Produk Teknologi Tepat Guna" },
    { value: "PSB", label: "Produk Seni dan Budaya" },
    { value: "PKD", label: "Produk Kreatif Dunia Usaha dan Industri" },
  ],
};

const ALL_JENIS_OPTIONS: OptionItem[] = [
  { value: "SERKOM", label: "Sertifikasi Kompetensi (SERKOM)" },
  { value: "JURIOR", label: "Juri/Pelatih Olahraga (JURIOR)" },
  { value: "JURINOR", label: "Juri/Pelatih Non Olahraga (JURINOR)" },
  { value: "KEYCONF", label: "Keynote Speaker Conference (KEYCONF)" },
  { value: "KEYWORK", label: "Keynote Speaker Workshop / Pelatihan (KEYWORK)" },
  { value: "PAMERAN", label: "Pameran Karya Seni (PAMERAN)" },
  { value: "KARYA", label: "Cipta Lagu / Tari (KARYA)" },
  { value: "BUKU", label: "Penulis Buku (BUKU)" },
  { value: "PATEN", label: "Paten (PATEN)" },
  { value: "PUB", label: "Publikasi Artikel Ilmiah (PUB)" },
  { value: "DUTA", label: "Duta / Brand Ambassador (DUTA)" },
  { value: "PTG", label: "Produk Teknologi Tepat Guna (PTG)" },
  { value: "PSB", label: "Produk Seni dan Budaya (PSB)" },
  { value: "PKD", label: "Produk Kreatif Dunia Usaha dan Industri (PKD)" },
];

interface RecognitionDetailSectionProps {
  defaultData?: Rekognisi;
}

export function RecognitionDetailSection({
  defaultData,
}: RecognitionDetailSectionProps) {
  const searchParams = useSearchParams();
  const jenisGroupParam = searchParams.get("jenis_group");

  const availableOptions = jenisGroupParam
    ? JENIS_GROUP_OPTIONS[jenisGroupParam] || ALL_JENIS_OPTIONS
    : ALL_JENIS_OPTIONS;

  const isSingleOption = availableOptions.length === 1;

  const selectedJenisValue = defaultData?.jenis
    ? defaultData.jenis
    : isSingleOption
    ? availableOptions[0].value
    : undefined;

  const isLocked = isSingleOption && Boolean(jenisGroupParam);

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
          {/* Jenis Rekognisi */}
          <div className='flex flex-col gap-1.5'>
            <Label className={LABEL_CLASS}>
              Jenis Rekognisi <Required />
            </Label>
            {isLocked && (
              <input type='hidden' name='jenis' value={selectedJenisValue} />
            )}
            <Select
              name={isLocked ? undefined : "jenis"}
              required
              disabled={isLocked}
              value={selectedJenisValue}
              defaultValue={selectedJenisValue}
            >
              <SelectTrigger className={SELECT_CLASS}>
                <SelectValue placeholder='Pilih Jenis' />
              </SelectTrigger>
              <SelectContent>
                {availableOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isLocked && (
              <span className='text-[11px] font-medium text-slate-400'>
                Jenis rekognisi terisi otomatis berdasarkan kelompok sidebar.
              </span>
            )}
          </div>

          {/* Level */}
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
              URL Dokumentasi Membawa Piala/Medali <Required />
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
