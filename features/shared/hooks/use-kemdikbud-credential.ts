"use client";

import { useState, useEffect } from "react";
import {
  KemdikbudCredential,
  UpdateKemdikbudCredentialPayload,
} from "@/lib/settings/types";
import { defaultKemdikbudCredential } from "../data/default-kemdikbud-credential";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function useKemdikbudCredential() {
  const { currentUser } = useAuth();
  const [credential, setCredential] = useState<KemdikbudCredential | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("simkatmawa_kemdikbud_credential");
    if (stored) {
      setCredential(JSON.parse(stored));
    } else {
      setCredential(defaultKemdikbudCredential);
    }
    setIsLoaded(true);
  }, []);

  const updateCredential = (payload: UpdateKemdikbudCredentialPayload) => {
    if (!currentUser) return;

    const now = new Date().toISOString();

    const newCredential: KemdikbudCredential = {
      email: payload.email,
      hasPassword: true,
      updatedAt: now,
      updatedBy: currentUser.name,
    };

    // 1. Simpan Kredensial Baru (Untuk dummy simulasi, disamarkan aslinya di backend)
    setCredential(newCredential);
    localStorage.setItem(
      "simkatmawa_kemdikbud_credential",
      JSON.stringify(newCredential),
    );

    // 2. Catat log aktivitas (tanpa menyimpan password)
    const existingLogs = JSON.parse(localStorage.getItem("audit_logs") || "[]");
    const logEntry = {
      id: crypto.randomUUID(),
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action: "settings.kemdikbud_credential.updated",
      subjectType: "settings",
      subjectId: "kemdikbud-credential",
      description: "Superadmin memperbarui kredensial API Kemdiktisaintek",
      metadata: {
        emailBefore: credential?.email,
        emailAfter: payload.email,
        tokenInvalidated: true,
      },
      createdAt: now,
    };
    localStorage.setItem(
      "audit_logs",
      JSON.stringify([logEntry, ...existingLogs].slice(0, 100)),
    );
  };

  return {
    credential,
    isLoaded,
    updateCredential,
  };
}
