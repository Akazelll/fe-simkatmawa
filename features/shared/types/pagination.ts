// Metadata pagination standar dari backend (Laravel paginator / envelope kontrak API).
// Semua endpoint list mengembalikan keempat field ini di dalam `response.meta`.
export type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
