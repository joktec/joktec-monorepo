import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseQuizzInput {
  @Field(() => String)
  category!: string;

  @Field(() => String, {
    nullable: false,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

  @Field(() => String, {
    nullable: true,
  })
  banner!: string;

  @Field(() => String, {
    nullable: true,
  })
  level!: string;

  @Field(() => String, {
    nullable: true,
  })
  type!: string;

  @Field(() => Int, {
    nullable: true,
  })
  duration!: number;

  @Field(() => String, {
    nullable: true,
  })
  tags!: string;

  @Field(() => String, {
    nullable: true,
  })
  whitelist!: string;

  @Field(() => String, {
    nullable: true,
  })
  mode!: string;

  @Field(() => Int, {
    nullable: true,
  })
  numberOfQuestions!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isFreeToPlay!: number;

  @Field(() => Int, {
    nullable: true,
  })
  hideResults!: number;

  @Field(() => String, {
    nullable: true,
  })
  eventTag!: string;

  @Field(() => String, {
    nullable: true,
  })
  language!: string;
}

@InputType()
export class CreateQuizzInput extends BaseQuizzInput {}

@InputType()
export class UpdateQuizzInput extends BaseQuizzInput {
  @Field()
  id!: string;
}

@InputType()
export class QuizzPaginationInput extends BasePaginationInput {}

@InputType()
export class QuizzConditionInput extends BaseConditionInput {
  @Field(() => [String], {
    nullable: true,
  })
  _id!: string[];

  @Field(() => [String], {
    nullable: true,
  })
  category!: string[];

  @Field(() => [String], {
    nullable: true,
  })
  type!: string[];

  @Field(() => [String], {
    nullable: true,
  })
  level!: string[];

  @Field(() => [String], {
    nullable: true,
  })
  mode!: string[];

  @Field(() => [String], {
    nullable: true,
  })
  organization!: string[];

  @Field(() => Int, {
    nullable: true,
  })
  isFreeToPlay!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isActive!: number;

  @Field(() => [String], {
    nullable: true,
  })
  tags!: string[];
}

@InputType()
export class QuizzQueryInput extends BaseQueryInput({
  conditionInput: QuizzConditionInput,
  paginationInput: QuizzPaginationInput,
})<QuizzConditionInput, QuizzPaginationInput> {}
