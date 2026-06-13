"use client";

import { FilterSection } from "@/features/shared/components/FilterSection";

const ACTION_OPTIONS = ["Semua Aksi", "Dibuat", "Diubah", "Dihapus"];
const CATEGORY_OPTIONS = [
  "Semua Kategori",
  "Prestasi",
  "Sertifikasi",
  "Rekognisi",
];

const getActionValue = (label: string) => {
  if (label === "Dibuat") return "created";
  if (label === "Diubah") return "updated";
  if (label === "Dihapus") return "deleted";
  return undefined;
};

const getActionLabel = (value?: string) => {
  if (value === "created") return "Dibuat";
  if (value === "updated") return "Diubah";
  if (value === "deleted") return "Dihapus";
  return "Semua Aksi";
};

const getCategoryValue = (label: string) => {
  if (label === "Prestasi") return "prestasi";
  if (label === "Sertifikasi") return "sertifikasi";
  if (label === "Rekognisi") return "rekognisi";
  return undefined;
};

const getCategoryLabel = (value?: string) => {
  if (!value) return "Semua Kategori";
  const lower = value.toLowerCase();
  if (lower.includes("prestasi")) return "Prestasi";
  if (lower.includes("sertifikasi")) return "Sertifikasi";
  if (lower.includes("rekognisi")) return "Rekognisi";
  return "Semua Kategori";
};

interface ActivityLogFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  actionValue?: string;
  onActionChange: (value?: string) => void;
  categoryValue?: string;
  onCategoryChange: (value?: string) => void;
}

export function ActivityLogFilter({
  search,
  onSearchChange,
  actionValue,
  onActionChange,
  categoryValue,
  onCategoryChange,
}: ActivityLogFilterProps) {
  return (
    <FilterSection
      search={search}
      setSearch={onSearchChange}
      category={getActionLabel(actionValue)}
      setCategory={(label) => onActionChange(getActionValue(label))}
      categories={ACTION_OPTIONS}
      categoryLabel='Filter Aksi'
      status={getCategoryLabel(categoryValue)}
      setStatus={(label) => onCategoryChange(getCategoryValue(label))}
      statuses={CATEGORY_OPTIONS}
      statusLabel='Filter Kategori'
    />
  );
}
