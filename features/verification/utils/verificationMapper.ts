export interface MappedSubmission {
  name: string;
  status: string;
  category: string;
  level: string;
  organizer: string;
  date: Date;
  submittedBy: string;
  nim: string;
  rejectionReason?: string;
}

export interface MappedDocument {
  id: string | number;
  title: string;
  url: string;
}

export function mapSubmissionInfo(data: any): MappedSubmission | null {
  if (!data) return null;

  return {
    name:
      data.lomba ||
      data.nama ||
      data.aktivitas ||
      data.nama_sertifikasi ||
      "Tanpa Nama",
    status: data.status_internal,
    category: data.kategori || "Tidak ada kategori",
    level: data.level || "-",
    organizer: data.penyelenggara || "-",
    date: new Date(data.created_at),
    submittedBy: data.mahasiswa?.[0]?.nama || "-",
    nim: data.mahasiswa?.[0]?.nim || "-",
    rejectionReason: data.alasan_penolakan,
  };
}

export function mapSubmissionDocuments(data: any): MappedDocument[] {
  if (!data) return [];

  const documents: MappedDocument[] = [];
  let docId = 1;

  const pushDoc = (title: string, url: string | undefined | null) => {
    if (url) {
      documents.push({ id: docId++, title, url });
    }
  };

  pushDoc(
    "URL Kompetisi / Publikasi",
    data.url_kompetisi || data.url_publikasi,
  );
  pushDoc("URL Sertifikasi", data.url_sertifikasi);
  pushDoc("Bukti Peserta / Tautan", data.url_peserta);
  pushDoc("Dokumen Sertifikat", data.url_sertifikat);
  pushDoc("Foto UPP (Dokumentasi)", data.url_foto_upp);
  pushDoc(
    "Dokumen Undangan / Tugas",
    data.url_dokumen_undangan || data.url_dokumen_tugas,
  );

  pushDoc("Surat Tugas", data.url_surat_tugas);

  if (data.dosen && Array.isArray(data.dosen)) {
    data.dosen.forEach((d: any, idx: number) => {
      const suratTugasUrl = d.url_surat_tugas || d.pivot?.url_surat_tugas;
      if (suratTugasUrl) {
        pushDoc(`Surat Tugas Dosen (${d.nama || idx + 1})`, suratTugasUrl);
      }
    });
  }

  return documents;
}
