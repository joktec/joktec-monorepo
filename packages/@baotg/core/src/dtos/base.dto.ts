import { IsNotEmpty } from 'class-validator';
import { IBaseConditionDto, IBaseDto, IBaseListResponseDto, IBasePaginationDto } from '../interfaces';

export class BaseDto implements IBaseDto {
  @IsNotEmpty()
  id!: string;

  createdAt!: Date;

  updatedAt!: Date;

  createdBy!: string;

  updatedBy!: string;

  sqlId!: string | number;

  isActive!: number | boolean;
}

export class BasePaginationDto implements IBasePaginationDto {
  page: number | undefined;
  pageSize: number | undefined;
  sortBy: string | undefined;
  orderBy: 'asc' | 'desc' = 'desc';
}

export class BaseConditionDto implements IBaseConditionDto {
  includeTotalItems: boolean = false;
  keyword: string | undefined = undefined;
}

export class BaseListResponseDto<
  DTO,
  CONDITION extends BaseConditionDto = BaseConditionDto,
  PAGINATION extends BasePaginationDto = BasePaginationDto,
> implements IBaseListResponseDto<DTO>
{
  items: DTO[] = [];
  pagination: PAGINATION = {
    page: 1,
    pageSize: 10,
    sortBy: undefined,
    orderBy: 'desc',
  } as PAGINATION;
  condition: CONDITION = {
    includeTotalItems: false,
    keyword: undefined,
  } as CONDITION;

  totalItems: number = 0;
}
