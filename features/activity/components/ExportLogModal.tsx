"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { parseISO } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DateRangeInput } from "@/features/shared/components/DateRangeInput";
import { LogPdfTemplate } from "./LogPdfTemplate";
import { fetchAllActivityLogs } from "@/features/activity/services/activityLogService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { normalizeActivityLogs } from "@/features/activity/utils/activityLogExportMapper";
import { filterActivityLogsByDateRange } from "@/features/activity/utils/activityLogDateFilter";
import { createActivityLogExportFileName } from "@/features/activity/utils/activityLogExportFile";

export function ExportLogModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [date, setDate] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const isAdmin =
    currentUser?.role === "admin" || currentUser?.role === "superadmin";

  const handleExport = async () => {
    if (!date.start || !date.end) return;

    setLoading(true);

    const from = parseISO(date.start);
    const to = parseISO(date.end);
    const exporterName = currentUser?.name || (isAdmin ? "Admin" : "Mahasiswa");
    const reportSubtitle = isAdmin
      ? "Laporan Aktivitas Sistem"
      : "Laporan Aktivitas Akun Mahasiswa";

    try {
      // Backend tidak mendukung filter tanggal, jadi kita ambil semua halaman
      // lalu filter rentang tanggal di sisi klien.
      const rawLogs = await fetchAllActivityLogs({ isAdmin });

      const normalizedLogs = normalizeActivityLogs(
        { data: rawLogs },
        exporterName,
      );
      const formattedLogs = filterActivityLogsByDateRange(
        normalizedLogs,
        date.start,
        date.end,
      );

      const blob = await pdf(
        <LogPdfTemplate
          logs={formattedLogs}
          dateRange={{ from, to }}
          exporterName={exporterName}
          reportSubtitle={reportSubtitle}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = createActivityLogExportFileName(from, to, exporterName);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Gagal mengexport PDF:", error);
      console.error("Detail error:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Gagal mengambil data untuk di-export.",
      );
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Laporan</DialogTitle>
        </DialogHeader>

        <div className='py-4'>
          <DateRangeInput value={date} onChange={setDate} />
        </div>

        <Button
          onClick={handleExport}
          disabled={loading || !date.start || !date.end}
          className='w-full'
        >
          {loading ? "Menyiapkan PDF..." : "Download PDF"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}