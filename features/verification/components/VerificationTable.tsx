import Link from "next/link";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VerificationSubmission } from "../types";

interface VerificationTableProps {
  data: VerificationSubmission[];
  startIndex: number;
}

export function VerificationTable({
  data,
  startIndex,
}: VerificationTableProps) {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white'>
      <Table>
        <TableHeader>
          <TableRow className='border-slate-100 hover:bg-transparent'>
            <TableHead className='w-12 text-[11px] font-bold tracking-widest uppercase text-slate-400 pl-6'>
              No
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Nama Submission
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Kategori
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Level
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Submitted By
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Tanggal
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-right pr-6'>
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.id}
              className='border-slate-100 hover:bg-slate-50/70 transition-colors'
            >
              <TableCell className='pl-6 text-sm text-slate-500 font-medium'>
                {startIndex + index + 1}
              </TableCell>
              <TableCell className='text-sm font-semibold text-slate-700'>
                {row.name}
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.category}
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.level}
              </TableCell>
              <TableCell className='text-sm text-slate-600 font-medium'>
                {row.submittedBy}
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.date.toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className='text-right pr-6'>
                <Link
                  href={`/verification/${row.id}`}
                  className={cn(
                    buttonVariants(),
                    "h-9 px-4 rounded-lg text-xs font-semibold bg-[#0F4C81] text-white shadow-sm transition-colors duration-150 hover:bg-[#0c3e6b] focus-visible:ring-2 focus-visible:ring-[#0F4C81]/30 focus-visible:ring-offset-2"
                  )}
                >
                  Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
