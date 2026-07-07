import { ChartConfig } from "@/components/ui/chart";

export const TREND_CONFIG = {
  submissions: {
    label: "Submissions",
    color: "#4f46e5", 
  },
} satisfies ChartConfig;

export const APPROVAL_CONFIG = {
  approved: {
    label: "Approved",
    color: "#6366f1",
  },
  rejected: {
    label: "Rejected",
    color: "#f97316", 
  },
} satisfies ChartConfig;
