import { ActivityLog } from "../types";

export const ACTIVITY_LOG_ACTION = {
  PENDING: "Pending",
  REJECTED: "Rejected",
  APPROVED_UNSYNCED: "Approved_Unsynced",
  SYNC_FAILED: "Sync_Failed",
  SYNC_SUCCESS: "Sync_Success",
} as const;

export const ACTIVITY_LOG_ACTION_OPTIONS = [
  {
    label: "Pending",
    value: ACTIVITY_LOG_ACTION.PENDING,
  },
  {
    label: "Rejected",
    value: ACTIVITY_LOG_ACTION.REJECTED,
  },
  {
    label: "Approved Unsynced",
    value: ACTIVITY_LOG_ACTION.APPROVED_UNSYNCED,
  },
  {
    label: "Sync Failed",
    value: ACTIVITY_LOG_ACTION.SYNC_FAILED,
  },
  {
    label: "Sync Success",
    value: ACTIVITY_LOG_ACTION.SYNC_SUCCESS,
  },
];

export const ACTIVITY_LOG_TABLE_COLUMNS = [
  "User",
  "Action",
  "Target ID",
  "Timestamp",
];

export const DEFAULT_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: "LOG-001",
    user: "Akazell",
    action: ACTIVITY_LOG_ACTION.PENDING,
    targetid: "CERT-001",
    timestamp: new Date("2026-05-10T08:30:00"),
  },
  {
    id: "LOG-002",
    user: "Naufal",
    action: ACTIVITY_LOG_ACTION.REJECTED,
    targetid: "ACH-014",
    timestamp: new Date("2026-05-10T09:15:00"),
  },
  {
    id: "LOG-003",
    user: "Rizky",
    action: ACTIVITY_LOG_ACTION.APPROVED_UNSYNCED,
    targetid: "REC-008",
    timestamp: new Date("2026-05-10T10:45:00"),
  },
  {
    id: "LOG-004",
    user: "Farhan",
    action: ACTIVITY_LOG_ACTION.SYNC_FAILED,
    targetid: "CERT-021",
    timestamp: new Date("2026-05-10T11:20:00"),
  },
  {
    id: "LOG-005",
    user: "Dimas",
    action: ACTIVITY_LOG_ACTION.SYNC_SUCCESS,
    targetid: "ACH-032",
    timestamp: new Date("2026-05-10T13:05:00"),
  },
];
