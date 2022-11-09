import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
export class BaseQuizzActionLogInput implements IBaseInput {
  @IsNotEmpty()
  action!: string;

  @IsNotEmpty()
  jobseekerId!: string;

  @IsNotEmpty()
  quizId!: number;

  @IsNotEmpty()
  isClaimedCheckin!: number;
}

export class CreateQuizzActionLogInput extends BaseQuizzActionLogInput implements IBaseCreateInput {}

export class UpdateQuizzActionLogInput extends BaseQuizzActionLogInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzActionLogPaginationInput extends BasePaginationInput {}

export class QuizzActionLogConditionInput extends BaseConditionInput {}

export class QuizzActionLogQueryInput extends BaseQueryInput<
  QuizzActionLogConditionInput,
  QuizzActionLogPaginationInput
> {}
