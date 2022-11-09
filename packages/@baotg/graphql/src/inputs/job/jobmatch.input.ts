import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobMatchInput {
  @Field(() => Int, {
    nullable: true,
  })
  cos: number;

  @Field(() => String, {
    nullable: true,
  })
  cvId: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId: string;

  @Field(() => String, {
    nullable: true,
  })
  referralId: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  applyBy: string;

  @Field(() => String, {
    nullable: true,
  })
  applyType: string;

  @Field(() => Int, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  response: string;
}

@InputType()
export class CreateJobMatchInput extends BaseJobMatchInput {}

@InputType()
export class UpdateJobMatchInput extends BaseJobMatchInput {
  @Field()
  id!: string;
}

@InputType()
export class JobMatchPaginationInput extends BasePaginationInput {}

@InputType()
export class JobMatchConditionInput extends BaseConditionInput {}

@InputType()
export class JobMatchQueryInput extends BaseQueryInput({
  conditionInput: JobMatchConditionInput,
  paginationInput: JobMatchPaginationInput,
})<JobMatchConditionInput, JobMatchPaginationInput> {}
