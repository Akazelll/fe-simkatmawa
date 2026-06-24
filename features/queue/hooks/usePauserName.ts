"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/features/auth/hooks/useAuth";


const nameCache = new Map<string, string>();
let loadPromise: Promise<void> | null = null;
function loadSuperadminNames(): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = api
    .get("/superadmin/users", { params: { role: "superadmin", limit: 200 } })
    .then((res) => {
      const body = res.data;
      const list = body?.data?.data ?? body?.data ?? [];
      (Array.isArray(list) ? list : []).forEach((u: any) => {
        const id = u?.id != null ? String(u.id) : null;
        const nama = u?.name ?? u?.nama;
        if (id && nama) nameCache.set(id, nama);
      });
    })
    .catch(() => {
      loadPromise = null;
    });

  return loadPromise;
}

function immediateName(
  pausedBy: string | null,
  currentUser: { id?: string; name?: string } | null,
): string | null {
  if (!pausedBy) return null;
  if (pausedBy.toUpperCase() === "SYSTEM") return "Sistem";
  if (currentUser?.id && pausedBy === String(currentUser.id)) {
    return currentUser.name ?? null;
  }
  return nameCache.get(pausedBy) ?? null;
}

export function usePauserName(pausedBy: string | null | undefined): string {
  const { currentUser } = useAuth();
  const isSuperadmin = currentUser?.role === "superadmin";
  const [, setTick] = useState(0);

  const direct = immediateName(pausedBy ?? null, currentUser);

  useEffect(() => {
    if (!pausedBy || direct || !isSuperadmin) return;

    let active = true;
    loadSuperadminNames().then(() => {
      if (active) setTick((t) => t + 1);
    });
    return () => {
      active = false;
    };
  }, [pausedBy, direct, isSuperadmin]);

  if (direct) return direct;
  if (!pausedBy) return "—";
  if (pausedBy.toUpperCase() === "SYSTEM") return "Sistem";
  return "Superadmin";
}
