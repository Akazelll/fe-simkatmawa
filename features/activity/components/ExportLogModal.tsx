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

const getActionLabel = (action: string) => {
  if (action === "created") return "Dibuat";
  if (action === "updated") return "Diubah";
  if (action === "deleted") return "Dihapus";
  return action;
};

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

    try {
      const response = await activityLogService.getMyActivityLog({
        start_date: format(from, "yyyy-MM-dd"),
        end_date: format(to, "yyyy-MM-dd"),
        per_page: 5000,
      });

      const logsData = response.data || [];

      const formattedLogs = logsData.map((item: any) => ({
        id: item.id,
        user: item.causer?.name || currentUser?.name || "Sistem",
        action: getActionLabel(item.event),
        timestamp: item.created_at,
      }));

      const exporterName = currentUser?.name || "Mahasiswa";

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
      link.download = `ActivityLog_${format(from, "yyyyMMdd")}_to_${format(to, "yyyyMMdd")}.pdf`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal mengexport PDF:", error);
      alert("Gagal mengambil data untuk di-export.");
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
