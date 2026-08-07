"use client";

import { useState, useEffect, useCallback } from "react";
import { verifikasiService } from "../services/verifikasiService";
import { TipeKegiatan, VerifikasiQueryParams, PengajuanItem } from "../types";
import { PaginationMeta } from "@/features/shared/types/pagination";

export function useVerifikasiList(
  tipeKegiatan: TipeKegiatan,
  initialParams: VerifikasiQueryParams = {},
) {
  const [data, setData] = useState<PengajuanItem[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [params, setParams] = useState<VerifikasiQueryParams>({
    page: 1,
    limit: 10,
    status: "all",
    ...initialParams,
  });

  const fetchList = useCallback(async () => {
    setIsFetching(true);
    try {
      // Membersihkan parameter kosong sebelum dikirim ke BE
      const cleanParams: Record<string, any> = {};

      if (params.page) cleanParams.page = params.page;
      if (params.limit) cleanParams.limit = params.limit;
      if (params.status && params.status !== "all") cleanParams.status = params.status;
      if (params.kategori && params.kategori !== "all") cleanParams.kategori = params.kategori;
      if (params.jenis_group && params.jenis_group !== "all") cleanParams.jenis_group = params.jenis_group;
      if (params.level && params.level !== "all") cleanParams.level = params.level;
      if (params.tahun && params.tahun !== "all") cleanParams.tahun = params.tahun;
      if (params.search && params.search.trim()) cleanParams.search = params.search.trim();
      if (params.sort_by) cleanParams.sort_by = params.sort_by;
      if (params.sort_dir) cleanParams.sort_dir = params.sort_dir;

      const response = await verifikasiService.getList(tipeKegiatan, cleanParams);

      const mappedData: PengajuanItem[] = (response.data || []).map((item: any) => ({
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
      console.error(`Gagal memuat daftar ${tipeKegiatan}:`, error);
      setData([]);
      setMeta(null);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  }, [tipeKegiatan, params]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const updateParams = useCallback(
    (newParams: Partial<VerifikasiQueryParams>) => {
      setParams((prev) => ({
        ...prev,
        ...newParams,
        // Jika mengubah filter (bukan hanya ubah halaman), reset ke page 1
        page: newParams.page !== undefined ? newParams.page : 1,
      }));
    },
    [],
  );

  return {
    data,
    meta,
    isLoading,
    isFetching,
    params,
    setParams,
    updateParams,
    refetch: fetchList,
  };
}
