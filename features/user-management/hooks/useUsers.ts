"use client";

import { useState, useEffect, useCallback } from "react";
import { userService } from "../services/userService";

interface UseUsersProps {
  page: number;
  search: string;
  role: string;
}

export function useUsers({ page, search, role }: UseUsersProps) {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);

  // State untuk menyimpan total admin & mahasiswa
  const [stats, setStats] = useState({ totalAdmin: 0, totalMahasiswa: 0 });

  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await userService.getUsers({ page, search, role });

      setData(response.data || []);

      if (response.meta) {
        setMeta(response.meta);
      }

      if (response.stats) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error("Gagal memuat data pengguna:", error);
      setData([]);
      setMeta(null);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, role]);

  useEffect(() => {
    // Implementasi Debounce: Tunggu 300ms setelah user berhenti mengetik/berinteraksi
    // sebelum benar-benar memanggil API
    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchUsers]);

  return { data, meta, stats, isLoading, refetch: fetchUsers };
}
