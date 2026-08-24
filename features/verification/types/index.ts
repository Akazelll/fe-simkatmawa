export type TipeKegiatan = "prestasi" | "sertifikasi" | "rekognisi";

export interface PengajuanItem {
  id: string | number;
  tipe_kegiatan?: TipeKegiatan;
  nama_kegiatan?: string;
  lomba?: string;
  nama?: string;
  mahasiswa_nama?: string;
  mahasiswa_nim?: string;
  mahasiswa?: { nama?: string; nim?: string }[];
  tanggal_pengajuan?: string;
  created_at?: string;
  status_internal?: string;
  level?: string;
  kategori?: string;
  jenis?: string;
  peringkat?: string;
  tahun?: number | string;
  tgl_sertifikat?: string;
  cabang?: string;
  approved_at?: string;
  [key: string]: any;
}

export interface VerifikasiQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
  [key: string]: any;
}

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