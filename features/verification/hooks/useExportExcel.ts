"use client";

import { useState, useCallback } from "react";
import { verifikasiService } from "../services/verifikasiService";
import { TipeKegiatan, VerifikasiQueryParams } from "../types";
import { customToast } from "@/lib/custom-toast";

export function useExportExcel() {
  const [isExporting, setIsExporting] = useState(false);

  const exportExcel = useCallback(
    async (tipeKegiatan: TipeKegiatan, params?: VerifikasiQueryParams) => {
      setIsExporting(true);
      try {
        await verifikasiService.exportExcel(tipeKegiatan, params);
        customToast.success("Berhasil mengunduh file Excel");
      } catch (err: unknown) {
        let description = "Terjadi kesalahan saat mengunduh data. Silakan coba lagi.";

        const errorWithResponse = err as { response?: { data?: unknown } };
        const blob = errorWithResponse?.response?.data;
        if (blob instanceof Blob) {
          try {
            const text = await blob.text();
            const json = JSON.parse(text);
            if (json.message) description = json.message;
          } catch {}
        }

        customToast.error("Gagal mengunduh file Excel", { description });
      } finally {
        setIsExporting(false);
      }
    },
    [],
  );

  return { isExporting, exportExcel };
}
