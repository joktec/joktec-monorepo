import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseQuizzScoreLogInput {
  @Field(() => Int, {
    nullable: true,
  })
  score!: number;

  @Field(() => String, {
    nullable: true,
  })
  scoreType!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseeker!: string;

  @Field(() => String, {
    nullable: true,
  })
  quizMatch!: string;
}

@InputType()
export class CreateQuizzScoreLogInput extends BaseQuizzScoreLogInput {}

@InputType()
export class UpdateQuizzScoreLogInput extends BaseQuizzScoreLogInput {
  @Field()
  id!: string;
}

@InputType()
export class QuizzScoreLogPaginationInput extends BasePaginationInput {}

@InputType()
export class QuizzScoreLogConditionInput extends BaseConditionInput {
  @Field(() => String, {
    nullable: true,
  })
  quiz!: string;

  @Field(() => String, {
    nullable: true,
  })
  type!: string;

  @Field(() => String, {
    nullable: true,
  })
  scoreType!: string;

  @Field(() => String, {
    nullable: true,
  })
  range!: string;
}

@InputType()
export class QuizzScoreLogQueryInput extends BaseQueryInput({
  conditionInput: QuizzScoreLogConditionInput,
  paginationInput: QuizzScoreLogPaginationInput,
})<QuizzScoreLogConditionInput, QuizzScoreLogPaginationInput> {}
