import { MahasiswaRow, DosenRow } from "@/features/shared/hooks/useFieldList";

export const mapToSertifikasiPayload = (
  rawData: any,
  mahasiswaList: MahasiswaRow[],
  dosenList: DosenRow[],
) => {
  return {
    ...rawData,
    mahasiswa: mahasiswaList.map((m) => ({
      nim: m.nim,
      nama: m.nama,
    })),

    dosen: dosenList.map((d) => ({
      nuptk: d.nuptk,
      nama: d.nama,
      url_surat_tugas: d.url_surat_tugas,
    })),
  };
};
