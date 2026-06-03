"use client";

import { useState, useEffect, useCallback } from "react";
import {
  sertifikasiService,
  SertifikasiQueryParams,
} from "../services/sertifikasiService";
import { Certificate } from "../types";

export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export function useSertifikasiList(
  initialParams: SertifikasiQueryParams = { page: 1 },
) {
  const [data, setData] = useState<Certificate[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [params, setParams] = useState<SertifikasiQueryParams>(initialParams);

  const fetchSertifikasi = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await sertifikasiService.getSertifikasiList(params);
      if (response.success) {
        setData(response.data);
        setMeta(response.meta); 
      } else {
        setError(response.message || "Gagal mengambil data sertifikat");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan pada server");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchSertifikasi();
  }, [fetchSertifikasi]);

  const updateParams = (newParams: Partial<SertifikasiQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  return {
    data,
    meta,
    isLoading,
    error,
    params,
    updateParams,
    refetch: fetchSertifikasi,
  };
}
