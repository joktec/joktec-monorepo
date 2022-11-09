import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IBaseCreateInput,
  IBaseInput,
  IBasePaginationInput,
  IBaseUpdateInput,
  IBaseConditionInput,
} from '../interfaces/base.input.interface';

export class BaseInput implements IBaseInput {}

export class BaseCreateInput extends BaseInput implements IBaseCreateInput {}

export class BaseUpdateInput extends BaseInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class BasePaginationInput implements IBasePaginationInput {
  page: number = 1;
  pageSize: number = 10;
  sortBy: string | undefined = undefined;
  orderBy: 'asc' | 'desc' = 'desc';
}

export class BaseConditionInput implements IBaseConditionInput {
  includeTotalItems: boolean = true;
  keyword: string | undefined;
}

export class BaseQueryInput<C extends BaseConditionInput, P extends BasePaginationInput> {
  condition: C | undefined;
  pagination: P | undefined;
}
