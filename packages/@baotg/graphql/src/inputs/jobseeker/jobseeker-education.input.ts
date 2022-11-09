import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerEducationInput {
  @Field(() => String, {
    nullable: true,
  })
  college!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  detail!: string;

  @Field(() => String, {
    nullable: true,
  })
  major!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => Int, {
    nullable: true,
  })
  GPA!: number;

  @Field(() => String, {
    nullable: true,
  })
  cityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  degreeId!: string;

  @Field(() => Date, {
    nullable: true,
  })
  endDate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  startDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => Int, {
    nullable: true,
  })
  stillStudying!: number;

  @Field(() => String, {
    nullable: true,
  })
  gpaExtra!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@InputType()
export class CreateJobSeekerEducationInput extends BaseJobSeekerEducationInput {}

@InputType()
export class UpdateJobSeekerEducationInput extends BaseJobSeekerEducationInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerEducationPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerEducationConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerEducationQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerEducationConditionInput,
  paginationInput: JobSeekerEducationPaginationInput,
})<JobSeekerEducationConditionInput, JobSeekerEducationPaginationInput> {}
