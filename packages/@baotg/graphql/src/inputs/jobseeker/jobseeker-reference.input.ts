import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerReferenceInput {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => String, {
    nullable: true,
  })
  companyName!: string;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;

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
  lastUpdate!: Date;
}

@InputType()
export class CreateJobSeekerReferenceInput extends BaseJobSeekerReferenceInput {}

@InputType()
export class UpdateJobSeekerReferenceInput extends BaseJobSeekerReferenceInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerReferencePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerReferenceConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerReferenceQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerReferenceConditionInput,
  paginationInput: JobSeekerReferencePaginationInput,
})<JobSeekerReferenceConditionInput, JobSeekerReferencePaginationInput> {}
