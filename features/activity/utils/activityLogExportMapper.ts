export const getActionLabel = (action?: string) => {
  if (action === "created") return "Dibuat";
  if (action === "updated") return "Diubah";
  if (action === "deleted") return "Dihapus";
  if (action === "restored") return "Dipulihkan";

  return action || "-";
};

function getValidText(value: unknown, fallback = "-") {
  if (value === null || value === undefined) return fallback;

  const text = String(value).trim();

  if (!text || text === "-" || text === "—") {
    return fallback;
  }

  return text;
}

function resolveTarget(item: any) {
  const directTarget = item?.informasi_umum?.target ?? item?.target;
  const validDirectTarget = getValidText(directTarget, "");

  if (validDirectTarget) {
    return validDirectTarget;
  }

  const after = item?.perubahan_data?.sesudah ?? item?.attributes ?? {};
  const before = item?.perubahan_data?.sebelum ?? item?.old ?? {};

  const targetFields = [
    "judul",
    "title",
    "nama",
    "name",
    "judul_kegiatan",
    "judul_prestasi",
    "nama_prestasi",
    "nama_lomba",
    "nama_kegiatan",
    "lomba",
    "nama_sertifikasi",
    "nama_sertifikat",
    "judul_sertifikasi",
    "judul_sertifikat",
    "nama_rekognisi",
    "judul_rekognisi",
  ];

  for (const field of targetFields) {
    const value = getValidText(after?.[field], "");

    if (value) {
      return value;
    }
  }

  for (const field of targetFields) {
    const value = getValidText(before?.[field], "");

    if (value) {
      return value;
    }
  }

  return getValidText(item?.description);
}

export function normalizeActivityLogs(response: any, currentUserName?: string) {
  const logsData =
    response?.data?.data ?? response?.data ?? response?.items ?? [];

  if (!Array.isArray(logsData)) {
    return [];
  }

  return logsData.map((item: any) => {
    const info = item?.informasi_umum ?? {};

    const pelaku = getValidText(
      info?.pelaku ??
        item?.causer?.name ??
        item?.user ??
        currentUserName ??
        "Mahasiswa",
    );

    const aksi = getValidText(
      info?.aksi ?? getActionLabel(item?.event ?? item?.action),
    );

    return {
      id: item?.id,

      waktu: getValidText(info?.waktu ?? item?.created_at ?? item?.timestamp),
      pelaku,
      aksi,
      modul: getValidText(info?.modul ?? item?.module ?? item?.log_name),
      target: resolveTarget(item),

      user: pelaku,
      action: aksi,
      timestamp: item?.created_at ?? item?.timestamp ?? info?.waktu,

      informasi_umum: item?.informasi_umum,
      perubahan_data: item?.perubahan_data,
      event: item?.event,
      created_at: item?.created_at,
      description: item?.description,
    };
  });
}
