import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { StatCardProps, StatVariant } from "../types";

const VARIANT_GRADIENTS: Record<StatVariant, string> = {
  navy: "from-[#1769aa] to-[#0F4C81]",
  amber: "from-amber-400 to-orange-500",
  emerald: "from-emerald-400 to-green-500",
  rose: "from-rose-400 to-red-500",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  variant,
}: StatCardProps) {
  const gradient = VARIANT_GRADIENTS[variant];
  const isUp = trend >= 0;
  const TrendIcon = isUp ? TrendingUp : TrendingDown;
  const sign = isUp ? "+" : "";

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
        "cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg",
        gradient,
      )}
    >
      <CardContent className='relative p-6'>
        {/* Watermark icon di pojok kanan bawah */}
        <Icon
          className='absolute -bottom-3 -right-2 text-white/15'
          size={88}
          strokeWidth={1.5}
        />

        <div className='relative z-10'>
          <div className='text-3xl font-bold leading-none'>{value}</div>
          <p className='mt-2 text-sm font-semibold text-white/95'>{label}</p>
          {trend !== 0 && (
            <div className='mt-3 flex items-center gap-1.5 text-xs font-medium text-white/80'>
              <TrendIcon size={14} />
              {sign}
              {trend}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
export function StatCardSkeleton({
  variant = "navy",
}: {
  variant?: StatVariant;
}) {
  const gradient = VARIANT_GRADIENTS[variant];

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
        gradient,
      )}
    >
      <CardContent className='relative p-6'>
        {/* Watermark bulat meniru ikon di pojok kanan bawah */}
        <div className='absolute -bottom-3 -right-2 h-22 w-22 rounded-full bg-white/10' />

        <div className='relative z-10'>
          {/* value -> meniru text-3xl leading-none */}
          <Skeleton className='h-8 w-20 rounded-lg bg-white/30' />
          {/* label -> meniru mt-2 text-sm */}
          <Skeleton className='mt-2 h-4 w-28 rounded-md bg-white/25' />
        </div>
      </CardContent>
    </Card>
  );
}
