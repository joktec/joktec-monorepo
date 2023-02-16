export interface IPageableResponse<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPage: number;
  isLastPage: boolean;
}
