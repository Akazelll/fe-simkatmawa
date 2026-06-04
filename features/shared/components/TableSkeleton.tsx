// features/shared/components/TableSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className='w-full border rounded-xl bg-white p-4 shadow-sm space-y-5'>
      {/* Skeleton untuk Header Tabel */}
      <div className='flex gap-4 border-b pb-4'>
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-6 w-1/4' />
        <Skeleton className='h-6 w-1/4' />
      </div>

      {/* Skeleton untuk Baris Data (Looping 5 baris) */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className='flex gap-4 py-2 border-b last:border-0 items-center'
        >
          <Skeleton className='h-5 w-1/4' />
          <Skeleton className='h-5 w-1/4' />
          <Skeleton className='h-5 w-1/4' />
          <div className='w-1/4 flex gap-2'>
            {/* Simulasi skeleton untuk tombol aksi (opsional) */}
            <Skeleton className='h-8 w-20 rounded-lg' />
            <Skeleton className='h-8 w-8 rounded-lg' />
          </div>
        </div>
      ))}
    </div>
  );
}
