import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseCountryInput {
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
}

@InputType()
export class CreateCountryInput extends BaseCountryInput {}

@InputType()
export class UpdateCountryInput extends BaseCountryInput {
  // @Field()
  // id!: string;
}

@InputType()
export class CountryPaginationInput extends BasePaginationInput {}

@InputType()
export class CountryConditionInput extends BaseConditionInput {}

@InputType()
export class CountryQueryInput extends BaseQueryInput({
  conditionInput: CountryConditionInput,
  paginationInput: CountryPaginationInput,
})<CountryConditionInput, CountryPaginationInput> {}
