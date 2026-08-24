import { AlertCircle } from "lucide-react";

/**
 * Ringkasan error submit form: pesan utama + detail validasi per-field (422).
 *
 * Backend mengembalikan `errors` berbentuk `{ field: string[] }`. Komponen ini
 * memetakan nama field teknis ke label yang ramah dibaca pengguna.
 */

/** Label ramah untuk tiap field backend (fallback ke nama field apa adanya). */
const FIELD_LABELS: Record<string, string> = {
  level: "Level",
  kategori: "Kategori",
  lomba: "Nama Kompetisi / Lomba",
  cabang: "Nama Cabang",
  peringkat: "Peringkat",
  penyelenggara: "Nama Penyelenggara",
  jumlah_unit_peserta: "Jumlah PT Peserta",
  kelompok_prestasi: "Kepesertaan",
  bentuk: "Bentuk",
  url_peserta: "URL Kompetisi / Lomba",
  url_sertifikat: "Link Dokumen Sertifikat",
  tgl_sertifikat: "Tanggal Sertifikat",
  url_foto_upp: "Link Dokumentasi Membawa Piala/Medali",
  url_dokumen_undangan: "Link Dokumen Undangan",
  keterangan: "Keterangan",
  mahasiswa: "Data Mahasiswa",
  dosen: "Data Dosen",
};

/** Ubah `mahasiswa.0.nim` / `dosen.0.url_surat_tugas` jadi label terbaca. */
const resolveFieldLabel = (field: string): string => {
  if (FIELD_LABELS[field]) return FIELD_LABELS[field];

  const [base, , child] = field.split(".");
  const baseLabel = FIELD_LABELS[base] ?? base;

  if (child) {
    const childLabel = FIELD_LABELS[child] ?? child.replace(/_/g, " ");
    return `${baseLabel} — ${childLabel}`;
  }

  return field.replace(/_/g, " ");
};

interface FormErrorSummaryProps {
  /** Pesan utama (mis. "Terdapat kesalahan pada input form."). */
  message?: string;
  /** Map error validasi backend: `{ field: ["pesan", ...] }`. */
  errors?: Record<string, string[]>;
}

export function FormErrorSummary({ message, errors }: FormErrorSummaryProps) {
  const entries = Object.entries(errors ?? {});

  if (!message && entries.length === 0) return null;

  return (
    <div className='flex flex-col gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
      <div className='flex items-center gap-2 font-medium'>
        <AlertCircle className='h-5 w-5 shrink-0' />
        <p>{message || "Terdapat kesalahan pada input form."}</p>
      </div>

      {entries.length > 0 && (
        <ul className='ml-7 list-disc space-y-1'>
          {entries.map(([field, messages]) => (
            <li key={field}>
              <span className='font-semibold'>{resolveFieldLabel(field)}:</span>{" "}
              {messages.join(" ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
