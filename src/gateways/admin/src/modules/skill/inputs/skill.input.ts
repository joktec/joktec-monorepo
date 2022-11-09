import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@baotg/graphql';

@InputType()
export class BaseSkillInput {
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
export class CreateSkillInput extends BaseSkillInput {}

@InputType()
export class UpdateSkillInput extends BaseSkillInput {
  // @Field()
  // id!: string;
}

@InputType()
export class SkillPaginationInput extends BasePaginationInput {}

@InputType()
export class SkillConditionInput extends BaseConditionInput {}

@InputType()
export class SkillQueryInput extends BaseQueryInput({
  conditionInput: SkillConditionInput,
  paginationInput: SkillPaginationInput,
})<SkillConditionInput, SkillPaginationInput> {}
