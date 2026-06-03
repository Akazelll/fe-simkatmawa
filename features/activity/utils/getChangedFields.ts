import { ActivityLog } from "../types";

export function getChangedFields(log: ActivityLog) {
  const allKeys = Array.from(
    new Set([
      ...Object.keys(log.oldData || {}),
      ...Object.keys(log.newData || {}),
    ]),
  );

  if (log.action === "created") {
    return allKeys.map((key) => ({
      field: key,
      before: null,
      after: log.newData?.[key] ?? null,
    }));
  }

  if (log.action === "deleted") {
    return allKeys.map((key) => ({
      field: key,
      before: log.oldData?.[key] ?? null,
      after: null,
    }));
  }

  return allKeys
    .filter((key) => log.oldData?.[key] !== log.newData?.[key])
    .map((key) => ({
      field: key,
      before: log.oldData?.[key] ?? null,
      after: log.newData?.[key] ?? null,
    }));
}
