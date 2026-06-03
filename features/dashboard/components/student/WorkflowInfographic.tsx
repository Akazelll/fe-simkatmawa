import {
  MousePointerClick,
  Plus,
  ClipboardEdit,
  Users,
  Link as LinkIcon,
  Eye,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Pilih Jenis Pengajuan",
    description:
      "Buka menu Submission di sidebar, lalu pilih Prestasi, Sertifikasi, atau Rekognisi.",
    icon: MousePointerClick,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    number: "02",
    title: "Klik “Tambah Data”",
    description:
      "Tombol biru di pojok kanan atas halaman daftar untuk membuat pengajuan baru.",
    icon: Plus,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    number: "03",
    title: "Lengkapi Form Pengajuan",
    description:
      "Isi semua data — nama kompetisi, level, kategori, dan informasi lainnya.",
    icon: ClipboardEdit,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    number: "04",
    title: "Tambah Anggota & Dosen",
    description:
      "Masukkan NIM dan nama anggota kelompok (jika ada) serta dosen pendamping.",
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    number: "05",
    title: "Lampirkan Dokumen Bukti",
    description:
      "Sertakan link sertifikat, foto kegiatan, dan dokumen pendukung lainnya.",
    icon: LinkIcon,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    number: "06",
    title: "Simpan & Pantau Status",
    description:
      "Klik Simpan Data, lalu pantau status pengajuan kamu di halaman daftar.",
    icon: Eye,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export function WorkflowInfographic() {
  return (
    <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
      <CardHeader>
        <CardTitle className='text-base font-semibold text-slate-800'>
          Cara Mengajukan di SIMKATMAWA
        </CardTitle>
        <p className='text-sm text-slate-500'>
          Ikuti enam langkah berikut untuk mengajukan prestasi, sertifikasi,
          atau rekognisi kamu.
        </p>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className='group relative flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-md'
              >
                <span className='absolute right-4 top-4 text-xs font-bold text-slate-300'>
                  {step.number}
                </span>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.bg} ${step.color}`}
                >
                  <Icon size={22} strokeWidth={2} />
                </div>

                <div className='flex flex-col gap-1.5'>
                  <h3 className='text-sm font-bold text-slate-800'>
                    {step.title}
                  </h3>
                  <p className='text-xs leading-relaxed text-slate-500'>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
