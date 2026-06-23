import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface FormSkeletonProps {
  /** Jumlah field per section — satu angka per kartu section. */
  sections?: number[];
  /** Tampilkan area tombol (kembali + simpan) di bagian bawah. */
  footer?: boolean;
  className?: string;
}

const CARD_CLASS =
  "w-full shadow-sm rounded-2xl border-slate-200 overflow-hidden bg-white";

function FieldSkeleton() {
  return (
    <div className='flex flex-col gap-1.5'>
      <Skeleton className='h-3 w-24' />
      <Skeleton className='h-11 w-full rounded-xl md:h-12' />
    </div>
  );
}

/**
 * Skeleton untuk halaman form (create/edit, settings): kartu-kartu section,
 * tiap section punya header (ikon + judul) dan grid input 2 kolom.
 */
export function FormSkeleton({
  sections = [12, 4, 4],
  footer = true,
  className,
}: FormSkeletonProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {sections.map((fieldCount, s) => (
        <Card key={s} className={CARD_CLASS}>
          <CardContent className='flex flex-col gap-5 p-6 md:p-8'>
            {/* Header section: ikon + judul + subjudul */}
            <div className='flex items-center gap-3'>
              <Skeleton className='h-9 w-9 shrink-0 rounded-xl' />
              <div className='flex flex-col gap-1.5'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-48 max-w-full' />
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {Array.from({ length: fieldCount }).map((_, i) => (
                <FieldSkeleton key={i} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {footer && (
        <div className='flex items-center justify-end gap-3'>
          <Skeleton className='h-11 w-28 rounded-xl' />
          <Skeleton className='h-11 w-32 rounded-xl' />
        </div>
      )}
    </div>
  );
}
