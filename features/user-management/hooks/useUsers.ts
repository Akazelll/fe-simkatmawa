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

  const [stats, setStats] = useState({ totalAdmin: 0, totalMahasiswa: 0 });

  // isLoading: load pertama (skeleton penuh). isFetching: refetch berikutnya tanpa membuang data lama.
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsFetching(true);
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
      setIsFetching(false);
      setIsLoading(false); // setelah fetch pertama selesai, skeleton penuh tidak muncul lagi
    }
  }, [page, search, role]);

  // Debounce search sudah ditangani di FilterSection, jadi cukup fetch langsung di sini.
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { data, meta, stats, isLoading, isFetching, refetch: fetchUsers };
}
