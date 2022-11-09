import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseSettingInput {
  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  skey!: string;

  @Field(() => String, {
    nullable: false,
  })
  @IsNotEmpty()
  svalue!: string;
}

@InputType()
export class CreateSettingInput extends BaseSettingInput {}

@InputType()
export class UpdateSettingInput extends BaseSettingInput {
  // @Field()
  // id!: string;
}

@InputType()
export class SettingPaginationInput extends BasePaginationInput {}

@InputType()
export class SettingConditionInput extends BaseConditionInput {}

@InputType()
export class SettingQueryInput extends BaseQueryInput({
  conditionInput: SettingConditionInput,
  paginationInput: SettingPaginationInput,
})<SettingConditionInput, SettingPaginationInput> {}
