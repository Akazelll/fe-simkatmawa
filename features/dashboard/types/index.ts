import { LucideIcon } from "lucide-react";

export type StatVariant = "navy" | "amber" | "emerald" | "rose";

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: number;
  variant: StatVariant;
}

export interface Activity {
  id: string;
  name: string;
  initials: string;
  colorClass: string;
  action: string;
  subject: string;
  time: string;
}