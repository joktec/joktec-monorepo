import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuizzLogQuestionAnswerInput implements IBaseInput {
  @IsNotEmpty()
  answers!: string;

  @IsNotEmpty()
  correctAnswers!: string;

  @IsNotEmpty()
  isCorrect!: number;

  @IsNotEmpty()
  score!: number;

  @IsNotEmpty()
  questionId!: number;

  @IsNotEmpty()
  quizMatchId!: number;

  @IsNotEmpty()
  usedHint!: number;

  metaData!: string;
}

export class CreateQuizzLogQuestionAnswerInput extends BaseQuizzLogQuestionAnswerInput implements IBaseCreateInput {}

export class UpdateQuizzLogQuestionAnswerInput extends BaseQuizzLogQuestionAnswerInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzLogQuestionAnswerPaginationInput extends BasePaginationInput {}

export class QuizzLogQuestionAnswerConditionInput extends BaseConditionInput {}

export class QuizzLogQuestionAnswerQueryInput extends BaseQueryInput<
  QuizzLogQuestionAnswerConditionInput,
  QuizzLogQuestionAnswerPaginationInput
> {}
