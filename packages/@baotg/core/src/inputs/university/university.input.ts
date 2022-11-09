import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseUniversityInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  nameEng!: string;
}

export class CreateUniversityInput extends BaseUniversityInput implements IBaseCreateInput {}

export class UpdateUniversityInput extends BaseUniversityInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class UniversityPaginationInput extends BasePaginationInput {}

export class UniversityConditionInput extends BaseConditionInput {}

export class UniversityQueryInput extends BaseQueryInput<UniversityConditionInput, UniversityPaginationInput> {}
