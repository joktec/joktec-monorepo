import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseHighlightCompanyInput {
  @Field(() => Number, {
    nullable: true,
  })
  id!: string;

  @Field(() => Number, {
    nullable: true,
  })
  position!: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId!: string;
}

@InputType()
export class CreateHighlightCompanyInput extends BaseHighlightCompanyInput {}

@InputType()
export class UpdateHighlightCompanyInput extends BaseHighlightCompanyInput {
  @Field()
  id!: string;
}

@InputType()
export class HighlightCompanyPaginationInput extends BasePaginationInput {
  @Field(() => Number, { nullable: true })
  sqlId: number;
}

@InputType()
export class HighlightCompanyConditionInput extends BaseConditionInput {
  @Field(() => Number, { nullable: true })
  parentId: number;
}

@InputType()
export class HighlightCompanyQueryInput extends BaseQueryInput({
  conditionInput: HighlightCompanyConditionInput,
  paginationInput: HighlightCompanyPaginationInput,
})<HighlightCompanyConditionInput, HighlightCompanyPaginationInput> {}
