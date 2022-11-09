import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseSkillInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;
}

export class CreateSkillInput extends BaseSkillInput implements IBaseCreateInput {}

export class UpdateSkillInput extends BaseSkillInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class SkillPaginationInput extends BasePaginationInput {}

export class SkillConditionInput extends BaseConditionInput {}

export class SkillQueryInput extends BaseQueryInput<SkillConditionInput, SkillPaginationInput> {}
