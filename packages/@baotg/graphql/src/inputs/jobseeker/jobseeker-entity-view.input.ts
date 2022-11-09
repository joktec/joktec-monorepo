import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerEntityViewInput {
  @Field(() => String, {
    nullable: true,
  })
  keyword!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  image!: string;

  @Field(() => Int, {
    nullable: true,
  })
  confidential!: number;

  @Field(() => String, {
    nullable: true,
  })
  entityType!: string;

  @Field(() => String, {
    nullable: true,
  })
  entityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  publicId!: string;

  @Field(() => String, {
    nullable: true,
  })
  subTitle!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  customUrlCompany!: string;
}

@InputType()
export class CreateJobSeekerEntityViewInput extends BaseJobSeekerEntityViewInput {}

@InputType()
export class UpdateJobSeekerEntityViewInput extends BaseJobSeekerEntityViewInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerEntityViewPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerEntityViewConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerEntityViewQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerEntityViewConditionInput,
  paginationInput: JobSeekerEntityViewPaginationInput,
})<JobSeekerEntityViewConditionInput, JobSeekerEntityViewPaginationInput> {}
