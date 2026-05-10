export interface Rekognisi {
  id: string;
  name: string;
  level: string;
  penyelenggara: string;
  status:
    | "Pending"
    | "Rejected"
    | "Approved_Unsynced"
    | "Sync_Failed"
    | "Sync_Success";
  tanggal: Date;
}
