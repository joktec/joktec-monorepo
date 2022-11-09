import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseDistrictInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;

  nameEng!: string;

  lat!: number;

  lon!: number;

  parent!: string;

  @IsNotEmpty()
  city!: string;
}

export class CreateDistrictInput extends BaseDistrictInput implements IBaseCreateInput {}

export class UpdateDistrictInput extends BaseDistrictInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class DistrictPaginationInput extends BasePaginationInput {}

export class DistrictConditionInput extends BaseConditionInput {}

export class DistrictQueryInput extends BaseQueryInput<DistrictConditionInput, DistrictPaginationInput> {}
