"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { PAGE_SIZE } from "../constants/pagination";

// Cache antar-render dalam sesi (bertahan saat navigasi client-side).
const memoryCache = new Map<string, number>();
const listeners = new Set<() => void>();

const storageKeyOf = (key: string) => `skeleton-rows:${key}`;

// Baca dari memori → localStorage; hasil di-cache agar snapshot stabil.
const readCount = (key: string): number | undefined => {
  if (memoryCache.has(key)) return memoryCache.get(key);
  try {
    const raw = window.localStorage.getItem(storageKeyOf(key));
    if (raw != null) {
      const n = parseInt(raw, 10);
      if (Number.isFinite(n) && n > 0) {
        memoryCache.set(key, n);
        return n;
      }
    }
  } catch {
    // abaikan (mis. storage tidak tersedia)
  }
  return undefined;
};

const remember = (key: string, count: number) => {
  const clamped = Math.min(Math.max(count, 1), PAGE_SIZE);
  if (memoryCache.get(key) === clamped) return;
  memoryCache.set(key, clamped);
  try {
    window.localStorage.setItem(storageKeyOf(key), String(clamped));
  } catch {
    // abaikan
  }
  listeners.forEach((notify) => notify());
};

const subscribe = (notify: () => void) => {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
};

/**
 * Mengingat jumlah baris terakhir yang ditampilkan sebuah tabel (per `key`),
 * sehingga skeleton load berikutnya merender baris sebanyak data yang akan tampil
 * (mis. data terakhir cuma 1 → skeleton 1 baris), bukan jumlah tetap.
 *
 * Skeleton umumnya hanya muncul saat load pertama (data/meta masih kosong),
 * jadi nilai diambil dari memori/localStorage hasil kunjungan sebelumnya.
 *
 * @param key        Pengidentifikasi tabel, mis. "achievement", "verification:prestasi".
 * @param dataLength Jumlah baris data saat ini (dipakai untuk diingat saat `ready`).
 * @param ready      true saat load selesai (data final) — saat itu jumlah disimpan.
 * @param fallback   Nilai default bila belum pernah ada data tersimpan.
 */
export function useSkeletonRows(
  key: string,
  dataLength: number | undefined,
  ready: boolean,
  fallback: number = PAGE_SIZE,
): number {
  const getSnapshot = useCallback(
    () => readCount(key) ?? fallback,
    [key, fallback],
  );
  const getServerSnapshot = useCallback(() => fallback, [fallback]);

  const rows = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Simpan jumlah baris saat data sudah final (tidak memicu setState langsung).
  useEffect(() => {
    if (ready && dataLength != null) remember(key, dataLength);
  }, [ready, dataLength, key]);

  return rows;
}
