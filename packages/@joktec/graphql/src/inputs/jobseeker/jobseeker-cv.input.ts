import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerCvInput {
  @Field(() => String, {
    nullable: true,
  })
  avatar!: string;

  @Field(() => Int, {
    nullable: true,
  })
  deleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  fullname!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  phone!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  source!: string;

  @Field(() => String, {
    nullable: true,
  })
  tags!: string;

  @Field(() => String, {
    nullable: true,
  })
  JobSeekerCvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => Date, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  nameFile!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@InputType()
export class CreateJobSeekerCvInput extends BaseJobSeekerCvInput {}

@InputType()
export class UpdateJobSeekerCvInput extends BaseJobSeekerCvInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerCvPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerCvConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerCvQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerCvConditionInput,
  paginationInput: JobSeekerCvPaginationInput,
})<JobSeekerCvConditionInput, JobSeekerCvPaginationInput> {}
