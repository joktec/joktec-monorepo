import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerVerifyAccountFileInput {
  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  file!: string;

  @Field(() => Int, {
    nullable: true,
  })
  fileSize!: number;

  @Field(() => String, {
    nullable: true,
  })
  fileName!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  contentType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  verifyAccountId!: number;

  @Field(() => String, {
    nullable: true,
  })
  fileKey!: string;
}

@InputType()
export class CreateJobSeekerVerifyAccountFileInput extends BaseJobSeekerVerifyAccountFileInput {}

@InputType()
export class UpdateJobSeekerVerifyAccountFileInput extends BaseJobSeekerVerifyAccountFileInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerVerifyAccountFilePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerVerifyAccountFileConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerVerifyAccountFileQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerVerifyAccountFileConditionInput,
  paginationInput: JobSeekerVerifyAccountFilePaginationInput,
})<JobSeekerVerifyAccountFileConditionInput, JobSeekerVerifyAccountFilePaginationInput> {}
