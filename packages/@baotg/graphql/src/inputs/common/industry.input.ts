import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BaseIndustryInput {
  @Field(() => String, {
    nullable: true,
  })
  code!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  urlCode!: string;

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
  logoColor!: string;

  @Field(() => String, {
    nullable: true,
  })
  image!: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight!: string;

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
  priority!: number;

  @Field(() => Number, {
    nullable: true,
  })
  platform!: number;

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

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlight!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlightFpto!: number;
}

@InputType()
export class CreateIndustryInput extends BaseIndustryInput {}

@InputType()
export class UpdateIndustryInput extends BaseIndustryInput {
  @Field()
  id!: string;
}

@InputType()
export class IndustryPaginationInput extends BasePaginationInput {
  @Field(() => Number, { nullable: true })
  sqlId: number;
}

@InputType()
export class IndustryConditionInput extends BaseConditionInput {
  @Field(() => Number, { nullable: true })
  parentId: number;

  @Field(() => Boolean, { nullable: true })
  hasPriority: boolean;

  @Field(() => Number, { nullable: true })
  priority: number;
}

@InputType()
export class IndustryQueryInput extends BaseQueryInput({
  conditionInput: IndustryConditionInput,
  paginationInput: IndustryPaginationInput,
})<IndustryConditionInput, IndustryPaginationInput> {}
