import { MahasiswaRow, DosenRow } from "@/features/shared/hooks/useFieldList";

export const mapToPrestasiPayload = (
  formData: any,
  mahasiswaItems: MahasiswaRow[],
  dosenItems: DosenRow[],
) => {
  return {
    ...formData,
    jumlah_unit_peserta: Number(formData.jumlah_unit_peserta),
    keterangan: formData.keterangan || "",

    mahasiswa: mahasiswaItems.map((m) => ({
      nim: m.nim,
      nama: m.nama,
    })),
    dosen: dosenItems.map((d) => ({
      nuptk: d.nuptk,
      nama: d.nama,
      url_surat_tugas: d.url_surat_tugas,
    })),
  };
};
