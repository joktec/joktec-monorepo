import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class BaseSuggestedSkillInput {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => Number, {
    nullable: true,
  })
  isActive!: number;
}

@InputType()
export class CreateSuggestedSkillInput extends BaseSuggestedSkillInput {}

@InputType()
export class UpdateSuggestedSkillInput extends BaseSuggestedSkillInput {
  @Field()
  id!: string;
}

@InputType()
export class SuggestedSkillPaginationInput extends BasePaginationInput {
  @Field(() => Number, { nullable: true })
  sqlId: number;
}

@InputType()
export class SuggestedSkillConditionInput extends BaseConditionInput {
  @Field(() => Number, { nullable: true })
  parentId: number;
}

@InputType()
export class SuggestedSkillQueryInput extends BaseQueryInput({
  conditionInput: SuggestedSkillConditionInput,
  paginationInput: SuggestedSkillPaginationInput,
})<SuggestedSkillConditionInput, SuggestedSkillPaginationInput> {}

@InputType()
export class SuggestedSkillSearchAutocompleteQueryInput {
  @Field(() => String, {
    nullable: true,
  })
  keyword!: string;
}
