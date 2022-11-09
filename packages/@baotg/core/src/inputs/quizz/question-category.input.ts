import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuestionCategoryInput implements IBaseInput {
  categoryId!: string;

  @IsNotEmpty()
  codeName!: string;

  @IsNotEmpty()
  name!: string;

  description!: string;

  imageActiveMode!: string;

  imageDisableMode!: string;

  priority!: number;

  isActive!: number;
}

export class CreateQuestionCategoryInput extends BaseQuestionCategoryInput implements IBaseCreateInput {}

export class UpdateQuestionCategoryInput extends BaseQuestionCategoryInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuestionCategoryPaginationInput extends BasePaginationInput {}

export class QuestionCategoryConditionInput extends BaseConditionInput {}

export class QuestionCategoryQueryInput extends BaseQueryInput<
  QuestionCategoryConditionInput,
  QuestionCategoryPaginationInput
> {}
