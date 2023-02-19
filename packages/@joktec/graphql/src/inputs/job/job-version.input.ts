import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobVersionInput {
  @Field(() => String, {
    nullable: true,
  })
  jobVersionId!: string;

  @Field(() => String, {
    nullable: true,
  })
  benefit: string;

  @Field(() => String, {
    nullable: true,
  })
  benefitOther: string;

  @Field(() => String, {
    nullable: true,
  })
  cityId: string;

  @Field(() => Number, {
    nullable: true,
  })
  deleted: number;

  @Field(() => String, {
    nullable: true,
  })
  description: string;

  @Field(() => String, {
    nullable: true,
  })
  descriptionText: string;

  @Field(() => String, {
    nullable: true,
  })
  districtId: string;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  industryId: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTypeId: string;

  @Field(() => String, {
    nullable: true,
  })
  jobWorkingTime: string;

  @Field(() => String, {
    nullable: true,
  })
  languageId: string;

  @Field(() => String, {
    nullable: true,
  })
  level: string;

  @Field(() => String, {
    nullable: true,
  })
  location: string;

  @Field(() => String, {
    nullable: true,
  })
  position: string;

  @Field(() => Number, {
    nullable: true,
  })
  quantity: number;

  @Field(() => Date, {
    nullable: true,
  })
  requestDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  requirement: string;

  @Field(() => String, {
    nullable: true,
  })
  salaryCurrency: string;

  @Field(() => Number, {
    nullable: true,
  })
  salaryMax: number;

  @Field(() => Number, {
    nullable: true,
  })
  salaryMin: number;

  @Field(() => Number, {
    nullable: true,
  })
  salaryOption: number;

  @Field(() => String, {
    nullable: true,
  })
  status: string;

  @Field(() => String, {
    nullable: true,
  })
  tags: string;

  @Field(() => Number, {
    nullable: true,
  })
  version_number: number;
}

@InputType()
export class CreateJobVersionInput extends BaseJobVersionInput {}

@InputType()
export class UpdateJobVersionInput extends BaseJobVersionInput {
  @Field()
  id!: string;
}

@InputType()
export class JobVersionPaginationInput extends BasePaginationInput {}

@InputType()
export class JobVersionConditionInput extends BaseConditionInput {}

@InputType()
export class JobVersionQueryInput extends BaseQueryInput({
  conditionInput: JobVersionConditionInput,
  paginationInput: JobVersionPaginationInput,
})<JobVersionConditionInput, JobVersionPaginationInput> {}
