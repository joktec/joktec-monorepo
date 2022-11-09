import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuizzQuestionMediaInput implements IBaseInput {
  image!: string;

  video!: string;

  @IsNotEmpty()
  mediaType!: string;

  questionId!: number;
}

export class CreateQuizzQuestionMediaInput extends BaseQuizzQuestionMediaInput implements IBaseCreateInput {}

export class UpdateQuizzQuestionMediaInput extends BaseQuizzQuestionMediaInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzQuestionMediaPaginationInput extends BasePaginationInput {}

export class QuizzQuestionMediaConditionInput extends BaseConditionInput {
  questionId!: number[];
}

export class QuizzQuestionMediaQueryInput extends BaseQueryInput<
  QuizzQuestionMediaConditionInput,
  QuizzQuestionMediaPaginationInput
> {}
