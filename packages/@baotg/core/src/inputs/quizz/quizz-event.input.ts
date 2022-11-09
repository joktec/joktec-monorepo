import { IsNotEmpty, IsEnum } from 'class-validator';
import { QuizzEventTypeEnum } from '../../enums/quizz';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseQuizzEventInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  showBannerFrom!: Date;

  @IsNotEmpty()
  showBannerTo!: Date;

  @IsNotEmpty()
  startAt!: Date;

  @IsNotEmpty()
  endAt!: Date;

  banner!: string;

  @IsNotEmpty()
  quizId!: number;

  @IsEnum(QuizzEventTypeEnum)
  @IsNotEmpty()
  eventType!: string;

  eventLink!: string;

  endEventLink!: string;
}

export class CreateQuizzEventInput extends BaseQuizzEventInput implements IBaseCreateInput {}

export class UpdateQuizzEventInput extends BaseQuizzEventInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzEventPaginationInput extends BasePaginationInput {}

export class QuizzEventConditionInput extends BaseConditionInput {
  quizId!: number[];
}

export class QuizzEventQueryInput extends BaseQueryInput<QuizzEventConditionInput, QuizzEventPaginationInput> {}
