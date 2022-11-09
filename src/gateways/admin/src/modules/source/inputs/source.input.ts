import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseSourceInput {
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
export class CreateSourceInput extends BaseSourceInput {}

@InputType()
export class UpdateSourceInput extends BaseSourceInput {
  // @Field()
  // id!: string;
}

@InputType()
export class SourcePaginationInput extends BasePaginationInput {}

@InputType()
export class SourceConditionInput extends BaseConditionInput {}

@InputType()
export class SourceQueryInput extends BaseQueryInput({
  conditionInput: SourceConditionInput,
  paginationInput: SourcePaginationInput,
})<SourceConditionInput, SourcePaginationInput> {}
