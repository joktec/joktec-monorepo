import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuizzCategoryInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  nameVi!: string;
}

export class CreateQuizzCategoryInput extends BaseQuizzCategoryInput implements IBaseCreateInput {}

export class UpdateQuizzCategoryInput extends BaseQuizzCategoryInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzCategoryPaginationInput extends BasePaginationInput {}

export class QuizzCategoryConditionInput extends BaseConditionInput {}

export class QuizzCategoryQueryInput extends BaseQueryInput<
  QuizzCategoryConditionInput,
  QuizzCategoryPaginationInput
> {}
