"use client";

import { useState, useEffect, useCallback } from "react";
import {
  prestasiService,
  PrestasiQueryParams,
  PaginationMeta,
} from "../services/prestasiService";
// Import type Prestasi dari file types Anda, pastikan field-nya sesuai dengan response backend
import { Prestasi } from "../types";

export function usePrestasiList(
  initialParams: PrestasiQueryParams = { page: 1 },
) {
  const [data, setData] = useState<Prestasi[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [params, setParams] = useState<PrestasiQueryParams>(initialParams);

  const fetchPrestasi = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await prestasiService.getPrestasiList(params);
      if (response.success) {
        setData(response.data);
        setMeta(response.meta); // Asumsi backend mengembalikan meta pagination
      } else {
        setError(response.message || "Gagal mengambil data prestasi");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchPrestasi();
  }, [fetchPrestasi]);

  // Fungsi untuk update filter/pencarian
  const updateParams = (newParams: Partial<PrestasiQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  return {
    data,
    meta,
    isLoading,
    error,
    params,
    updateParams,
    refetch: fetchPrestasi,
  };
}
