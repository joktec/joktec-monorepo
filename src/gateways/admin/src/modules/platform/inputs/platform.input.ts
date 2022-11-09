import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BasePlatformInput {
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
export class CreatePlatformInput extends BasePlatformInput {}

@InputType()
export class UpdatePlatformInput extends BasePlatformInput {
  // @Field()
  // id!: string;
}

@InputType()
export class PlatformPaginationInput extends BasePaginationInput {}

@InputType()
export class PlatformConditionInput extends BaseConditionInput {}

@InputType()
export class PlatformQueryInput extends BaseQueryInput({
  conditionInput: PlatformConditionInput,
  paginationInput: PlatformPaginationInput,
})<PlatformConditionInput, PlatformPaginationInput> {}
