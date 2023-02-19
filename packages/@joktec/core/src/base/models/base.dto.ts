export interface IBaseDto {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  createdBy: string;

  updatedBy: string;

  isActive: number | boolean;
}

export type ISortDirectionDto = 'asc' | 'desc';
export type ISorterDto = {
  [key: string]: ISortDirectionDto;
};

export interface IBasePaginationDto {
  page: number | undefined;
  pageSize: number | undefined;
  sortBy: ISorterDto;
}

export interface IBaseConditionDto {
  keyword: string | undefined;
}

export interface IBaseListResponseDto<T> {
  items: T[];
  totalItems: number;
  pagination: IBasePaginationDto;
  condition: IBaseConditionDto;
}
