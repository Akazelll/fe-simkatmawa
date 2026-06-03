export type TipeKegiatan = "prestasi" | "sertifikasi" | "rekognisi";

export interface VerificationItem {
  id: string | number;
  tipe_kegiatan: TipeKegiatan;
  nama_kegiatan: string;
  mahasiswa_nama: string;
  mahasiswa_nim: string;
  tanggal_pengajuan: string;
  status_internal: string;

  level?: string;
  penyelenggara?: string;
  url_sertifikat?: string;
  url_dokumen_undangan?: string;
  [key: string]: any;
}
