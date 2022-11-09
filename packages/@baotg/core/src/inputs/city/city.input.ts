import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseCityInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;

  nameEng!: string;

  @IsNotEmpty()
  country!: string;

  priority!: number;

  prioritySearch!: number;

  enabled!: number;

  image!: string;

  imageHighlight!: string;
}

export class CreateCityInput extends BaseCityInput implements IBaseCreateInput {}

export class UpdateCityInput extends BaseCityInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class CityPaginationInput extends BasePaginationInput {}

export class CityConditionInput extends BaseConditionInput {}

export class CityQueryInput extends BaseQueryInput<CityConditionInput, CityPaginationInput> {}
