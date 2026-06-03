"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DateRangeInput } from "@/features/shared/components/DateRangeInput";
import { LogPdfTemplate } from "./LogPdfTemplate";
import { fetchLogsByDate } from "@/features/activity/actions/activityLog";
import { parseISO } from "date-fns";

export function ExportLogModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [date, setDate] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (!date.start || !date.end) return;

    setLoading(true);
    const from = parseISO(date.start);
    const to = parseISO(date.end);

    const logs = await fetchLogsByDate(from, to);

    const blob = await pdf(<LogPdfTemplate logs={logs} dateRange={{ from, to }} exporterName='Admin' />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `logs-${date.start}.pdf`;
    link.click();

    setLoading(false);
    onOpenChange(false);
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
