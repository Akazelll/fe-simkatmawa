/**
 * Normalisasi respons detail admin (RAW model) menjadi bentuk yang kompatibel
 * dengan komponen DetailView (Prestasi/Sertifikat/Rekognisi) milik mahasiswa.
 *
 * Endpoint admin (VerifikasiController::show) mengembalikan model mentah, jadi:
 * - `dosen[].url_surat_tugas` ada di dalam `pivot` → diratakan.
 * - tidak ada computed `tahun` → diturunkan dari `tgl_sertifikat`.
 * - `created_by` berupa integer id (bukan objek {id,name}) → dibuang.
 * Bentuk Resource (mahasiswa) juga tetap aman karena field-nya superset.
 */
export function normalizeSubmissionDetail(data: any): any {
  if (!data) return null;

  const tahun =
    data.tahun ??
    (data.tgl_sertifikat ? String(data.tgl_sertifikat).slice(0, 4) : "");

  return {
    ...data,
    tahun,
    mahasiswa: Array.isArray(data.mahasiswa)
      ? data.mahasiswa.map((m: any) => ({ nim: m.nim, nama: m.nama }))
      : [],
    dosen: Array.isArray(data.dosen)
      ? data.dosen.map((d: any) => ({
          nuptk: d.nuptk,
          nama: d.nama,
          url_surat_tugas: d.url_surat_tugas ?? d.pivot?.url_surat_tugas ?? "",
        }))
      : [],
    created_by:
      data.created_by && typeof data.created_by === "object"
        ? data.created_by
        : undefined,
  };
}
