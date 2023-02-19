import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerWorkExperienceInput {
  @Field(() => String, {
    nullable: true,
  })
  company!: string;

  @Field(() => String, {
    nullable: true,
  })
  detail!: string;

  @Field(() => String, {
    nullable: true,
  })
  position!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;

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

  @Field(() => Int, {
    nullable: true,
  })
  stillWorking!: number;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  levelId!: string;

  @Field(() => String, {
    nullable: true,
  })
  yearExp!: string;

  @Field(() => String, {
    nullable: true,
  })
  positionDetail!: string;
}

@InputType()
export class CreateJobSeekerWorkExperienceInput extends BaseJobSeekerWorkExperienceInput {}

@InputType()
export class UpdateJobSeekerWorkExperienceInput extends BaseJobSeekerWorkExperienceInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerWorkExperiencePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerWorkExperienceConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerWorkExperienceQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerWorkExperienceConditionInput,
  paginationInput: JobSeekerWorkExperiencePaginationInput,
})<JobSeekerWorkExperienceConditionInput, JobSeekerWorkExperiencePaginationInput> {}
