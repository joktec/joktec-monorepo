import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseGameAssessementTestJobHistoryInput implements IBaseInput {
  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  applyType!: string;

  @IsNotEmpty()
  status!: string;

  @IsNotEmpty()
  cvId!: string;

  @IsNotEmpty()
  jobId!: string;

  jobseekerId!: string;

  @IsNotEmpty()
  quizId!: string;

  @IsNotEmpty()
  platform!: string;

  referralId!: string;

  testingEmail!: string;
}

export class CreateGameAssessementTestJobHistoryInput
  extends BaseGameAssessementTestJobHistoryInput
  implements IBaseCreateInput {}

export class UpdateGameAssessementTestJobHistoryInput
  extends BaseGameAssessementTestJobHistoryInput
  implements IBaseUpdateInput
{
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class GameAssessementTestJobHistoryPaginationInput extends BasePaginationInput {}

export class GameAssessementTestJobHistoryConditionInput extends BaseConditionInput {}

export class GameAssessementTestJobHistoryQueryInput extends BaseQueryInput<
  GameAssessementTestJobHistoryConditionInput,
  GameAssessementTestJobHistoryPaginationInput
> {}
