export interface IBaseDto {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  createdBy: string;

  updatedBy: string;

  sqlId: string | number;

  isActive: number | boolean;
}
export interface IBasePaginationDto {
  page: number | undefined;
  pageSize: number | undefined;
  sortBy: string | undefined;
  orderBy: 'desc' | 'asc';
}

export interface IBaseConditionDto {
  keyword: string | undefined;
}

export interface IBaseListResponseDto<T> {
  items: T[];
  pagination: IBasePaginationDto;
  condition: IBaseConditionDto;
  totalItems: number;
}
