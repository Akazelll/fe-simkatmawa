// features/shared/hooks/usePaginationFilter.ts
import { useState, useCallback } from "react";
import { useDebounce } from "./useDebounce";

export function usePaginationFilter(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");

  // Debounce search untuk mencegah spam request API
  const debouncedSearch = useDebounce(search, 500);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1); // Selalu kembalikan ke page 1 jika kata kunci berubah
  }, []);

  return {
    page,
    setPage,
    search,
    setSearch: handleSearchChange,
    debouncedSearch,
  };
}
