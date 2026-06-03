export interface MahasiswaPrestasi {
  nim: string;
  nama: string;
}

export interface DosenPembimbing {
  nuptk: string;
  nama: string;
  url_surat_tugas: string;
}

export interface UserCreator {
  id: string;
  name: string;
}

export type StatusInternal =
  | "PENDING"
  | "REJECTED"
  | "APPROVED_UNSYNCED"
  | "SYNC_SUCCESS"
  | "SYNC_FAILED";

export interface Prestasi {
  id: number;
  level: string;
  kategori: string;
  lomba: string;
  cabang: string;
  penyelenggara: string;
  peringkat: string;
  jumlah_unit_peserta: number;
  kelompok_prestasi: string;
  bentuk: string;

  url_peserta: string;
  url_sertifikat: string;
  tgl_sertifikat: string;
  url_foto_upp: string;
  url_dokumen_undangan: string;
  keterangan?: string | null;

  tahun: string;
  status_internal: StatusInternal;
  alasan_penolakan?: string | null;
  pusat_kemdikbud_id?: string | null;

  mahasiswa: MahasiswaPrestasi[];
  dosen: DosenPembimbing[];
  created_by: UserCreator;

  approved_at?: string | null;
  created_at: string;
  updated_at: string;
  can_edit: boolean;
  can_delete: boolean;
}
