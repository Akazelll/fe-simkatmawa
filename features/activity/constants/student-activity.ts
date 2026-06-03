import { LucideIcon, Send, CheckCheck, XCircle, CloudUpload, Pencil, LogIn } from "lucide-react";

export type StudentEventType =
  | "SUBMITTED"
  | "VERIFIED"
  | "REJECTED"
  | "SYNCED"
  | "EDITED"
  | "LOGIN";

export interface StudentActivityEvent {
  id: string;
  type: StudentEventType;
  title: string;
  description: string;
  targetType?: "Prestasi" | "Sertifikasi" | "Rekognisi";
  targetId?: string;
  targetHref?: string;
  timestamp: Date;
}

interface EventStyle {
  icon: LucideIcon;
  iconWrap: string;
  iconColor: string;
  dotColor: string;
}

export const EVENT_STYLE_MAP: Record<StudentEventType, EventStyle> = {
  SUBMITTED: {
    icon: Send,
    iconWrap: "bg-sky-50",
    iconColor: "text-sky-600",
    dotColor: "bg-sky-500",
  },
  VERIFIED: {
    icon: CheckCheck,
    iconWrap: "bg-emerald-50",
    iconColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
  },
  REJECTED: {
    icon: XCircle,
    iconWrap: "bg-rose-50",
    iconColor: "text-rose-600",
    dotColor: "bg-rose-500",
  },
  SYNCED: {
    icon: CloudUpload,
    iconWrap: "bg-cyan-50",
    iconColor: "text-cyan-600",
    dotColor: "bg-cyan-500",
  },
  EDITED: {
    icon: Pencil,
    iconWrap: "bg-amber-50",
    iconColor: "text-amber-600",
    dotColor: "bg-amber-500",
  },
  LOGIN: {
    icon: LogIn,
    iconWrap: "bg-slate-100",
    iconColor: "text-slate-500",
    dotColor: "bg-slate-400",
  },
};

// Tanggal dianggap berdasar today 2026-05-23 (sesuai memory currentDate)
const TODAY = new Date("2026-05-23T15:00:00");
const minus = (days: number, hours = 0) =>
  new Date(TODAY.getTime() - days * 86_400_000 - hours * 3_600_000);

export const STUDENT_ACTIVITY_DATA: StudentActivityEvent[] = [
  {
    id: "evt-001",
    type: "LOGIN",
    title: "Login ke sistem",
    description: "Login berhasil dari perangkat baru.",
    timestamp: minus(0, 1),
  },
  {
    id: "evt-002",
    type: "SYNCED",
    title: "Pengajuan tersinkron",
    description:
      "Rekognisi Klasifikasi Otomatis Korosi berhasil terbit di PD-Dikti.",
    targetType: "Rekognisi",
    targetId: "118203",
    targetHref: "/recognition",
    timestamp: minus(0, 4),
  },
  {
    id: "evt-003",
    type: "VERIFIED",
    title: "Pengajuan disetujui",
    description:
      "Rekognisi Klasifikasi Otomatis Korosi telah disetujui.",
    targetType: "Rekognisi",
    targetId: "118203",
    targetHref: "/recognition",
    timestamp: minus(1, 2),
  },
  {
    id: "evt-004",
    type: "REJECTED",
    title: "Pengajuan ditolak",
    description:
      "Sertifikat Microsoft Azure Fundamentals ditolak: link Drive tidak dapat diakses.",
    targetType: "Sertifikasi",
    targetId: "322870",
    targetHref: "/certificate",
    timestamp: minus(2, 3),
  },
  {
    id: "evt-005",
    type: "EDITED",
    title: "Mengubah pengajuan",
    description:
      "Memperbarui dokumen pendukung pada Sertifikat Microsoft Azure Fundamentals.",
    targetType: "Sertifikasi",
    targetId: "322870",
    targetHref: "/certificate",
    timestamp: minus(2, 6),
  },
  {
    id: "evt-006",
    type: "SUBMITTED",
    title: "Mengajukan pengajuan baru",
    description:
      "Submit pengajuan Prestasi: Lomba Ilustrasi – WAINI Vol.6 Animation Festival.",
    targetType: "Prestasi",
    targetId: "554930",
    targetHref: "/achievement",
    timestamp: minus(3, 5),
  },
  {
    id: "evt-007",
    type: "LOGIN",
    title: "Login ke sistem",
    description: "Login berhasil.",
    timestamp: minus(3, 8),
  },
  {
    id: "evt-008",
    type: "SUBMITTED",
    title: "Mengajukan pengajuan baru",
    description:
      "Submit pengajuan Sertifikasi: Skema Sertifikasi Ilmuan Data Madya.",
    targetType: "Sertifikasi",
    targetId: "322962",
    targetHref: "/certificate",
    timestamp: minus(5, 4),
  },
  {
    id: "evt-009",
    type: "SUBMITTED",
    title: "Mengajukan pengajuan baru",
    description:
      "Submit pengajuan Prestasi: Data Science Competition – GELAR RASA 2025.",
    targetType: "Prestasi",
    targetId: "554910",
    targetHref: "/achievement",
    timestamp: minus(7, 2),
  },
  {
    id: "evt-010",
    type: "VERIFIED",
    title: "Pengajuan disetujui",
    description:
      "Prestasi Malang Student Championship 2025 telah disetujui.",
    targetType: "Prestasi",
    targetId: "554043",
    targetHref: "/achievement",
    timestamp: minus(14, 1),
  },
  {
    id: "evt-011",
    type: "SYNCED",
    title: "Pengajuan tersinkron",
    description:
      "Prestasi Malang Student Championship 2025 berhasil terbit di PD-Dikti.",
    targetType: "Prestasi",
    targetId: "554043",
    targetHref: "/achievement",
    timestamp: minus(14, 4),
  },
  {
    id: "evt-012",
    type: "SUBMITTED",
    title: "Mengajukan pengajuan baru",
    description:
      "Submit pengajuan Prestasi: Industrial Chemical Engineering ICEN-C 2025.",
    targetType: "Prestasi",
    targetId: "554902",
    targetHref: "/achievement",
    timestamp: minus(18, 3),
  },
  {
    id: "evt-013",
    type: "EDITED",
    title: "Mengubah pengajuan",
    description:
      "Mengubah nama cabang pada Prestasi Lomba Ilustrasi WAINI Vol.6.",
    targetType: "Prestasi",
    targetId: "554930",
    targetHref: "/achievement",
    timestamp: minus(20, 7),
  },
  {
    id: "evt-014",
    type: "LOGIN",
    title: "Login ke sistem",
    description: "Login berhasil.",
    timestamp: minus(22, 10),
  },
  {
    id: "evt-015",
    type: "SUBMITTED",
    title: "Mengajukan pengajuan baru",
    description:
      "Submit pengajuan Rekognisi: Pembicara Konferensi Internasional ICITDA 2025.",
    targetType: "Rekognisi",
    targetId: "118187",
    targetHref: "/recognition",
    timestamp: minus(28, 5),
  },
  {
    id: "evt-016",
    type: "SUBMITTED",
    title: "Mengajukan pengajuan baru",
    description:
      "Submit pengajuan Sertifikasi: Sertifikat AWS Cloud Practitioner.",
    targetType: "Sertifikasi",
    targetId: "322905",
    targetHref: "/certificate",
    timestamp: minus(35, 8),
  },
];
