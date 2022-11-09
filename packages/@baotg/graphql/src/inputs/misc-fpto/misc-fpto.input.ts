import { InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class MiscFptoConditionInput extends BaseConditionInput {}

@InputType()
export class MiscFptoPaginationInput extends BasePaginationInput {}

@InputType()
export class MiscFptoQueryInput extends BaseQueryInput({
  conditionInput: MiscFptoConditionInput,
  paginationInput: MiscFptoPaginationInput,
})<MiscFptoConditionInput, MiscFptoPaginationInput> {}
