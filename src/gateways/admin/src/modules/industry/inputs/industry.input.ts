import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from "@nestjs/graphql";
import {
  BaseConditionInput,
  BasePaginationInput,
  BaseQueryInput,
} from '@jobhopin/graphql';

@InputType()
export class BaseIndustryInput {
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

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

  @Field(() => String, {
    nullable: true,
  })
  image!: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority!: number;

  @Field(() => Number, {
    nullable: true,
  })
  platform!: number;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight!: string;

  @Field(() => Number, {
    nullable: true,
  })
  isTpActive!: number;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoActive!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityTop!: number;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoTop!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityFooter!: number;

  @Field(() => String, {
    nullable: true,
  })
  hlLogo!: string;

  @Field(() => String, {
    nullable: true,
  })
  hlLogoColor!: string;

  @Field(() => String, {
    nullable: true,
  })
  hlImage!: string;

  @Field(() => String, {
    nullable: true,
  })
  hlImageHighlight!: string;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlight!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlightFpto!: number;

  @Field(() => String, {
    nullable: true,
  })
  urlCode!: string;
}

@InputType()
export class CreateIndustryInput extends BaseIndustryInput {}

@InputType()
export class UpdateIndustryInput extends BaseIndustryInput {
  // @Field()
  // id!: string;
}

@InputType()
export class IndustryPaginationInput extends BasePaginationInput {}

@InputType()
export class IndustryConditionInput extends BaseConditionInput {}

@InputType()
export class IndustryQueryInput extends BaseQueryInput({
  conditionInput: IndustryConditionInput,
  paginationInput: IndustryPaginationInput,
})<IndustryConditionInput, IndustryPaginationInput> {}
