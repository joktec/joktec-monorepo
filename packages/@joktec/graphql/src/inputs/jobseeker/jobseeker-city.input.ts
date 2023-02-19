import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerCityInput {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  cityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createDate!: Date;
}

@InputType()
export class CreateJobSeekerCityInput extends BaseJobSeekerCityInput {}

@InputType()
export class UpdateJobSeekerCityInput extends BaseJobSeekerCityInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerCityPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerCityConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerCityQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerCityConditionInput,
  paginationInput: JobSeekerCityPaginationInput,
})<JobSeekerCityConditionInput, JobSeekerCityPaginationInput> {}
