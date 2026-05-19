export interface Rekognisi {
  id: string;
  name: string;
  jenis: string;
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
}
