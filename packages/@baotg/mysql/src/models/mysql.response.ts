export interface PageableResponse<T> {
  total: number;
  data: T[];
}

export interface PaginationResponse<T> {
  totalRecord?: number;
  page?: number;
  pageSize?: number;
  collection?: T[];
}
