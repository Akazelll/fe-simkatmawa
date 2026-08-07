// features/shared/types/pagination.ts

export interface PaginationMeta {
  current_page: number;
  from?: number | null;
  last_page: number;
  per_page: number;
  to?: number | null;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}