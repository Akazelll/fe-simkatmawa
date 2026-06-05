"use client";

import { useEffect, useState } from "react";
import {
  mahasiswaService,
  MahasiswaSearchResult,
} from "@/features/shared/services/mahasiswaService";

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

export function useMahasiswaSearch(query: string) {
  const [results, setResults] = useState<MahasiswaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setResults([]);
      setError("");
      setIsLoading(false);
      return;
    }

    let aborted = false;
    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await mahasiswaService.searchMahasiswa(trimmed);
        if (aborted) return;
        if (res?.success && Array.isArray(res.data)) {
          setResults(res.data);
          setError("");
        } else {
          setResults([]);
          setError(res?.message || "Tidak ada hasil");
        }
      } catch (err: any) {
        if (aborted) return;
        setResults([]);
        setError(err.response?.data?.message || "Gagal mencari mahasiswa");
      } finally {
        if (!aborted) setIsLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      aborted = true;
      clearTimeout(timer);
    };
  }, [query]);

  return { results, isLoading, error };
}
