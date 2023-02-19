import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobStatsDetailInput {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  platform: number;

  @Field(() => String, { nullable: true })
  createDate: Date;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => String, { nullable: true })
  organizationId: string;
}

@InputType()
export class CreateJobStatsDetailInput extends BaseJobStatsDetailInput {}

@InputType()
export class UpdateJobStatsDetailInput extends BaseJobStatsDetailInput {
  @Field()
  id!: string;
}

@InputType()
export class JobStatsDetailPaginationInput extends BasePaginationInput {}

@InputType()
export class JobStatsDetailConditionInput extends BaseConditionInput {}

@InputType()
export class JobStatsDetailQueryInput extends BaseQueryInput({
  conditionInput: JobStatsDetailConditionInput,
  paginationInput: JobStatsDetailPaginationInput,
})<JobStatsDetailConditionInput, JobStatsDetailPaginationInput> {}
