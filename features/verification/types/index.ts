export type TipeKegiatan = "prestasi" | "sertifikasi" | "rekognisi";

export interface PengajuanMahasiswa {
  nim: string;
  nama: string;
  urutan?: number;
}

export interface PengajuanDosen {
  nuptk: string;
  nama: string;
  pivot?: {
    url_surat_tugas?: string;
  };
  url_surat_tugas?: string;
}

export interface PengajuanUser {
  id: string;
  name: string;
}

export interface PengajuanItem {
  id: number | string;
  // Prestasi
  lomba?: string;
  kategori?: string; // 'RISNOV' | 'RISNOVSSH' | 'SENBUD' | 'OLAHRAGA' | 'MINAT'
  cabang?: string;
  peringkat?: string;
  kelompok_prestasi?: string;
  bentuk?: string;
  // Rekognisi
  nama?: string;
  jenis?: string;
  // Common
  level: string;
  penyelenggara: string;
  tgl_sertifikat: string;
  status_internal: string; // 'PENDING' | 'APPROVED_UNSYNCED' | 'SYNC_SUCCESS' | 'SYNC_FAILED' | 'REJECTED'
  alasan_penolakan?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
  created_at: string;
  updated_at?: string;
  mahasiswa: PengajuanMahasiswa[];
  dosen?: PengajuanDosen[];
  creator?: PengajuanUser | null;
  approver?: PengajuanUser | null;

  // Normalized helper fields for FE rendering
  tipe_kegiatan?: TipeKegiatan;
  nama_kegiatan?: string;
  mahasiswa_nama?: string;
  mahasiswa_nim?: string;
  tanggal_pengajuan?: string;
  [key: string]: any;
}

export interface VerificationItem extends PengajuanItem {}

export interface VerifikasiQueryParams {
  status?: string;
  kategori?: string;
  jenis_group?: string;
  level?: string;
  tahun?: number | string;
  search?: string;
  sort_by?: string;
  sort_dir?: "asc" | "desc";
  limit?: number;
  page?: number;
}

export interface PengajuanResponse {
  success: boolean;
  message: string;
  data: PengajuanItem[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
