export function formatDateTime(value: string | null): string {
  if (!value) return "—";

  try {
    const date = new Date(value);

    // Validasi apakah string tanggal valid
    if (isNaN(date.getTime())) return "—";

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  } catch {
    return "—";
  }
}
