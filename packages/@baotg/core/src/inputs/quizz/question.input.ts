import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuestionInput implements IBaseInput {
  questionId!: string;

  @IsNotEmpty()
  codeName!: string;

  name!: string;

  description!: string;

  iconUrl!: string;

  categoryId!: number;

  priority!: number;

  isActive!: number;

  @IsNotEmpty()
  isShowInsight!: number;

  descriptionInsight!: string;
}

export class CreateQuestionInput extends BaseQuestionInput implements IBaseCreateInput {}

export class UpdateQuestionInput extends BaseQuestionInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuestionPaginationInput extends BasePaginationInput {}

export class QuestionConditionInput extends BaseConditionInput {
  categoryId!: number[];
}

export class QuestionQueryInput extends BaseQueryInput<QuestionConditionInput, QuestionPaginationInput> {}
