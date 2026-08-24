"use client";

import { useState, useEffect, useCallback } from "react";
import { customToast } from "@/lib/custom-toast";
import { settingsService } from "../services/settingsService";
import type {
  KemdikbudCredential,
  UpdateKemdikbudCredentialPayload,
} from "@/features/settings/types";

export function useKemdikbudCredential() {
  const [credential, setCredential] = useState<KemdikbudCredential | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const fetchCredential = useCallback(async () => {
    try {
      const res = await settingsService.getKemdikbud();
      if (res?.success) {
        setCredential(res.data ?? null);
        setError("");
      } else {
        setError(res?.message || "Gagal memuat kredensial Kemdiktisaintek");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Terjadi kesalahan pada server");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchCredential();
  }, [fetchCredential]);

  // Mengembalikan boolean agar modal tahu kapan boleh ditutup.
  const updateCredential = useCallback(
    async (payload: UpdateKemdikbudCredentialPayload): Promise<boolean> => {
      setIsUpdating(true);
      try {
        const res = await settingsService.updateKemdikbud({
          email: payload.email,
          password: payload.password,
        });
        if (res?.success === false) {
          customToast.error(res?.message || "Gagal memperbarui kredensial");
          return false;
        }
        customToast.success(res?.message || "Kredensial berhasil diperbarui.");
        await fetchCredential();
        return true;
      } catch (err: any) {
        customToast.error(
          err?.response?.data?.message || "Terjadi kesalahan pada server",
        );
        return false;
      } finally {
        setIsUpdating(false);
      }
    },
    [fetchCredential],
  );

  return {
    credential,
    isLoaded,
    isUpdating,
    error,
    updateCredential,
    refetch: fetchCredential,
  };
}
