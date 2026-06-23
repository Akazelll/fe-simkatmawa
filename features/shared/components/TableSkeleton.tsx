import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Disamakan dengan konstanta gaya yang dipakai seluruh tabel asli.
const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-middle";

export interface SkeletonColumn {
  /** Kelas lebar kolom (th & td), mis. "w-24", "min-w-72", "w-[25%]". */
  width?: string;
  /** Perataan isi sel. */
  align?: "center" | "right";
  /** Jumlah tombol-ikon aksi (kotak h-8 w-8) untuk kolom aksi. */
  actions?: number;
  /** Render badge/status (rounded-full). */
  pill?: boolean;
  /** Override kelas bar skeleton di body, mis. "h-4 w-2/3" atau "h-8 w-28 rounded-lg". */
  cell?: string;
}

interface TableSkeletonProps {
  /** Konfigurasi kolom — usahakan sama persis dengan tabel aslinya. */
  columns?: SkeletonColumn[];
  /** Jumlah baris body (idealnya dari useSkeletonRows). */
  rows?: number;
  /** Header dalam-card (judul + deskripsi + tombol) seperti tabel Achievement/Certificate/Recognition. */
  header?: boolean;
  className?: string;
}

// Fallback generik (mirip tabel verifikasi/riwayat 5 kolom).
const DEFAULT_COLUMNS: SkeletonColumn[] = [
  { width: "w-[25%]" },
  { width: "w-[25%]", cell: "h-4 w-32" },
  { width: "w-[15%]", cell: "h-4 w-24" },
  { width: "w-[15%]", pill: true },
  { width: "w-[20%]", align: "right", cell: "h-8 w-24 rounded-lg" },
];

const alignBar = (align?: SkeletonColumn["align"]) =>
  align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : undefined;

const alignFlex = (align?: SkeletonColumn["align"]) =>
  align === "center"
    ? "justify-center"
    : align === "right"
      ? "justify-end"
      : "justify-start";

function CellContent({ col }: { col: SkeletonColumn }) {
  if (col.actions) {
    return (
      <div className={cn("flex items-center gap-2", alignFlex(col.align))}>
        {Array.from({ length: col.actions }).map((_, i) => (
          <Skeleton key={i} className='h-8 w-8 rounded-lg' />
        ))}
      </div>
    );
  }

  if (col.pill) {
    return (
      <Skeleton
        className={cn("h-6 w-20 rounded-full", alignBar(col.align))}
      />
    );
  }

  return <Skeleton className={cn(col.cell ?? "h-4 w-3/4", alignBar(col.align))} />;
}

export function TableSkeleton({
  columns = DEFAULT_COLUMNS,
  rows = 5,
  header = false,
  className,
}: TableSkeletonProps) {
  const lastIndex = columns.length - 1;

  return (
    <Card
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0",
        className,
      )}
    >
      {header && (
        <div className='flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-48' />
            <Skeleton className='h-4 w-72 max-w-full' />
          </div>
          <Skeleton className='h-10 w-32 shrink-0 rounded-xl' />
        </div>
      )}

      <Table>
        <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
          <TableRow className='hover:bg-transparent'>
            {columns.map((col, i) => (
              <TableHead
                key={i}
                className={cn(
                  HEAD_CLASS,
                  i === 0 && "pl-6",
                  i === lastIndex && "pr-6",
                  col.width,
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                )}
              >
                <Skeleton className={cn("h-3 w-16", alignBar(col.align))} />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: Math.max(rows, 1) }).map((_, r) => (
            <TableRow key={r} className='border-slate-100 hover:bg-transparent'>
              {columns.map((col, i) => (
                <TableCell
                  key={i}
                  className={cn(
                    CELL_BASE,
                    i === 0 && "pl-6",
                    i === lastIndex && "pr-6",
                    col.width,
                  )}
                >
                  <CellContent col={col} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
