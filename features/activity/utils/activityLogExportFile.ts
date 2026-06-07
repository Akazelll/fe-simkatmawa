import { format } from "date-fns";

export function createActivityLogExportFileName(
  from: Date,
  to: Date,
  exporterName?: string,
) {
  const safeExporterName = (exporterName || "Mahasiswa")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w-]/g, "");

  return `Activity_Log_${safeExporterName}_${format(
    from,
    "yyyyMMdd",
  )}_${format(to, "yyyyMMdd")}.pdf`;
}
