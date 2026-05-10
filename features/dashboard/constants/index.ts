import {
  CheckCircle2,
  Clock,
  FileText,
  RefreshCw,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";
import { Activity, StatCardProps } from "../types";

// --- STATS GRID DATA ---
export const STATS_DATA: StatCardProps[] = [
  {
    icon: FileText,
    label: "Total Submissions",
    value: "1,247",
    trend: 12.5,
    variant: "navy",
  },
  {
    icon: Clock,
    label: "Pending Review",
    value: "43",
    trend: -8.2,
    variant: "amber",
  },
  {
    icon: CheckCircle2,
    label: "Approved",
    value: "892",
    trend: 15.3,
    variant: "emerald",
  },
  {
    icon: XCircle,
    label: "Rejected",
    value: "127",
    trend: 3.1,
    variant: "rose",
  },
  {
    icon: RefreshCw,
    label: "Synced to Kemdikbud",
    value: "856",
    trend: 18.7,
    variant: "navy",
  },
  {
    icon: AlertCircle,
    label: "Sync Failed",
    value: "12",
    trend: -25.0,
    variant: "rose",
  },
];

// --- SUBMISSION TRENDS CHART DATA ---
export const TREND_DATA = [
  { month: "Oct", submissions: 140 },
  { month: "Nov", submissions: 160 },
  { month: "Dec", submissions: 175 },
  { month: "Jan", submissions: 195 },
  { month: "Feb", submissions: 220 },
  { month: "Mar", submissions: 245 },
];

export const TREND_CONFIG = {
  submissions: {
    label: "Submissions",
    color: "#0F4C81",
  },
} satisfies ChartConfig;

// --- APPROVAL RATE CHART DATA ---
export const APPROVAL_DATA = [
  { category: "Prestasi", approved: 387, rejected: 42 },
  { category: "Sertifikasi", approved: 312, rejected: 56 },
  { category: "Rekognisi", approved: 193, rejected: 25 },
];  

export const APPROVAL_CONFIG = {
  approved: {
    label: "Approved",
    color: "#10b981",
  },
  rejected: {
    label: "Rejected",
    color: "#ef4444",
  },
} satisfies ChartConfig;
