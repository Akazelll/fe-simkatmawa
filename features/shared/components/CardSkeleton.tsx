"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  className?: string;
  hasHeader?: boolean;
  lines?: number;
}

export function CardSkeleton({
  className,
  hasHeader = true,
  lines = 3,
}: CardSkeletonProps) {
  return (
    <div
      className={cn(
        "border border-slate-200 rounded-xl bg-white p-6 shadow-sm flex flex-col gap-5",
        className,
      )}
    >
      {hasHeader && <Skeleton className='h-7 w-1/3' />}

      <div className='space-y-3'>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")}
          />
        ))}
      </div>
    </div>
  );
}
