export function formatDateTime(
  value: Date | string | null | undefined,
): string {
  if (!value) return "—";

  // Jika input adalah string, convert ke Date. Jika sudah Date, gunakan langsung.
  const date = value instanceof Date ? value : new Date(value);

  if (isNaN(date.getTime())) return "—";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
