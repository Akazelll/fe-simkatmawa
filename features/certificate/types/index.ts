export interface SubmissionMahasiswa {
  nim: string;
  nama: string;
}

export interface SubmissionDosen {
  nuptk: string;
  nama: string;
  url_surat_tugas: string;
}

export interface Certificate {
  id: string | number;
  nama: string;
  url_sertifikat: string;
  level: string;
  penyelenggara: string;
  tahun: number;
  status_internal: string;
  alasan_penolakan?: string;
  can_edit: boolean;
  can_delete: boolean;
  tanggal?: string | Date;

  // Field detail (opsional — terisi dari getSertifikasiDetail)
  url_peserta?: string;
  tgl_sertifikat?: string;
  url_foto_upp?: string;
  url_dokumen_undangan?: string;
  keterangan?: string | null;
  mahasiswa?: SubmissionMahasiswa[];
  dosen?: SubmissionDosen[];
}
