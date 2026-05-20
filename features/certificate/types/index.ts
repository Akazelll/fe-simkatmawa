export interface Certificate {
  id: string;
  name: string;
  url: string;
  level: string;
  penyelenggara: string;
  tahun: number;
  pt: string;
  status:
    | "Pending"
    | "Rejected"
    | "Approved_Unsynced"
    | "Sync_Failed"
    | "Sync_Success";
  tanggal: Date;
  rejectionReason?: string;
}
