export interface IBaseInput {}

export interface IBaseCreateInput extends IBaseInput {}

export interface IBaseUpdateInput extends IBaseInput {
  id: string;
}

export interface IBasePaginationInput {
  page: number;
  pageSize: number;
  sortBy: string | undefined;
  orderBy: 'desc' | 'asc';
}

export interface IBaseConditionInput {
  includeTotalItems: boolean;
  keyword: string | undefined;
}
