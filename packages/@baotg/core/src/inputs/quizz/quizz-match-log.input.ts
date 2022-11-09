import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuizzMatchLogInput implements IBaseInput {
  @IsNotEmpty()
  score!: number;

  @IsNotEmpty()
  status!: string;

  @IsNotEmpty()
  finishedPercent!: number;

  finishedAt!: Date;

  @IsNotEmpty()
  jobseekerId!: string;

  @IsNotEmpty()
  quizId!: number;

  @IsNotEmpty()
  isTimeOut!: number;

  questionOrder!: string;

  replayMatchId!: string;
}

export class CreateQuizzMatchLogInput extends BaseQuizzMatchLogInput implements IBaseCreateInput {}

export class UpdateQuizzMatchLogInput extends BaseQuizzMatchLogInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzMatchLogPaginationInput extends BasePaginationInput {}

export class QuizzMatchLogConditionInput extends BaseConditionInput {
  quizId!: number[];
}

export class QuizzMatchLogQueryInput extends BaseQueryInput<
  QuizzMatchLogConditionInput,
  QuizzMatchLogPaginationInput
> {}
