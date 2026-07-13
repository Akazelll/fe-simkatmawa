import { Trash2, RefreshCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function RecycleBinStatsSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
          "from-rose-400 to-red-500",
        )}
      >
        <CardContent className='relative p-6'>
          <div className='absolute -bottom-3 -right-2 h-22 w-22 rounded-full bg-white/10' />
          <div className='relative z-10'>
            <Skeleton className='h-8 w-20 rounded-lg bg-white/30' />
            <Skeleton className='mt-2 h-4 w-36 rounded-md bg-white/25' />
          </div>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
          "from-amber-400 to-orange-500",
        )}
      >
        <CardContent className='relative p-6'>
          <div className='absolute -bottom-3 -right-2 h-22 w-22 rounded-full bg-white/10' />
          <div className='relative z-10'>
            <Skeleton className='h-8 w-20 rounded-lg bg-white/30' />
            <Skeleton className='mt-2 h-4 w-36 rounded-md bg-white/25' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RecycleBinStats({ count }: { count: number }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
          "cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg",
          "from-rose-400 to-red-500",
        )}
      >
        <CardContent className='relative p-6'>
          <Trash2
            className='absolute -bottom-3 -right-2 text-white/15'
            size={88}
            strokeWidth={1.5}
          />
          <div className='relative z-10'>
            <div className='text-3xl font-bold leading-none'>{count}</div>
            <p className='mt-2 text-sm font-semibold text-white/95'>
              Total Data Terhapus
            </p>
          </div>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "relative overflow-hidden rounded-2xl border-0 text-white shadow-md ring-0 bg-linear-to-br",
          "cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg",
          "from-amber-400 to-orange-500",
        )}
      >
        <CardContent className='relative p-6'>
          <RefreshCcw
            className='absolute -bottom-3 -right-2 text-white/15'
            size={88}
            strokeWidth={1.5}
          />
          <div className='relative z-10'>
            <div className='text-3xl font-bold leading-none'>{count}</div>
            <p className='mt-2 text-sm font-semibold text-white/95'>
              Menunggu Restore
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
