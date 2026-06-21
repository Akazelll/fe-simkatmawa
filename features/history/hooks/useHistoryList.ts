"use client";

import { useState, useEffect, useCallback } from "react";
import { verifikasiService } from "@/features/verification/services/verifikasiService";
import { TipeKegiatan } from "@/features/verification/types";
import { PaginationMeta } from "@/features/shared/types/pagination";
import { PAGE_SIZE } from "@/features/shared/constants/pagination";

export function useHistoryList(tipeKegiatan: TipeKegiatan, page: number = 1) {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = useCallback(async () => {
    setIsLoading(true);
    try {
      // BE endpoint history membaca `limit` untuk ukuran halaman.
      const response = await verifikasiService.getList(tipeKegiatan, {
        page,
        limit: PAGE_SIZE,
        status: "APPROVED_UNSYNCED,APPROVED_SYNCED,REJECTED",
      });

      const mappedData = (response.data || []).map((item: any) => ({
        ...item,
        tipe_kegiatan: tipeKegiatan,
        nama_kegiatan: item.lomba || item.nama || "Tanpa Nama",
        mahasiswa_nama: item.mahasiswa?.[0]?.nama || "Tidak diketahui",
        mahasiswa_nim: item.mahasiswa?.[0]?.nim || "-",
        tanggal_pengajuan: item.created_at,
      }));

      setData(mappedData);

      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (error) {
      console.error(`Gagal memuat riwayat ${tipeKegiatan}:`, error);
      setData([]);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  }, [tipeKegiatan, page]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { data, meta, isLoading, refetch: fetchList };
}
