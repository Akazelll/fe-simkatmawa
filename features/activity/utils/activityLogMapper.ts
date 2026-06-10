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

export function mapBackendActivityLog(raw: any): ActivityLog {
  const rawEvent = String(raw.event ?? "").toLowerCase();
  const action: ActivityAction = VALID_ACTIONS.includes(
    rawEvent as ActivityAction,
  )
    ? (rawEvent as ActivityAction)
    : "updated";

  return {
    id: String(raw.id),
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
