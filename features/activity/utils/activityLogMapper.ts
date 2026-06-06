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
 * Format ISO timestamp UTC → string WIB (Asia/Jakarta).
 * Bypass `informasi_umum.waktu` dari BE karena default Laravel timezone-nya UTC,
 * jadi label "WIB" di BE bisa mundur 7 jam dari real-time.
 */
function formatJakartaTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return String(iso);

  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${fmt.format(d)} WIB`;
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
    // Format dari created_at (ISO UTC) → WIB di FE, lebih reliable daripada
    // ngandelin informasi_umum.waktu yg bisa kena bug timezone Laravel.
    timestamp: formatJakartaTime(raw.created_at),
    user: raw.informasi_umum?.pelaku ?? "—",
    role: (raw.informasi_umum?.role as ActivityRole) ?? "mahasiswa",
    action,
    module: raw.informasi_umum?.modul ?? "—",
    target: raw.informasi_umum?.target ?? "—",
    oldData: stringifyData(raw.perubahan_data?.sebelum),
    newData: stringifyData(raw.perubahan_data?.sesudah),
  };
}
