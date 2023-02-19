import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseMiscInput {}

@InputType()
export class MiscPaginationInput extends BasePaginationInput {}

@InputType()
export class MiscConditionInput extends BaseConditionInput {}

@InputType()
export class MiscQueryInput extends BaseQueryInput({
  conditionInput: MiscConditionInput,
  paginationInput: MiscPaginationInput,
})<MiscConditionInput, MiscPaginationInput> {}
