import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuizzQuestionInput implements IBaseInput {
  @IsNotEmpty()
  question!: string;

  questionVi!: string;

  hint!: string;

  hintVi!: string;

  explanation!: string;

  explanationVi!: string;

  @IsNotEmpty()
  score!: number;

  @IsNotEmpty()
  isMultiAnswer!: number;

  @IsNotEmpty()
  quizId!: number;

  isFreetext!: string;

  cloneFromId!: string;

  description!: string;
}

export class CreateQuizzQuestionInput extends BaseQuizzQuestionInput implements IBaseCreateInput {}

export class UpdateQuizzQuestionInput extends BaseQuizzQuestionInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzQuestionPaginationInput extends BasePaginationInput {}

export class QuizzQuestionConditionInput extends BaseConditionInput {
  quizId!: number[];
}

export class QuizzQuestionQueryInput extends BaseQueryInput<
  QuizzQuestionConditionInput,
  QuizzQuestionPaginationInput
> {}
