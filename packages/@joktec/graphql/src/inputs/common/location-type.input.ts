import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseLocationTypeInput {}

@InputType()
export class CreateLocationTypeInput extends BaseLocationTypeInput {}

@InputType()
export class UpdateLocationTypeInput extends BaseLocationTypeInput {
  @Field()
  id!: string;
}

@InputType()
export class LocationTypePaginationInput extends BasePaginationInput {}

@InputType()
export class LocationTypeConditionInput extends BaseConditionInput {
  @Field(() => Number, { nullable: true })
  level: number;
}

@InputType()
export class LocationTypeQueryInput extends BaseQueryInput({
  conditionInput: LocationTypeConditionInput,
  paginationInput: LocationTypePaginationInput,
})<LocationTypeConditionInput, LocationTypePaginationInput> {}
