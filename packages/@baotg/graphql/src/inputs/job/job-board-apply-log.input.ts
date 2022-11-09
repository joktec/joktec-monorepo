import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBoardApplyLogInput {
  @Field(() => Date, { nullable: true })
  applyTime: Date;

  @Field(() => String, { nullable: true })
  cvId: string;

  @Field(() => String, { nullable: true })
  cvLink: string;

  @Field(() => String, { nullable: true })
  jobBoard: string;

  @Field(() => String, { nullable: true })
  jobBoardLink: string;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  jobseekerId: string;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String, { nullable: true })
  screenshotFile: string;

  @Field(() => String, { nullable: true })
  status: string;
}

@InputType()
export class CreateJobBoardApplyLogInput extends BaseJobBoardApplyLogInput {}

@InputType()
export class UpdateJobBoardApplyLogInput extends BaseJobBoardApplyLogInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBoardApplyLogPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBoardApplyLogConditionInput extends BaseConditionInput {}

@InputType()
export class JobBoardApplyLogQueryInput extends BaseQueryInput({
  conditionInput: JobBoardApplyLogConditionInput,
  paginationInput: JobBoardApplyLogPaginationInput,
})<JobBoardApplyLogConditionInput, JobBoardApplyLogPaginationInput> {}
