import { Pencil, Trash2 } from "lucide-react";
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
import { AdminUser } from "../types";

interface UserTableProps {
  data: AdminUser[];
  onEdit: (user: AdminUser) => void; // <-- Tambahkan prop ini
}

export function UserTable({ data, onEdit }: UserTableProps) {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white'>
      <Table>
        <TableHeader>
          <TableRow className='border-slate-100 hover:bg-transparent'>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400 pl-6'>
              Name
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Email
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Role
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Status
            </TableHead>
            <TableHead className='text-[11px] font-bold tracking-widest uppercase text-slate-400'>
              Last Login
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
                {row.name}
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.email}
              </TableCell>
              <TableCell className='text-sm text-slate-600 font-medium'>
                {row.role}
              </TableCell>
              <TableCell>
                <Badge
                  className={`rounded-full px-3 py-0.5 text-xs font-semibold border-0 ${
                    row.status === "Active"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell className='text-sm text-slate-600'>
                {row.lastLogin.toLocaleString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell className='text-right pr-6'>
                <div className='flex items-center justify-end gap-1.5'>
                  <button
                    onClick={() => onEdit(row)}
                    className='p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors'
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className='p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors'
                    title='Delete'
                  >
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
