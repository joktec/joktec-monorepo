import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvTemplateInput {
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
  linkThumbnail!: string;

  @Field(() => String, {
    nullable: true,
  })
  linkOriginal!: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;
}

@InputType()
export class CreateCvTemplateInput extends BaseCvTemplateInput {}

@InputType()
export class UpdateCvTemplateInput extends BaseCvTemplateInput {
  @Field()
  id!: string;
}

@InputType()
export class CvTemplatePaginationInput extends BasePaginationInput {}

@InputType()
export class CvTemplateConditionInput extends BaseConditionInput {}

@InputType()
export class CvTemplateQueryInput extends BaseQueryInput({
  conditionInput: CvTemplateConditionInput,
  paginationInput: CvTemplatePaginationInput,
})<CvTemplateConditionInput, CvTemplatePaginationInput> {}
