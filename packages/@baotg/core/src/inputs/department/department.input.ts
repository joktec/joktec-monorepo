import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseDepartmentInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;

  nameEng!: string;

  priority!: number;
}

export class CreateDepartmentInput extends BaseDepartmentInput implements IBaseCreateInput {}

export class UpdateDepartmentInput extends BaseDepartmentInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class DepartmentPaginationInput extends BasePaginationInput {}

export class DepartmentConditionInput extends BaseConditionInput {}

export class DepartmentQueryInput extends BaseQueryInput<DepartmentConditionInput, DepartmentPaginationInput> {}
