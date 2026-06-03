import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StatCardProps, StatVariant } from "../types";

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
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white'>
      <CardContent className='p-6 flex items-center justify-between'>
        {/* Kiri: Icon */}
        <div
          className={cn(
            "h-12 w-12 flex items-center justify-center rounded-xl shrink-0",
            styles.iconWrap,
          )}
        >
          <Icon size={22} />
        </div>

        {/* Kanan: Info Submission (Value & Label) */}
        <div className='flex flex-col items-end text-right'>
          <div className={cn("text-3xl font-bold mb-1", styles.value)}>
            {value}
          </div>
          <div className={cn("text-sm font-medium", styles.label)}>{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
