import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvHistoryInput {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;

  @Field(() => String, {
    nullable: true,
  })
  modifierId!: string;

  @Field(() => String, {
    nullable: true,
  })
  modifierUsername!: string;

  @Field(() => String, {
    nullable: true,
  })
  data!: string;

  @Field(() => String, {
    nullable: true,
  })
  preData!: string;
}

@InputType()
export class CreateCvHistoryInput extends BaseCvHistoryInput {}

@InputType()
export class UpdateCvHistoryInput extends BaseCvHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class CvHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class CvHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class CvHistoryQueryInput extends BaseQueryInput({
  conditionInput: CvHistoryConditionInput,
  paginationInput: CvHistoryPaginationInput,
})<CvHistoryConditionInput, CvHistoryPaginationInput> {}
