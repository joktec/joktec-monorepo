import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@baotg/graphql';

@InputType()
export class BaseCityInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  code!: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => String, {
    nullable: true,
  })
  @IsNotEmpty()
  country!: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority!: number;

  @Field(() => Number, {
    nullable: true,
  })
  prioritySearch!: number;

  @Field(() => Number, {
    nullable: true,
  })
  enabled!: number;

  @Field(() => String, {
    nullable: true,
  })
  image!: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight!: string;
}

@InputType()
export class CreateCityInput extends BaseCityInput {}

@InputType()
export class UpdateCityInput extends BaseCityInput {
  // @Field()
  // id!: string;
}

@InputType()
export class CityPaginationInput extends BasePaginationInput {}

@InputType()
export class CityConditionInput extends BaseConditionInput {}

@InputType()
export class CityQueryInput extends BaseQueryInput({
  conditionInput: CityConditionInput,
  paginationInput: CityPaginationInput,
})<CityConditionInput, CityPaginationInput> {}
