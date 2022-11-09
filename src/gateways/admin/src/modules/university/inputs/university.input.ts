import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseUniversityInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  name!: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  code!: string;
}

@InputType()
export class CreateUniversityInput extends BaseUniversityInput {}

@InputType()
export class UpdateUniversityInput extends BaseUniversityInput {
  // @Field()
  // id!: string;
}

@InputType()
export class UniversityPaginationInput extends BasePaginationInput {}

@InputType()
export class UniversityConditionInput extends BaseConditionInput {}

@InputType()
export class UniversityQueryInput extends BaseQueryInput({
  conditionInput: UniversityConditionInput,
  paginationInput: UniversityPaginationInput,
})<UniversityConditionInput, UniversityPaginationInput> {}
