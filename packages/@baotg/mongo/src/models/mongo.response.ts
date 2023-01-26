export interface MongoPageableResponse<T> {
  data: T[];
  total: number;
  page?: number;
  pageSize?: number;
}
