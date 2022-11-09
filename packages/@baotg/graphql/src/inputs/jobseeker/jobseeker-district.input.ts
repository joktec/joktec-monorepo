import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerDistrictInput {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  districtId!: string;
}

@InputType()
export class CreateJobSeekerDistrictInput extends BaseJobSeekerDistrictInput {}

@InputType()
export class UpdateJobSeekerDistrictInput extends BaseJobSeekerDistrictInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerDistrictPaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerDistrictConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerDistrictQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerDistrictConditionInput,
  paginationInput: JobSeekerDistrictPaginationInput,
})<JobSeekerDistrictConditionInput, JobSeekerDistrictPaginationInput> {}
