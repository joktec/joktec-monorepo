import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuizzVoteLogInput implements IBaseInput {
  @IsNotEmpty()
  voteStatus!: string;

  @IsNotEmpty()
  jobseekerId!: string;

  @IsNotEmpty()
  quizId!: number;

  reason!: string;
}

export class CreateQuizzVoteLogInput extends BaseQuizzVoteLogInput implements IBaseCreateInput {}

export class UpdateQuizzVoteLogInput extends BaseQuizzVoteLogInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzVoteLogPaginationInput extends BasePaginationInput {}

export class QuizzVoteLogConditionInput extends BaseConditionInput {}

export class QuizzVoteLogQueryInput extends BaseQueryInput<QuizzVoteLogConditionInput, QuizzVoteLogPaginationInput> {}
