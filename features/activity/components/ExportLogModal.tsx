"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { format, parseISO } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DateRangeInput } from "@/features/shared/components/DateRangeInput";
import { LogPdfTemplate } from "./LogPdfTemplate";
import { activityLogService } from "@/features/activity/services/activityLogService";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { normalizeActivityLogs } from "@/features/activity/utils/activityLogExportMapper";
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

  const handleExport = async () => {
    if (!date.start || !date.end) return;

    setLoading(true);

    const from = parseISO(date.start);
    const to = parseISO(date.end);
    const exporterName = currentUser?.name || "Mahasiswa";

    try {
      const response = await activityLogService.getMyActivityLog({
        start_date: format(from, "yyyy-MM-dd"),
        end_date: format(to, "yyyy-MM-dd"),
        per_page: 100,
      });

      const formattedLogs = normalizeActivityLogs(response, exporterName);

      const blob = await pdf(
        <LogPdfTemplate
          logs={formattedLogs}
          dateRange={{ from, to }}
          exporterName={exporterName}
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
