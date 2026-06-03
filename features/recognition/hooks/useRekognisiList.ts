"use client";
import { useState, useEffect, useCallback } from "react";
import {
  rekognisiService,
  RekognisiQueryParams,
} from "../services/rekognisiService";
import { Rekognisi } from "../types";

export function useRekognisiList(
  initialParams: RekognisiQueryParams = { page: 1 },
) {
  const [data, setData] = useState<Rekognisi[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [params, setParams] = useState<RekognisiQueryParams>(initialParams);

  const fetchRekognisi = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await rekognisiService.getRekognisiList(params);
      if (response.success) {
        setData(response.data);
        setMeta(response.meta);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal mengambil data rekognisi");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchRekognisi();
  }, [fetchRekognisi]);

  const updateParams = (newParams: Partial<RekognisiQueryParams>) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  };

  return {
    data,
    meta,
    isLoading,
    error,
    params,
    updateParams,
    refetch: fetchRekognisi,
  };
}
