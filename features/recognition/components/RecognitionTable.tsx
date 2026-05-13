import { Eye, Pencil, Trash2 } from "lucide-react";
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
import { Rekognisi } from "../types";

export function RecognitionTable({ data }: { data: Rekognisi[] }) {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white'>
      <Table>
        <TableHeader>
          <TableRow className='border-slate-100 hover:bg-transparent'>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-center'>
              Nama
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-center'>
              Level
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-center'>
              Penyelenggara
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-center'>
              Status
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-center'>
              Tanggal
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 text-center'>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              className='border-slate-100 hover:bg-slate-50/70 transition-colors'
            >
              <TableCell className='pl-6 font-semibold text-sm text-slate-600'>
                {row.name}
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.level}
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.penyelenggara}
              </TableCell>
              <TableCell>
                <Badge
                  className={`rounded-full px-3 py-0.5 text-xs font-semibold border-0 ${row.status === "Sync_Success" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                >
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {new Date(row.tanggal).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className='pr-6 text-right'>
                <div className='flex items-center justify-end gap-1.5'>
                  <button className='p-1.5 rounded-lg text-sky-500 hover:bg-sky-50 transition-colors'>
                    <Eye size={16} />
                  </button>
                  <button className='p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors'>
                    <Pencil size={16} />
                  </button>
                  <button className='p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors'>
                    <Trash2 size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
