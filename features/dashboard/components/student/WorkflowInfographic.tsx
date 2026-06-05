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
  iconColor: string;
  bg: string;
  border: string;
  numberColor: string;
  stopColor: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Pilih Jenis Pengajuan",
    description:
      "Buka menu Submission di sidebar, lalu pilih Prestasi, Sertifikasi, atau Rekognisi.",
    icon: MousePointerClick,
    iconColor: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-300",
    numberColor: "text-sky-600",
    stopColor: "#7dd3fc",
  },
  {
    number: "02",
    title: "Klik “Tambah Data”",
    description:
      "Tombol biru di pojok kanan atas halaman daftar untuk membuat pengajuan baru.",
    icon: Plus,
    iconColor: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-300",
    numberColor: "text-indigo-600",
    stopColor: "#a5b4fc",
  },
  {
    number: "03",
    title: "Lengkapi Form Pengajuan",
    description:
      "Isi semua data — nama kompetisi, level, kategori, dan informasi lainnya.",
    icon: ClipboardEdit,
    iconColor: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-300",
    numberColor: "text-amber-600",
    stopColor: "#fcd34d",
  },
  {
    number: "04",
    title: "Tambah Anggota & Dosen",
    description:
      "Masukkan NIM dan nama anggota kelompok (jika ada) serta dosen pendamping.",
    icon: Users,
    iconColor: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-300",
    numberColor: "text-violet-600",
    stopColor: "#c4b5fd",
  },
  {
    number: "05",
    title: "Lampirkan Dokumen Bukti",
    description:
      "Sertakan link sertifikat, foto kegiatan, dan dokumen pendukung lainnya.",
    icon: LinkIcon,
    iconColor: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-300",
    numberColor: "text-rose-600",
    stopColor: "#fda4af",
  },
  {
    number: "06",
    title: "Simpan & Pantau Status",
    description:
      "Klik Simpan Data, lalu pantau status pengajuan kamu di halaman daftar.",
    icon: Eye,
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    numberColor: "text-emerald-600",
    stopColor: "#6ee7b7",
  },
];

// Geometri buat desktop curvy timeline
const VB_W = 1200;
const VB_H = 460;
const PAD_X = 80;
const HIGH_Y = 200;
const LOW_Y = 260;
const TEXT_OFFSET_PCT = 10;

const COORDS = STEPS.map((_, i) => ({
  cx: PAD_X + (i * (VB_W - 2 * PAD_X)) / (STEPS.length - 1),
  cy: i % 2 === 0 ? HIGH_Y : LOW_Y,
}));

const buildPath = () => {
  let d = `M ${COORDS[0].cx} ${COORDS[0].cy}`;
  for (let i = 1; i < COORDS.length; i++) {
    const prev = COORDS[i - 1];
    const curr = COORDS[i];
    const midX = (prev.cx + curr.cx) / 2;
    d += ` C ${midX} ${prev.cy}, ${midX} ${curr.cy}, ${curr.cx} ${curr.cy}`;
  }
  return d;
};

function StepCircle({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <div
      className={`h-14 w-14 rounded-full ${step.bg} ${step.iconColor} border-2 ${step.border} ring-4 ring-white shadow-md flex items-center justify-center shrink-0`}
    >
      <Icon size={22} strokeWidth={2} />
    </div>
  );
}

function StepText({ step }: { step: Step }) {
  return (
    <div className='flex flex-col gap-1 text-center w-[180px] px-2'>
      <span
        className={`text-xs font-extrabold tracking-widest ${step.numberColor}`}
      >
        {step.number}
      </span>
      <h3 className='text-[13px] font-bold text-slate-800 leading-tight'>
        {step.title}
      </h3>
      <p className='text-[11px] leading-relaxed text-slate-500'>
        {step.description}
      </p>
    </div>
  );
}

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
        {/* MOBILE: vertical timeline */}
        <div className='flex flex-col gap-1 lg:hidden'>
          {STEPS.map((step, i) => {
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.number} className='flex gap-4'>
                <div className='flex flex-col items-center'>
                  <StepCircle step={step} />
                  {!isLast && (
                    <div className='flex-1 w-px bg-slate-200 my-2 min-h-[24px]' />
                  )}
                </div>
                <div className='flex-1 pb-4 pt-2'>
                  <span
                    className={`text-xs font-extrabold tracking-widest ${step.numberColor}`}
                  >
                    {step.number}
                  </span>
                  <h3 className='text-sm font-bold text-slate-800 mt-0.5'>
                    {step.title}
                  </h3>
                  <p className='text-xs text-slate-500 mt-1 leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* DESKTOP: wavy S-curve timeline */}
        <div
          className='hidden lg:block relative w-full'
          style={{ height: `${VB_H}px` }}
        >
          {/* Wavy SVG curve */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className='absolute inset-0 w-full h-full'
            preserveAspectRatio='none'
            aria-hidden
          >
            <defs>
              <linearGradient id='wfGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                {STEPS.map((s, i) => (
                  <stop
                    key={i}
                    offset={`${(i / (STEPS.length - 1)) * 100}%`}
                    stopColor={s.stopColor}
                  />
                ))}
              </linearGradient>
            </defs>
            <path
              d={buildPath()}
              stroke='url(#wfGradient)'
              strokeWidth='3'
              fill='none'
              strokeLinecap='round'
            />
          </svg>

          {/* Circles + text overlay */}
          {STEPS.map((step, i) => {
            const { cx, cy } = COORDS[i];
            const isHigh = cy === HIGH_Y;
            const circleLeft = (cx / VB_W) * 100;
            const circleTop = (cy / VB_H) * 100;
            // Text label: above high circles, below low circles
            const textTop = isHigh
              ? `${circleTop - TEXT_OFFSET_PCT}%`
              : `${circleTop + TEXT_OFFSET_PCT}%`;
            const textTransform = isHigh
              ? "translate(-50%, -100%)"
              : "translate(-50%, 0)";

            return (
              <div key={step.number}>
                {/* Text label */}
                <div
                  className='absolute'
                  style={{
                    left: `${circleLeft}%`,
                    top: textTop,
                    transform: textTransform,
                  }}
                >
                  <StepText step={step} />
                </div>

                {/* Circle */}
                <div
                  className='absolute'
                  style={{
                    left: `${circleLeft}%`,
                    top: `${circleTop}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <StepCircle step={step} />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
