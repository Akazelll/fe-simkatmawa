"use client";

import { useMemo } from "react";
import { RoleGuard } from "@/features/auth/components/RoleGuard";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { EmptyState } from "@/features/shared/components/EmptyState";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { History as HistoryIcon } from "lucide-react";

import { useSubmissions } from "@/features/submission/hooks/useSubmissions";
import {
  shouldAppearInHistory,
  getSubmissionProcessedBy,
  getSubmissionProcessedAt,
} from "@/lib/submission/submissionRules";
import { SubmissionStatusBadge } from "@/features/shared/components/SubmissionStatusBadge";
import { formatDateTime } from "@/lib/utils/dateFormat";

export default function HistoryPage() {
  const { submissions } = useSubmissions();

  const historySubmissions = useMemo(() => {
    return submissions.filter(shouldAppearInHistory).sort((a, b) => {
      const timeA = new Date(getSubmissionProcessedAt(a) || 0).getTime();
      const timeB = new Date(getSubmissionProcessedAt(b) || 0).getTime();
      return timeB - timeA;
    });
  }, [submissions]);

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className='space-y-6 p-4 md:p-6 max-w-7xl mx-auto animate-in fade-in duration-500'>
        <PageHeader
          title='Riwayat Verifikasi'
          description='Daftar seluruh pengajuan yang telah diproses (Diterima/Ditolak).'
        />

        <Card className='rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden'>
          <Table>
            <TableHeader className='bg-slate-50 border-b border-slate-200'>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='w-[100px] pl-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                  Tipe
                </TableHead>
                <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                  Nama Pengajuan
                </TableHead>
                <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                  Mahasiswa
                </TableHead>
                <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                  Status
                </TableHead>
                <TableHead className='text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                  Diproses Oleh
                </TableHead>
                <TableHead className='pr-5 text-[10px] font-bold uppercase tracking-wider text-slate-500'>
                  Tanggal Proses
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historySubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='h-32'>
                    <EmptyState
                      icon={<HistoryIcon className='w-8 h-8 opacity-50' />}
                      title='Belum ada riwayat'
                      description='Data yang sudah diproses (Approve/Reject) akan muncul di sini secara otomatis.'
                    />
                  </TableCell>
                </TableRow>
              ) : (
                historySubmissions.map((sub) => (
                  <TableRow
                    key={sub.id}
                    className='border-b border-slate-100 hover:bg-slate-50/70 transition-colors'
                  >
                    <TableCell className='pl-5'>
                      <Badge
                        variant='outline'
                        className='uppercase text-[10px] rounded-md'
                      >
                        {sub.type}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-sm font-semibold text-slate-800'>
                      {sub.title}
                    </TableCell>
                    <TableCell>
                      <div className='font-semibold text-sm text-slate-700'>
                        {sub.studentName}
                      </div>
                      <div className='text-xs text-slate-400'>
                        {sub.studentNim}
                      </div>
                    </TableCell>
                    <TableCell>
                      <SubmissionStatusBadge submission={sub} />
                    </TableCell>
                    <TableCell className='text-sm font-medium text-slate-600'>
                      {getSubmissionProcessedBy(sub) || "-"}
                    </TableCell>
                    <TableCell className='pr-5 text-xs font-medium text-slate-500'>
                      {formatDateTime(getSubmissionProcessedAt(sub) ?? null)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </RoleGuard>
  );
}
