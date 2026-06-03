"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

import { ActivityLog } from "../types";
import { getChangedFields } from "../utils/getChangedFields";
import { ActivityActionBadge } from "@/features/shared/components/ActivityActionBadge";

interface Props {
  log: ActivityLog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActivityLogDetailModal({ log, open, onOpenChange }: Props) {
  if (!log) return null;

  const changedFields = getChangedFields(log);

  const renderValue = (text: string | null) => {
    if (!text) {
      return <span className='text-slate-400'>—</span>;
    }

    if (text.startsWith("http://") || text.startsWith("https://")) {
      return (
        <a
          href={text}
          target='_blank'
          rel='noreferrer'
          title={text}
          className='flex w-full min-w-0 items-center gap-1.5 text-blue-600 transition-colors hover:text-blue-700 hover:underline'
        >
          <span className='truncate font-medium'>{text}</span>
          <ExternalLink className='h-3.5 w-3.5 shrink-0' />
        </a>
      );
    }

    return (
      <span className='block w-full truncate' title={text}>
        {text}
      </span>
    );
  };

  const sectionTitle =
    log.action === "deleted"
      ? "Perubahan Data (Data yang Dihapus)"
      : "Perubahan Data";

  const footerText =
    log.action === "created"
      ? "Data baru dibuat — belum ada data sebelumnya"
      : log.action === "updated"
        ? "Hanya menampilkan field yang berubah"
        : "Data telah dihapus (soft deleted)";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex h-[85vh] w-[96vw] max-w-[1180px] flex-col gap-0 overflow-hidden p-0'>
        {/* Header */}
        <DialogHeader className='shrink-0 border-b border-slate-100 px-6 py-5'>
          <DialogTitle className='text-xl font-bold text-slate-950'>
            Detail Perubahan
          </DialogTitle>
        </DialogHeader>

        <div className='flex-1 overflow-y-auto overscroll-contain px-6 py-6'>
          <div className='flex flex-col gap-6'>
            <Card className='rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-none'>
              <p className='mb-4 text-sm font-bold text-slate-800'>
                Informasi Umum
              </p>

              <div className='grid grid-cols-1 gap-3 text-[13px]'>
                <InfoRow label='Waktu'>
                  <span className='font-semibold leading-relaxed text-slate-800'>
                    {log.timestamp}
                  </span>
                </InfoRow>

                <InfoRow label='Pelaku'>
                  <span className='font-semibold leading-relaxed text-slate-800'>
                    {log.user}
                  </span>
                </InfoRow>

                <InfoRow label='Role' center>
                  <Badge
                    variant='outline'
                    className='rounded-full border-emerald-200 bg-emerald-50 px-3 py-0.5 text-[11px] capitalize text-emerald-700'
                  >
                    {log.role}
                  </Badge>
                </InfoRow>

                <InfoRow label='Aksi' center>
                  <ActivityActionBadge action={log.action} />
                </InfoRow>

                <InfoRow label='Modul'>
                  <span className='font-semibold leading-relaxed text-slate-800'>
                    {log.module}
                  </span>
                </InfoRow>

                <InfoRow label='Target'>
                  <span className='font-semibold leading-relaxed text-[#1a2b5e] break-words'>
                    {log.target}
                  </span>
                </InfoRow>
              </div>
            </Card>

            <div className='flex flex-col gap-3'>
              <h3 className='text-sm font-bold text-slate-800'>
                {sectionTitle}
              </h3>

              <div className='overflow-hidden rounded-lg border border-slate-200'>
                <Table className='w-full table-fixed'>
                  <TableHeader>
                    <TableRow className='border-b border-slate-200 hover:bg-transparent'>
                      <TableHead className='h-9 w-[24%] bg-slate-50 font-bold text-slate-700'>
                        Field
                      </TableHead>

                      <TableHead className='h-9 w-[38%] border-l border-slate-200 bg-rose-50 font-bold text-rose-700'>
                        Sebelum (Lama)
                      </TableHead>

                      <TableHead className='h-9 w-[38%] border-l border-slate-200 bg-emerald-50 font-bold text-emerald-700'>
                        Sesudah (Baru)
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {changedFields.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className='py-6 text-center text-sm text-slate-500'
                        >
                          Tidak ada data yang berubah.
                        </TableCell>
                      </TableRow>
                    ) : (
                      changedFields.map((item, idx) => (
                        <TableRow
                          key={`${item.field}-${idx}`}
                          className='border-b border-slate-100 hover:bg-slate-50/50'
                        >
                          <TableCell className='truncate py-1.5 align-middle font-mono text-xs font-medium text-slate-700'>
                            <span title={item.field}>{item.field}</span>
                          </TableCell>

                          <TableCell className='overflow-hidden border-l border-slate-100 py-1.5 align-middle text-[13px] text-rose-600'>
                            {renderValue(item.before)}
                          </TableCell>

                          <TableCell className='overflow-hidden border-l border-slate-100 py-1.5 align-middle text-[13px] text-emerald-700'>
                            {renderValue(item.after)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <div className='shrink-0 border-t border-slate-100 px-6 py-4'>
          <div className='flex items-center justify-between gap-4'>
            <span className='text-[12px] font-medium text-slate-500'>
              {footerText}
            </span>

            <Button
              variant='outline'
              onClick={() => onOpenChange(false)}
              className='font-semibold text-slate-700'
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({
  label,
  children,
  center = false,
}: {
  label: string;
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`flex min-w-0 ${center ? "items-center" : "items-start"}`}>
      <span className='w-32 shrink-0 font-medium text-slate-500'>{label}</span>

      <div className='min-w-0 flex-1'>{children}</div>
    </div>
  );
}
