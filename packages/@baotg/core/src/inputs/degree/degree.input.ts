import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseDegreeInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;
}

export class CreateDegreeInput extends BaseDegreeInput implements IBaseCreateInput {}

export class UpdateDegreeInput extends BaseDegreeInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class DegreePaginationInput extends BasePaginationInput {}

export class DegreeConditionInput extends BaseConditionInput {}

export class DegreeQueryInput extends BaseQueryInput<DegreeConditionInput, DegreePaginationInput> {}
