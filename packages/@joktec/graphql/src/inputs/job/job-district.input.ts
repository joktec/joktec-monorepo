import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobDistrictInput {
  @Field(() => String, {
    nullable: true,
  })
  districtId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  cityId: string;

  @Field(() => Number, {
    nullable: true,
  })
  lon: number;

  @Field(() => Number, {
    nullable: true,
  })
  lat: number;

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
}

@InputType()
export class CreateJobDistrictInput extends BaseJobDistrictInput {}

@InputType()
export class UpdateJobDistrictInput extends BaseJobDistrictInput {
  @Field()
  id!: string;
}

@InputType()
export class JobDistrictPaginationInput extends BasePaginationInput {}

@InputType()
export class JobDistrictConditionInput extends BaseConditionInput {}

@InputType()
export class JobDistrictQueryInput extends BaseQueryInput({
  conditionInput: JobDistrictConditionInput,
  paginationInput: JobDistrictPaginationInput,
})<JobDistrictConditionInput, JobDistrictPaginationInput> {}
