import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobLanguageInput {
  @Field(() => String, {
    nullable: true,
  })
  languageId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => Date, {
    nullable: true,
  })
  lateUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => String, {
    nullable: true,
  })
  lang: string;
}

@InputType()
export class CreateJobLanguageInput extends BaseJobLanguageInput {}

@InputType()
export class UpdateJobLanguageInput extends BaseJobLanguageInput {
  @Field()
  id!: string;
}

@InputType()
export class JobLanguagePaginationInput extends BasePaginationInput {}

@InputType()
export class JobLanguageConditionInput extends BaseConditionInput {}

@InputType()
export class JobLanguageQueryInput extends BaseQueryInput({
  conditionInput: JobLanguageConditionInput,
  paginationInput: JobLanguagePaginationInput,
})<JobLanguageConditionInput, JobLanguagePaginationInput> {}
