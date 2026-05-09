import {
  CheckCircle2,
  Clock,
  FileText,
  RefreshCw,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { StatCard, type StatCardProps } from "./stat-card";

const STATS: StatCardProps[] = [
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

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
