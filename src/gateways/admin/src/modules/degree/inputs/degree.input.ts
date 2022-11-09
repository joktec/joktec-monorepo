import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@baotg/graphql';

@InputType()
export class BaseDegreeInput {
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
}

@InputType()
export class CreateDegreeInput extends BaseDegreeInput {}

@InputType()
export class UpdateDegreeInput extends BaseDegreeInput {
  // @Field()
  // id!: string;
}

@InputType()
export class DegreePaginationInput extends BasePaginationInput {}

@InputType()
export class DegreeConditionInput extends BaseConditionInput {}

@InputType()
export class DegreeQueryInput extends BaseQueryInput({
  conditionInput: DegreeConditionInput,
  paginationInput: DegreePaginationInput,
})<DegreeConditionInput, DegreePaginationInput> {}
