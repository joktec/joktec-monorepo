import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseQuizzMatchLogInput {
  @Field(() => Int, {
    nullable: true,
  })
  score!: number;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => Int, {
    nullable: true,
  })
  finishedPercent!: number;

  @Field(() => String, {
    nullable: true,
  })
  finishedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseeker!: string;

  @Field(() => String, {
    nullable: true,
  })
  quiz!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isTimeOut!: number;

  @Field(() => [String], {
    nullable: true,
  })
  questionOrder!: string[];

  @Field(() => String, {
    nullable: true,
  })
  replayMatch!: string;
}

@InputType()
export class CreateQuizzMatchLogInput extends BaseQuizzMatchLogInput {}

@InputType()
export class UpdateQuizzMatchLogInput extends BaseQuizzMatchLogInput {
  @Field()
  id!: string;
}

@InputType()
export class QuizzMatchLogPaginationInput extends BasePaginationInput {}

@InputType()
export class QuizzMatchLogConditionInput extends BaseConditionInput {}

@InputType()
export class QuizzMatchLogQueryInput extends BaseQueryInput({
  conditionInput: QuizzMatchLogConditionInput,
  paginationInput: QuizzMatchLogPaginationInput,
})<QuizzMatchLogConditionInput, QuizzMatchLogPaginationInput> {}
