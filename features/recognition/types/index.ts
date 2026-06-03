export interface SubmissionMahasiswa {
  nim: string;
  nama: string;
}

export interface SubmissionDosen {
  nuptk: string;
  nama: string;
  url_surat_tugas: string;
}

export interface Rekognisi {
  id: string | number;
  nama: string;
  jenis: string;
  level: string;
  penyelenggara: string;
  url_sertifikat: string;
  tahun: number | string;
  status_internal: string;
  alasan_penolakan?: string;
  can_edit: boolean;
  can_delete: boolean;

  // Field detail (opsional — terisi dari getRekognisiDetail)
  url_peserta?: string;
  tgl_sertifikat?: string;
  url_foto_upp?: string;
  url_dokumen_undangan?: string;
  keterangan?: string | null;
  mahasiswa?: SubmissionMahasiswa[];
  dosen?: SubmissionDosen[];
}
