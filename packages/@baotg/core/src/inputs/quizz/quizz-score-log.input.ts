import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseQuizzScoreLogInput implements IBaseInput {
  @IsNotEmpty()
  score!: number;

  @IsNotEmpty()
  scoreType!: string;

  @IsNotEmpty()
  jobseekerId!: string;

  quizMatchId!: number;
}

export class CreateQuizzScoreLogInput extends BaseQuizzScoreLogInput implements IBaseCreateInput {}

export class UpdateQuizzScoreLogInput extends BaseQuizzScoreLogInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzScoreLogPaginationInput extends BasePaginationInput {}

export class QuizzScoreLogConditionInput extends BaseConditionInput {}

export class QuizzScoreLogQueryInput extends BaseQueryInput<
  QuizzScoreLogConditionInput,
  QuizzScoreLogPaginationInput
> {}
