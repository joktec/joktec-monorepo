import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseSettingInput implements IBaseInput {
  @IsNotEmpty()
  skey!: string;

  @IsNotEmpty()
  svalue!: string;
}

export class CreateSettingInput extends BaseSettingInput implements IBaseCreateInput {}

export class UpdateSettingInput extends BaseSettingInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class SettingPaginationInput extends BasePaginationInput {}

export class SettingConditionInput extends BaseConditionInput {}

export class SettingQueryInput extends BaseQueryInput<SettingConditionInput, SettingPaginationInput> {}
