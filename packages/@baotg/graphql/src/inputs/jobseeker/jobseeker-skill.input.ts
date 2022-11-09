import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerSkillInput {
  @Field(() => String, {
    nullable: true,
  })
  level!: string;

  @Field(() => String, {
    nullable: true,
  })
  skill!: string;

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
export class CreateJobSeekerSkillInput extends BaseJobSeekerSkillInput {}

@InputType()
export class UpdateJobSeekerSkillInput extends BaseJobSeekerSkillInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerSkillPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerSkillConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerSkillQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerSkillConditionInput,
  paginationInput: JobSeekerSkillPaginationInput,
})<JobSeekerSkillConditionInput, JobSeekerSkillPaginationInput> {}
