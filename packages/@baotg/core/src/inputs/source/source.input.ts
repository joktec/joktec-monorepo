import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BaseSourceInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;
}

export class CreateSourceInput extends BaseSourceInput implements IBaseCreateInput {}

export class UpdateSourceInput extends BaseSourceInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class SourcePaginationInput extends BasePaginationInput {}

export class SourceConditionInput extends BaseConditionInput {}

export class SourceQueryInput extends BaseQueryInput<SourceConditionInput, SourcePaginationInput> {}
