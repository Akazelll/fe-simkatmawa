"use client";

import { useEffect, useState } from "react";
import {
  mahasiswaService,
  MahasiswaSearchResult,
} from "@/features/shared/services/mahasiswaService";

export function useMahasiswaSearch(query: string) {
  const [results, setResults] = useState<MahasiswaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const keyword = query.trim();

    if (keyword.length < 2) {
      setResults([]);
      setError("");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const timer = window.setTimeout(async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await mahasiswaService.searchMahasiswa(keyword);

        if (!isMounted) return;

        setResults(data);
      } catch (err: any) {
        if (!isMounted) return;

        console.error("Gagal mencari mahasiswa:", err);
        console.error("Detail error mahasiswa:", err.response?.data);

        setResults([]);
        setError(
          err.response?.data?.message || "Gagal mencari data mahasiswa.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }, 350);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, [query]);

  return {
    results,
    isLoading,
    error,
  };
}
