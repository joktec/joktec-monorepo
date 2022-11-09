import { IsNotEmpty } from 'class-validator';
import { IBaseCreateInput, IBaseInput, IBaseUpdateInput } from '../../interfaces/base.input.interface';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

export class BasePlatformInput implements IBaseInput {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  code!: string;
}

export class CreatePlatformInput extends BasePlatformInput implements IBaseCreateInput {}

export class UpdatePlatformInput extends BasePlatformInput implements IBaseUpdateInput {
  @IsNotEmpty()
  id!: string;
}

export class PlatformPaginationInput extends BasePaginationInput {}

export class PlatformConditionInput extends BaseConditionInput {}

export class PlatformQueryInput extends BaseQueryInput<PlatformConditionInput, PlatformPaginationInput> {}
