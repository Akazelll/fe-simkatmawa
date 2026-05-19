import { useState } from "react";

export function useFieldList<T extends object>(initial: T) {
  const [items, setItems] = useState<T[]>([{ ...initial }]);

  const add = () => setItems((prev) => [...prev, { ...initial }]);

  const remove = (index: number) =>
    setItems((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );

  const update = (index: number, field: keyof T, value: string) =>
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );

  return { items, add, remove, update };
}

export interface MahasiswaRow {
  nim: string;
  nama: string;
}

export interface DosenRow {
  nidn: string;
  nama: string;
  suratTugas: string;
}

export const MAHASISWA_INITIAL: MahasiswaRow = { nim: "", nama: "" };
export const DOSEN_INITIAL: DosenRow = { nidn: "", nama: "", suratTugas: "" };
