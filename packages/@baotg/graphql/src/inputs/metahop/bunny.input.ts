import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseBunnyInput {
  @Field(() => String, {
    nullable: false,
  })
  name!: string;
}
@InputType()
export class CreateBunnyInput extends BaseBunnyInput {}
@InputType()
export class UpdateBunnyInput extends BaseBunnyInput {}

@InputType()
export class BunnyConditionInput extends BaseConditionInput {
  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  level!: object;

  @Field(() => [String], {
    nullable: true,
  })
  type!: string[];

  @Field(() => [String], {
    nullable: true,
  })
  rarity!: string[];

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  iq!: object;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  eq!: object;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  luck!: object;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  identity!: object;

  @Field(() => GraphQLJSONObject, {
    nullable: true,
  })
  knowledge!: object;
}
@InputType()
export class BunnyPaginationInput extends BasePaginationInput {}

@InputType()
export class BunnyQueryInput extends BaseQueryInput({
  conditionInput: BunnyConditionInput,
  paginationInput: BunnyPaginationInput,
})<BunnyConditionInput, BunnyPaginationInput> {}
