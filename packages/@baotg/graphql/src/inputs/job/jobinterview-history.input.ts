import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobInterviewHistoryInput {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated: Date;

  @Field(() => String, {
    nullable: true,
  })
  action: string;

  @Field(() => Int, {
    nullable: true,
  })
  jobinterviewId: number;

  @Field(() => String, {
    nullable: true,
  })
  user: string;

  @Field(() => String, {
    nullable: true,
  })
  organizationName: string;

  @Field(() => String, {
    nullable: true,
  })
  candidateId: string;
}

@InputType()
export class CreateJobInterviewHistoryInput extends BaseJobInterviewHistoryInput {}

@InputType()
export class UpdateJobInterviewHistoryInput extends BaseJobInterviewHistoryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobInterviewHistoryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobInterviewHistoryConditionInput extends BaseConditionInput {}

@InputType()
export class JobInterviewHistoryQueryInput extends BaseQueryInput({
  conditionInput: JobInterviewHistoryConditionInput,
  paginationInput: JobInterviewHistoryPaginationInput,
})<JobInterviewHistoryConditionInput, JobInterviewHistoryPaginationInput> {}
