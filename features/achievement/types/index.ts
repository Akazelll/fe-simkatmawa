export interface Prestasi {
  id: string;
  name: string;
  level: string;
  kategori: string;
  cabang: string;
  peringkat: string;
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
