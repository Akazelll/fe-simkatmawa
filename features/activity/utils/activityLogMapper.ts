import { ActivityLog, ActivityAction, ActivityRole } from "../types";

const VALID_ACTIONS: readonly ActivityAction[] = ["created", "updated", "deleted"];

function stringifyData(
  data: Record<string, unknown> | null | undefined,
): Record<string, string | null> {
  if (!data) return {};
  const result: Record<string, string | null> = {};
  for (const [key, val] of Object.entries(data)) {
    if (val === null || val === undefined) result[key] = null;
    else if (typeof val === "object") result[key] = JSON.stringify(val);
    else result[key] = String(val);
  }
  return result;
}

/**
 * Map response Spatie ActivityLog dari BE (Laravel) ke shape ActivityLog FE.
 *
 * Shape BE (lihat ActivityLogResource.php):
 * - informasi_umum: { waktu, aksi, pelaku, role, modul, target }
 * - perubahan_data: { sebelum, sesudah }
 * - event, description, subject_type, subject_id, causer_id, created_at, id
 */
export function mapBackendActivityLog(raw: any): ActivityLog {
  const rawEvent = String(raw.event ?? "").toLowerCase();
  const action: ActivityAction = VALID_ACTIONS.includes(
    rawEvent as ActivityAction,
  )
    ? (rawEvent as ActivityAction)
    : "updated";

  return {
    id: String(raw.id),
    timestamp: raw.informasi_umum?.waktu ?? raw.created_at ?? "—",
    user: raw.informasi_umum?.pelaku ?? "—",
    role: (raw.informasi_umum?.role as ActivityRole) ?? "mahasiswa",
    action,
    module: raw.informasi_umum?.modul ?? "—",
    target: raw.informasi_umum?.target ?? "—",
    oldData: stringifyData(raw.perubahan_data?.sebelum),
    newData: stringifyData(raw.perubahan_data?.sesudah),
  };
}
