"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { settingsService } from "../services/settingsService";
import type {
  AlasanPenolakan,
  AlasanPenolakanInput,
  AlasanPenolakanMeta,
} from "@/features/settings/types";

export function useAlasanPenolakan() {
  const [list, setList] = useState<AlasanPenolakan[]>([]);
  const [meta, setMeta] = useState<AlasanPenolakanMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const fetchList = useCallback(async () => {
    try {
      setIsLoading(true);
      const is_active_param =
        statusFilter === "active" ? true : statusFilter === "inactive" ? false : undefined;

      const res = await settingsService.getAlasanPenolakanList({
        page,
        limit: 10,
        search: search || undefined,
        is_active: is_active_param,
      });

      if (res?.success) {
        setList(res.data || []);
        if (res.meta) {
          setMeta(res.meta);
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Gagal memuat master alasan penolakan");
    } finally {
      setIsLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const createItem = async (payload: AlasanPenolakanInput): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await settingsService.createAlasanPenolakan(payload);
      if (res?.success === false) {
        toast.error(res?.message || "Gagal menambahkan alasan penolakan");
        return false;
      }
      toast.success(res?.message || "Master alasan penolakan berhasil ditambahkan.");
      await fetchList();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan pada server");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateItem = async (id: number, payload: AlasanPenolakanInput): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await settingsService.updateAlasanPenolakan(id, payload);
      if (res?.success === false) {
        toast.error(res?.message || "Gagal memperbarui alasan penolakan");
        return false;
      }
      toast.success(res?.message || "Master alasan penolakan berhasil diperbarui.");
      await fetchList();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan pada server");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = async (item: AlasanPenolakan): Promise<boolean> => {
    return updateItem(item.id, {
      judul: item.judul,
      alasan: item.alasan,
      is_active: !item.is_active,
    });
  };

  const deleteItem = async (id: number): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await settingsService.deleteAlasanPenolakan(id);
      if (res?.success === false) {
        toast.error(res?.message || "Gagal menghapus alasan penolakan");
        return false;
      }
      toast.success(res?.message || "Master alasan penolakan berhasil dihapus.");
      await fetchList();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Terjadi kesalahan pada server");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    list,
    meta,
    isLoading,
    isSubmitting,
    search,
    setSearch,
    page,
    setPage,
    statusFilter,
    setStatusFilter,
    fetchList,
    createItem,
    updateItem,
    toggleStatus,
    deleteItem,
  };
}
