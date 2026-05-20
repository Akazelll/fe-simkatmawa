"use client";

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  subjectType?: string;
  subjectId?: string;
  description: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export function logAudit(data: Omit<AuditLogEntry, "id" | "createdAt">) {
  if (typeof window === "undefined") return;

  const entry: AuditLogEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  const existingLogs = JSON.parse(localStorage.getItem("audit_logs") || "[]");
  existingLogs.unshift(entry);
  localStorage.setItem(
    "audit_logs",
    JSON.stringify(existingLogs.slice(0, 100)),
  ); // Simpan 100 log terakhir
}
