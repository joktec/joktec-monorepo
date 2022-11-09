import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobLevelInput {
  @Field(() => String, {
    nullable: true,
  })
  levelId!: string;

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

  @Field(() => Int, {
    nullable: true,
  })
  aiCode: number;
}

@InputType()
export class CreateJobLevelInput extends BaseJobLevelInput {}

@InputType()
export class UpdateJobLevelInput extends BaseJobLevelInput {
  @Field()
  id!: string;
}

@InputType()
export class JobLevelPaginationInput extends BasePaginationInput {}

@InputType()
export class JobLevelConditionInput extends BaseConditionInput {}

@InputType()
export class JobLevelQueryInput extends BaseQueryInput({
  conditionInput: JobLevelConditionInput,
  paginationInput: JobLevelPaginationInput,
})<JobLevelConditionInput, JobLevelPaginationInput> {}
