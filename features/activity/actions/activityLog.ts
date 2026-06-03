"use server";

import { DEFAULT_ACTIVITY_LOGS } from "@/features/activity/constants";
import { isWithinInterval } from "date-fns";

export async function fetchLogsByDate(from: Date, to: Date) {
  const filteredLogs = DEFAULT_ACTIVITY_LOGS.filter((log) => {
    const logDate = new Date(log.timestamp);
    return isWithinInterval(logDate, { start: from, end: to });
  });

  return filteredLogs;
}
