export interface PaginationResult<T> {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: T[];
}
