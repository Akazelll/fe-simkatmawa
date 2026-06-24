/**
 * Menormalkan `action_url` dari backend ke route frontend ini.
 *
 * Backend memakai path bergaya portal mahasiswa (mis. `/mahasiswa/prestasi/42`),
 * sementara route FE ini `/achievement/[id]`, `/certificate/[id]`,
 * `/recognition/[id]` (grup `(main)`, tanpa prefix role). Fungsi ini membuang
 * origin + prefix role, lalu memetakan segmen resource ke padanan FE.
 *
 * Contoh:
 *   `/mahasiswa/prestasi/42`          -> `/achievement/42`
 *   `/mahasiswa/sertifikasi/4`        -> `/certificate/4`
 *   `/admin/verifikasi/prestasi/42`   -> `/verification/prestasi/42`
 *   `/admin/sync-queue`              -> `/queue`
 *   `/superadmin/sync-queue`         -> `/queue`
 *   `https://x/mahasiswa/rekognisi/8` -> `/recognition/8`
 *
 * Path yang tidak dikenal dikembalikan apa adanya (sudah di-strip role) agar
 * tetap bisa dinavigasi. `null`/kosong -> `null` (klik tidak melakukan apa-apa).
 */

const ROLE_PREFIXES = new Set(["mahasiswa", "admin", "superadmin"]);

// Segmen resource pertama (pasca strip role) dipetakan ke padanan route FE.
// Catatan: segmen `type` verifikasi (mis. `sertifikasi`) sengaja TIDAK dipetakan
// — halaman `/verification/[type]/[id]` sudah menerima nilai backend apa adanya.
const RESOURCE_SEGMENT_MAP: Record<string, string> = {
  prestasi: "achievement",
  sertifikasi: "certificate",
  rekognisi: "recognition",
  verifikasi: "verification",
  "sync-queue": "queue", // queue_alert / system_alert / queue_monitor (admin & superadmin)
};

export function resolveActionUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  // Buang origin (http://host:port) bila action_url berupa URL absolut.
  let path = url.trim().replace(/^https?:\/\/[^/]+/i, "");
  if (!path) return null;
  if (!path.startsWith("/")) path = `/${path}`;

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  // Buang prefix role bila ada (mahasiswa/admin/superadmin).
  if (ROLE_PREFIXES.has(segments[0])) {
    segments.shift();
  }

  // Petakan segmen resource ke padanan route FE.
  if (segments.length > 0 && RESOURCE_SEGMENT_MAP[segments[0]]) {
    segments[0] = RESOURCE_SEGMENT_MAP[segments[0]];
  }

  return `/${segments.join("/")}`;
}
