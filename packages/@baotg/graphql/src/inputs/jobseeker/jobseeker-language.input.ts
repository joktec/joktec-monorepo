import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerLanguageInput {
  @Field(() => String, {
    nullable: true,
  })
  language!: string;

  @Field(() => String, {
    nullable: true,
  })
  level!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

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

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@InputType()
export class CreateJobSeekerLanguageInput extends BaseJobSeekerLanguageInput {}

@InputType()
export class UpdateJobSeekerLanguageInput extends BaseJobSeekerLanguageInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerLanguagePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerLanguageConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerLanguageQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerLanguageConditionInput,
  paginationInput: JobSeekerLanguagePaginationInput,
})<JobSeekerLanguageConditionInput, JobSeekerLanguagePaginationInput> {}
