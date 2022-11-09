import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCountryInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;

  nameEng!: string;
}

export class CreateCountryInput extends BaseCountryInput implements IBaseCreateInput {}

export class UpdateCountryInput extends BaseCountryInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class CountryPaginationInput extends BasePaginationInput {}

export class CountryConditionInput extends BaseConditionInput {}

export class CountryQueryInput extends BaseQueryInput<CountryConditionInput, CountryPaginationInput> {}
