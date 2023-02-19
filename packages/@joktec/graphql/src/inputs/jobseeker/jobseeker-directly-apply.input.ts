import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerDirectlyApplyInput {
  @Field(() => Date, {
    nullable: true,
  })
  applyDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  hopScore!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobVersionId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jsId!: string;

  @Field(() => String, {
    nullable: true,
  })
  applyBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  applyType!: string;
}

@InputType()
export class CreateJobSeekerDirectlyApplyInput extends BaseJobSeekerDirectlyApplyInput {}

@InputType()
export class UpdateJobSeekerDirectlyApplyInput extends BaseJobSeekerDirectlyApplyInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerDirectlyApplyPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerDirectlyApplyConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerDirectlyApplyQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerDirectlyApplyConditionInput,
  paginationInput: JobSeekerDirectlyApplyPaginationInput,
})<JobSeekerDirectlyApplyConditionInput, JobSeekerDirectlyApplyPaginationInput> {}
