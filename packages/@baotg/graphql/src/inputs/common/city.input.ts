import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCityInput {
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
export class CreateCityInput extends BaseCityInput {}

@InputType()
export class UpdateCityInput extends BaseCityInput {
  @Field()
  id!: string;
}

@InputType()
export class CityPaginationInput extends BasePaginationInput {}

@InputType()
export class CityConditionInput extends BaseConditionInput {
  @Field(() => [Number], { nullable: true })
  prioritySearch: number[];

  @Field(() => [String], { nullable: true })
  locationType: string[];
}

@InputType()
export class CityQueryInput extends BaseQueryInput({
  conditionInput: CityConditionInput,
  paginationInput: CityPaginationInput,
})<CityConditionInput, CityPaginationInput> {}
