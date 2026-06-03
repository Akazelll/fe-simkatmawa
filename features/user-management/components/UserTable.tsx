"use client";

import { Edit2, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils/dateFormat";

const HEAD_CLASS =
  "h-12 text-[11px] font-bold tracking-wide uppercase text-slate-400 whitespace-nowrap";
const CELL_BASE = "py-4 align-middle text-sm text-slate-600";

interface UserTableProps {
  data: any[];
  isLoading: boolean;
  onEdit: (user: any) => void;
  onDelete: (user: any) => void;
}

export function UserTable({
  data,
  isLoading,
  onEdit,
  onDelete,
}: UserTableProps) {
  if (isLoading) {
    return (
      <Card className='border-slate-200 shadow-sm rounded-2xl p-12 flex justify-center items-center bg-white'>
        <div className='animate-pulse flex flex-col items-center gap-2'>
          <div className='w-8 h-8 border-4 border-[#0F4C81] border-t-transparent rounded-full animate-spin'></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden p-0'>
      <Table>
        <TableHeader className='bg-slate-50/50 border-b border-slate-100'>
          <TableRow className='hover:bg-transparent'>
            <TableHead className={`${HEAD_CLASS} pl-6`}>Nama</TableHead>
            <TableHead className={HEAD_CLASS}>Email</TableHead>
            <TableHead className={HEAD_CLASS}>Role</TableHead>
            <TableHead className={HEAD_CLASS}>Status</TableHead>
            <TableHead className={HEAD_CLASS}>Terakhir Login</TableHead>
            <TableHead className={`${HEAD_CLASS} pr-6 text-right`}>
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className='h-32 text-center text-sm font-medium text-slate-500'
              >
                Tidak ada data pengguna ditemukan.
              </TableCell>
            </TableRow>
          ) : (
            data.map((user) => {
              const roleName =
                user.roles?.[0]?.name || user.role || "Tanpa Role";
              const isActive = user.is_active !== false;

              return (
                <TableRow
                  key={user.id}
                  className='border-b border-slate-100 hover:bg-slate-50/70'
                >
                  <TableCell
                    className={`${CELL_BASE} pl-6 font-semibold text-slate-800`}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell className={CELL_BASE}>{user.email}</TableCell>
                  <TableCell className={CELL_BASE}>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase ${
                        roleName === "admin" || roleName === "superadmin"
                          ? "bg-sky-100 text-sky-700"
                          : roleName === "mahasiswa"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {roleName}
                    </span>
                  </TableCell>
                  <TableCell className={CELL_BASE}>
                    <span
                      className={`flex items-center gap-1.5 text-xs font-semibold ${
                        isActive ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      ></span>
                      {isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </TableCell>
                  <TableCell className={CELL_BASE}>
                    {user.last_login_at
                      ? formatDateTime(user.last_login_at)
                      : "Belum pernah"}
                  </TableCell>
                  <TableCell className={`${CELL_BASE} pr-6 text-right`}>
                    <div className='flex items-center justify-end gap-1'>
                      <Button
                        type='button'
                        onClick={() => onEdit(user)}
                        variant='ghost'
                        className='h-8 w-8 p-0 rounded-lg text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors focus-visible:ring-2 focus-visible:ring-sky-300'
                        title='Edit Pengguna'
                      >
                        <Edit2 size={16} />
                      </Button>

                      <Button
                        type='button'
                        onClick={() => onDelete(user)}
                        variant='ghost'
                        className='h-8 w-8 p-0 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors focus-visible:ring-2 focus-visible:ring-rose-300'
                        title='Hapus Pengguna'
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
