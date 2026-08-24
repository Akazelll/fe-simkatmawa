"use client";

import { useState, useEffect, useCallback } from "react";
import { verifikasiService } from "../services/verifikasiService";
import { TipeKegiatan, VerifikasiQueryParams } from "../types";
import { PaginationMeta } from "@/features/shared/types/pagination";

export function useVerifikasiList(tipeKegiatan: TipeKegiatan) {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [params, setParams] = useState<VerifikasiQueryParams>({
    page: 1,
    limit: PAGE_SIZE,
  });

  const fetchList = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await verifikasiService.getList(tipeKegiatan, {
        page: params.page || 1,
        limit: params.limit || PAGE_SIZE,
        search: params.search,
        status: params.status,
        sort_by: params.sort_by,
        sort_dir: params.sort_dir,
      });

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

  const updateParams = useCallback((newParams: Partial<VerifikasiQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  return { data, meta, isLoading, params, updateParams, refetch: fetchList };
}
