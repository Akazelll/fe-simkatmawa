"use client";

import { useState, useEffect, useCallback } from "react";
import { verifikasiService } from "../services/verifikasiService";
import { TipeKegiatan } from "../types";

export function useVerifikasiList(
  tipeKegiatan: TipeKegiatan,
  page: number = 1,
) {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null); // Tambahkan state meta
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = useCallback(async () => {
    setIsLoading(true);
    try {
      // Kirim parameter page ke service API
      const response = await verifikasiService.getList(tipeKegiatan, { page });

      const mappedData = (response.data || []).map((item: any) => ({
        ...item,
        tipe_kegiatan: tipeKegiatan,
        nama_kegiatan: item.lomba || item.nama || "Tanpa Nama",
        mahasiswa_nama: item.mahasiswa?.[0]?.nama || "Tidak diketahui",
        mahasiswa_nim: item.mahasiswa?.[0]?.nim || "-",
        tanggal_pengajuan: item.created_at,
      }));

      setData(mappedData);

      // Simpan data meta dari backend (jika ada)
      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (error) {
      console.error(`Gagal memuat antrean ${tipeKegiatan}:`, error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [tipeKegiatan, page]); // Tambahkan page ke dependency array

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { data, meta, isLoading, refetch: fetchList };
}
