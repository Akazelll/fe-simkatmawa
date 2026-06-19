/**
 * Offset zona waktu backend. be-simkatmawa menyimpan & menampilkan waktu
 * dalam WIB (UTC+7) — `informasi_umum.waktu` bahkan sudah berakhiran " WIB".
 * Filter rentang tanggal harus memakai WIB juga agar hasilnya konsisten
 * dengan waktu yang tampil di PDF/tabel, terlepas dari zona waktu browser.
 */
const WIB_OFFSET = "+07:00";

/**
 * Mengambil tanggal kejadian dari sebuah log. Mengutamakan `created_at`
 * (ISO 8601 UTC dari backend) karena `informasi_umum.waktu` adalah string
 * tampilan ("19 Jun 2026, 14:30 WIB") yang tidak bisa diparse `new Date`.
 */
function resolveLogTime(log: any): number | null {
  const raw = log?.created_at ?? log?.timestamp;

  if (!raw) return null;

  const time = new Date(raw).getTime();

  return Number.isNaN(time) ? null : time;
}

/**
 * Filter activity log berdasarkan rentang tanggal di sisi klien.
 *
 * Diperlukan karena backend tidak mendukung filter `start_date`/`end_date`.
 * `startDate`/`endDate` adalah string "yyyy-MM-dd" dari input tanggal.
 * Rentang bersifat inklusif: dari awal hari `startDate` sampai akhir hari
 * `endDate`, keduanya dihitung dalam WIB.
 */
export function filterActivityLogsByDateRange(
  logs: any[],
  startDate: string,
  endDate: string,
): any[] {
  if (!Array.isArray(logs)) return [];
  if (!startDate || !endDate) return [];

  const start = new Date(`${startDate}T00:00:00.000${WIB_OFFSET}`).getTime();
  const end = new Date(`${endDate}T23:59:59.999${WIB_OFFSET}`).getTime();

  if (Number.isNaN(start) || Number.isNaN(end)) return [];

  return logs.filter((log) => {
    const time = resolveLogTime(log);

    if (time === null) return false;

    return time >= start && time <= end;
  });
}