import {
  FilePlus,
  FileUp,
  Send,
  SearchCheck,
  CheckCheck,
  PencilLine,
  CloudUpload,
  Award,
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
    title: "Input Data Pengajuan",
    description:
      "Mahasiswa menginput data prestasi, sertifikat, atau rekognisi pada formulir pengajuan.",
    icon: FilePlus,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    number: "02",
    title: "Upload Dokumen Bukti",
    description:
      "Unggah file pendukung seperti sertifikat, surat keterangan, atau dokumentasi.",
    icon: FileUp,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    number: "03",
    title: "Submit Pengajuan",
    description:
      "Pengajuan dikirim ke admin kemahasiswaan dan masuk antrean review.",
    icon: Send,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    number: "04",
    title: "Verifikasi oleh Admin",
    description:
      "Admin memeriksa kelengkapan data dan keabsahan dokumen yang diajukan.",
    icon: SearchCheck,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    number: "05",
    title: "Persetujuan / Penolakan",
    description:
      "Admin memberikan keputusan: approve jika valid, reject jika perlu diperbaiki.",
    icon: CheckCheck,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    number: "06",
    title: "Revisi Pengajuan",
    description:
      "Jika ditolak, mahasiswa dapat memperbaiki data lalu mengajukan ulang.",
    icon: PencilLine,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    number: "07",
    title: "Sinkronisasi Kemdikbud",
    description:
      "Data yang disetujui otomatis disinkronkan ke sistem PD-Dikti Kemdikbud.",
    icon: CloudUpload,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    number: "08",
    title: "Pengajuan Selesai",
    description:
      "Pengajuan tercatat resmi di SIMKATMAWA dan terhubung ke Kemdikbud.",
    icon: Award,
    color: "text-[#0F4C81]",
    bg: "bg-slate-100",
  },
];

export function WorkflowInfographic() {
  return (
    <Card className='rounded-2xl border-slate-200 bg-white shadow-sm'>
      <CardHeader>
        <CardTitle className='text-base font-semibold text-slate-800'>
          Alur Pengajuan SIMKATMAWA
        </CardTitle>
        <p className='text-sm text-slate-500'>
          Tahapan proses pengajuan prestasi, sertifikat, dan rekognisi
          mahasiswa.
        </p>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
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
