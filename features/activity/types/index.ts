export interface ActivityLog {
  id: string;
  user: string;
  action:
    | "Pending"
    | "Rejected"
    | "Approved_Unsynced"
    | "Sync_Failed"
    | "Sync_Success";
  targetid: string;
  timestamp: Date;
}
