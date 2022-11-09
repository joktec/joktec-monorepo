import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseQuizzQuestionAnswerInput implements IBaseInput {
  @IsNotEmpty()
  answer!: string;

  answerVi!: string;

  @IsNotEmpty()
  isCorrectAnswer!: number;

  questionId!: number;
}

export class CreateQuizzQuestionAnswerInput extends BaseQuizzQuestionAnswerInput implements IBaseCreateInput {}

export class UpdateQuizzQuestionAnswerInput extends BaseQuizzQuestionAnswerInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzQuestionAnswerPaginationInput extends BasePaginationInput {}

export class QuizzQuestionAnswerConditionInput extends BaseConditionInput {
  questionId!: number[];
}

export class QuizzQuestionAnswerQueryInput extends BaseQueryInput<
  QuizzQuestionAnswerConditionInput,
  QuizzQuestionAnswerPaginationInput
> {}
