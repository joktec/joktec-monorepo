import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { ApiProperty } from '@nestjs/swagger';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseQuizzLanguageInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  logo!: string;
}

export class CreateQuizzLanguageInput extends BaseQuizzLanguageInput implements IBaseCreateInput {}

export class UpdateQuizzLanguageInput extends BaseQuizzLanguageInput implements IBaseUpdateInput {
  @ApiProperty()
  @IsNotEmpty()
  id!: string;
}

export class QuizzLanguagePaginationInput extends BasePaginationInput {}

export class QuizzLanguageConditionInput extends BaseConditionInput {}

export class QuizzLanguageQueryInput extends BaseQueryInput<
  QuizzLanguageConditionInput,
  QuizzLanguagePaginationInput
> {}
