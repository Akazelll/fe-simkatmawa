// Pemetaan status submisi untuk role MAHASISWA.
//
// Backend memiliki 5 status internal (StatusInternal):
//   PENDING, REJECTED, APPROVED_UNSYNCED, SYNC_SUCCESS, SYNC_FAILED
// Bagi mahasiswa, status sinkronisasi internal disembunyikan dan dikerucutkan
// menjadi 3 keadaan saja: Menunggu Verifikasi / Berhasil / Ditolak.

export type MahasiswaStatusGroup = "PENDING" | "BERHASIL" | "REJECTED";

// Kelompokkan status internal apa pun menjadi salah satu dari 3 grup mahasiswa.
export function toMahasiswaStatusGroup(status: string): MahasiswaStatusGroup {
  const s = (status || "").toUpperCase();

  if (s === "REJECTED") return "REJECTED";
  if (s === "PENDING") return "PENDING";

  // APPROVED_UNSYNCED, SYNC_SUCCESS, SYNC_FAILED → sudah disetujui = "Berhasil"
  return "BERHASIL";
}

// Opsi dropdown filter status pada halaman list mahasiswa.
export const MAHASISWA_STATUS_OPTIONS = [
  "Semua Status",
  "Menunggu Verifikasi",
  "Berhasil",
  "Ditolak",
];

// Nilai param backend untuk grup "Berhasil" — banyak status dipisah koma.
const BERHASIL_PARAM = "APPROVED_UNSYNCED,SYNC_SUCCESS,SYNC_FAILED";

// Konversi label dropdown → nilai param `status` yang dikirim ke backend.
export function mapMahasiswaStatusFilter(label: string): string | undefined {
  switch (label) {
    case "Menunggu Verifikasi":
      return "PENDING";
    case "Berhasil":
      return BERHASIL_PARAM;
    case "Ditolak":
      return "REJECTED";
    default:
      return undefined; // "Semua Status"
  }
}

// Kebalikannya: nilai param `status` → label dropdown (untuk tampilan terpilih).
export function mahasiswaStatusParamToLabel(param?: string): string {
  switch (param) {
    case "PENDING":
      return "Menunggu Verifikasi";
    case BERHASIL_PARAM:
      return "Berhasil";
    case "REJECTED":
      return "Ditolak";
    default:
      return "Semua Status";
  }
}
