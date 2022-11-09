import { IsNotEmpty, IsEnum } from 'class-validator';
import { QuizzLevelEnum, QuizzTypeEnum, QuizzModeEnum } from '../../enums/quizz';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseQuizzInput implements IBaseInput {
  @IsNotEmpty()
  category!: string;

  @IsNotEmpty()
  name!: string;

  nameVi!: string;

  description!: string;

  descriptionVi!: string;

  logo!: string;

  banner!: string;

  @IsEnum(QuizzLevelEnum)
  @IsNotEmpty()
  level!: string;

  @IsEnum(QuizzTypeEnum)
  @IsNotEmpty()
  type!: string;

  duration!: number;

  tags!: string;

  whitelist!: string;

  @IsEnum(QuizzModeEnum)
  @IsNotEmpty()
  mode!: string;

  @IsNotEmpty()
  numberOfQuestions!: number;

  isFreeToPlay!: number;

  hideResults!: number;

  eventTag!: string;

  language!: string;
}

export class CreateQuizzInput extends BaseQuizzInput implements IBaseCreateInput {}

export class UpdateQuizzInput extends BaseQuizzInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzPaginationInput extends BasePaginationInput {}

export class QuizzConditionInput extends BaseConditionInput {
  @IsEnum(QuizzLevelEnum)
  level!: string[];

  category!: string[];

  @IsEnum(QuizzTypeEnum)
  type!: string[];

  @IsEnum(QuizzModeEnum)
  mode!: string[];

  isFreeToPlay!: number;
}

export class QuizzQueryInput extends BaseQueryInput<QuizzConditionInput, QuizzPaginationInput> {}
