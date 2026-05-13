import { RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashedItem } from "../types";

interface RecycleBinTableProps {
  data: TrashedItem[];
  onRestoreClick: (item: TrashedItem) => void;
}

export function RecycleBinTable({
  data,
  onRestoreClick,
}: RecycleBinTableProps) {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white'>
      <Table>
        <TableHeader>
          <TableRow className='border-slate-100 hover:bg-transparent'>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 pl-6'>
              Nama Pengajuan
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Jenis
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Status Awal
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Deleted At
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Deleted By
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-right pr-6'>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              className='border-slate-100 hover:bg-slate-50/70 transition-colors'
            >
              <TableCell className='pl-6 font-semibold text-sm text-slate-700'>
                <div className='flex flex-col'>
                  <span>{row.name}</span>
                  <span className='text-[11px] text-slate-400 font-normal'>
                    {row.id}
                  </span>
                </div>
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.type}
              </TableCell>
              <TableCell>
                <Badge className='rounded-full px-3 py-0.5 text-xs font-semibold border-0 bg-slate-100 text-slate-500'>
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {new Date(row.deletedAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.deletedBy}
              </TableCell>
              <TableCell className='text-right pr-6'>
                <button
                  onClick={() => onRestoreClick(row)}
                  className='p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors'
                  title='Restore Data'
                >
                  <RefreshCcw size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
