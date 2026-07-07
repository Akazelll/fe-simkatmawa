import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChartSkeletonProps {
  /** "area" untuk grafik area/garis, "bar" untuk grafik batang. */
  variant?: "area" | "bar";
  className?: string;
}

// Tinggi batang dibuat statis (bukan acak) agar konsisten antara server & client.
const BAR_HEIGHTS = [
  "h-[45%]",
  "h-[70%]",
  "h-[55%]",
  "h-[85%]",
  "h-[60%]",
  "h-[40%]",
];

/**
 * Skeleton untuk kartu grafik dashboard (SubmissionTrendsChart / ApprovalRateChart):
 * judul + area plot h-[260px] lengkap dengan tick sumbu Y, garis grid, seri, dan label sumbu X.
 */
export function ChartSkeleton({
  variant = "bar",
  className,
}: ChartSkeletonProps) {
  return (
    <Card
      className={cn("border-slate-200 shadow-sm rounded-2xl bg-white", className)}
    >
      <CardHeader>
        <Skeleton className='h-5 w-56 max-w-[70%]' />
      </CardHeader>
      <CardContent>
        <div className='flex h-[260px] w-full gap-3'>
          {/* Tick sumbu Y */}
          <div className='flex flex-col justify-between py-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className='h-3 w-6' />
            ))}
          </div>

          {/* Area plot */}
          <div className='relative flex flex-1 flex-col'>
            {/* Garis grid horizontal */}
            <div className='absolute inset-x-0 top-1 bottom-7 flex flex-col justify-between'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className='border-t border-dashed border-slate-100'
                />
              ))}
            </div>

            {/* Seri data */}
            <div className='relative flex flex-1 items-end gap-3 pb-2'>
              {variant === "area" ? (
                <Skeleton className='h-[55%] w-full rounded-b-none rounded-t-xl' />
              ) : (
                BAR_HEIGHTS.map((h, i) => (
                  <Skeleton
                    key={i}
                    className={cn("flex-1 rounded-b-none rounded-t-md", h)}
                  />
                ))
              )}
            </div>

            {/* Label sumbu X */}
            <div className='flex items-center justify-between'>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className='h-3 w-8' />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
