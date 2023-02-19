import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BaseLocationInput {
  @Field(() => String, {
    nullable: true,
  })
  cityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  countryId: string;

  @Field(() => Date, {
    nullable: true,
  })
  lateUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => Int, {
    nullable: true,
  })
  enabled: number;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight: string;

  @Field(() => Number, {
    nullable: true,
  })
  prioritySearch: number;
}

@InputType()
export class CreateLocationInput extends BaseLocationInput {}

@InputType()
export class UpdateLocationInput extends BaseLocationInput {
  @Field()
  id!: string;
}

@InputType()
export class LocationPaginationInput extends BasePaginationInput {
  @Field(() => Number, { nullable: true })
  sqlId: number;
}

@InputType()
export class LocationConditionInput extends BaseConditionInput {
  @Field(() => Number, { nullable: true })
  parentId: number;
}

@InputType()
export class LocationQueryInput extends BaseQueryInput({
  conditionInput: LocationConditionInput,
  paginationInput: LocationPaginationInput,
})<LocationConditionInput, LocationPaginationInput> {}
