import { useState } from "react";

export function useFieldList<T extends object>(initial: T, seed?: T[]) {
  const [items, setItems] = useState<T[]>(
    seed && seed.length > 0 ? seed.map((s) => ({ ...s })) : [{ ...initial }],
  );

  const add = () => setItems((prev) => [...prev, { ...initial }]);

  const remove = (index: number) =>
    setItems((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );

  const update = (index: number, field: keyof T, value: string) =>
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );

  return { items, add, remove, update };
}

export interface MahasiswaRow {
  nim: string;
  nama: string;
}

export interface DosenRow {
  nuptk: string;
  nama: string;
  url_surat_tugas: string;
}

export const MAHASISWA_INITIAL: MahasiswaRow = { nim: "", nama: "" };
export const DOSEN_INITIAL: DosenRow = {
  nuptk: "",
  nama: "",
  url_surat_tugas: "",
};
