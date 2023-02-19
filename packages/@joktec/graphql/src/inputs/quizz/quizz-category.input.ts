import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseQuizzCategoryInput {
  @Field(() => String, {
    nullable: false,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameVi!: string;
}

@InputType()
export class CreateQuizzCategoryInput extends BaseQuizzCategoryInput {}

@InputType()
export class UpdateQuizzCategoryInput extends BaseQuizzCategoryInput {
  @Field()
  id!: string;
}

@InputType()
export class QuizzCategoryPaginationInput extends BasePaginationInput {}

@InputType()
export class QuizzCategoryConditionInput extends BaseConditionInput {}

@InputType()
export class QuizzCategoryQueryInput extends BaseQueryInput({
  conditionInput: QuizzCategoryConditionInput,
  paginationInput: QuizzCategoryPaginationInput,
})<QuizzCategoryConditionInput, QuizzCategoryPaginationInput> {}
