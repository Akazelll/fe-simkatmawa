import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface DetailSkeletonProps {
  /** Jumlah field pada kartu informasi (grid). */
  fields?: number;
  /** Jumlah dokumen pada kartu dokumen pendukung. */
  documents?: number;
  /** Tampilkan kartu "orang terlibat" (mahasiswa & dosen). */
  withPeople?: boolean;
  className?: string;
}

const CARD_CLASS = "border-slate-200 shadow-sm rounded-2xl bg-white";

function FieldSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-3 w-20' />
      <Skeleton className='h-4 w-3/4' />
    </div>
  );
}

/**
 * Skeleton untuk halaman detail (mis. PrestasiDetailView): kartu info dengan
 * grid label/value, kartu dokumen, dan opsional kartu mahasiswa & dosen.
 */
export function DetailSkeleton({
  fields = 7,
  documents = 4,
  withPeople = true,
  className,
}: DetailSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Kartu informasi utama */}
      <Card className={CARD_CLASS}>
        <CardContent className='p-6 md:p-8'>
          <div className='mb-7 flex items-start justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-6 w-64 max-w-full' />
              <Skeleton className='h-4 w-48 max-w-full' />
            </div>
            <Skeleton className='h-6 w-24 shrink-0 rounded-full' />
          </div>

          <div className='grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: fields }).map((_, i) => (
              <FieldSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kartu dokumen pendukung */}
      <Card className={CARD_CLASS}>
        <CardContent className='p-6 md:p-8'>
          <Skeleton className='mb-5 h-4 w-40' />
          <div className='grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: documents }).map((_, i) => (
              <FieldSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Kartu orang terlibat */}
      {withPeople && (
        <Card className={CARD_CLASS}>
          <CardContent className='flex flex-col gap-7 p-6 md:p-8'>
            {[0, 1].map((section) => (
              <div key={section}>
                <Skeleton className='mb-4 h-4 w-40' />
                <div className='flex flex-col gap-3'>
                  {[0, 1].map((row) => (
                    <div key={row} className='flex items-center gap-4 py-1'>
                      <Skeleton className='h-3 w-32 shrink-0' />
                      <Skeleton className='h-4 w-40 max-w-full' />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
