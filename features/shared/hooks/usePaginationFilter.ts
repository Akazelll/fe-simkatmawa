import { useState, useMemo, useEffect } from "react";

interface FilterParams<T> {
  data: T[];
  pageSize: number;
  filterFn: (
    item: T,
    search: string,
    category: string,
    status: string,
    year: string,
  ) => boolean;
}

export function usePaginationFilter<T>({
  data,
  pageSize,
  filterFn,
}: FilterParams<T>) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua Kategori");
  const [status, setStatus] = useState("Semua Status");
  const [year, setYear] = useState("Semua Tahun"); // Tambahkan state year
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return data.filter((row) => filterFn(row, search, category, status, year));
  }, [data, search, category, status, year, filterFn]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    return filtered.slice((page - 1) * pageSize, page * pageSize);
  }, [filtered, page, pageSize]);

  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  useEffect(() => setPage(1), [search, category, status, year]);

  return {
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    year,
    setYear,
    page,
    totalPages,
    paginated,
    goTo,
  };
}
