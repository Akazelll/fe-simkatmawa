"use client";

import { useEffect } from "react";
import { scan } from "react-scan";

/**
 * Mengaktifkan overlay react-scan untuk memantau re-render komponen.
 * Hanya dipakai saat development (lihat app/layout.tsx) — tidak ikut ke production build.
 */
export function ReactScan() {
  useEffect(() => {
    scan({
      enabled: true,
      // tampilkan alasan kenapa sebuah komponen re-render (props/state/hooks/parent)
      // berguna untuk memverifikasi input debounce tidak fetch/re-render tiap ketik
    });
  }, []);

  return null;
}
