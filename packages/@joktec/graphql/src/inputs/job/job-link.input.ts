import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobLinkInput {
  @Field(() => String, { nullable: true })
  createBy: string;

  @Field(() => Date, { nullable: true })
  createDate: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Date, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  link: string;

  @Field(() => String, { nullable: true })
  updateBy: string;
}

@InputType()
export class CreateJobLinkInput extends BaseJobLinkInput {}

@InputType()
export class UpdateJobLinkInput extends BaseJobLinkInput {
  @Field()
  id!: string;
}

@InputType()
export class JobLinkPaginationInput extends BasePaginationInput {}

@InputType()
export class JobLinkConditionInput extends BaseConditionInput {}

@InputType()
export class JobLinkQueryInput extends BaseQueryInput({
  conditionInput: JobLinkConditionInput,
  paginationInput: JobLinkPaginationInput,
})<JobLinkConditionInput, JobLinkPaginationInput> {}
