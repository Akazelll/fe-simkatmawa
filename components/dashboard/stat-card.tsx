import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatVariant = "navy" | "amber" | "emerald" | "rose";

const VARIANT_STYLES: Record<
  StatVariant,
  { iconWrap: string; value: string; label: string }
> = {
  navy: {
    iconWrap: "bg-slate-100 text-[#0F4C81]",
    value: "text-[#0F4C81]",
    label: "text-slate-500",
  },
  amber: {
    iconWrap: "bg-amber-50 text-amber-500",
    value: "text-amber-500",
    label: "text-amber-500",
  },
  emerald: {
    iconWrap: "bg-emerald-50 text-emerald-600",
    value: "text-emerald-600",
    label: "text-emerald-600",
  },
  rose: {
    iconWrap: "bg-rose-50 text-rose-600",
    value: "text-rose-600",
    label: "text-rose-600",
  },
};

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: number;
  variant: StatVariant;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  variant,
}: StatCardProps) {
  const styles = VARIANT_STYLES[variant];
  const isUp = trend >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  const trendColor = isUp ? "text-emerald-600" : "text-rose-500";
  const sign = isUp ? "+" : "";

  return (
    <Card className="border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "h-12 w-12 flex items-center justify-center rounded-xl",
              styles.iconWrap
            )}
          >
            <Icon size={22} />
          </div>
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-semibold",
              trendColor
            )}
          >
            <TrendIcon size={14} />
            {sign}
            {trend.toFixed(1)}%
          </div>
        </div>
        <div className={cn("text-3xl font-bold mb-1", styles.value)}>
          {value}
        </div>
        <div className={cn("text-sm font-medium", styles.label)}>{label}</div>
      </CardContent>
    </Card>
  );
}
