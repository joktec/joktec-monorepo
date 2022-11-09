import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobCityInput {
  @Field(() => String, {
    nullable: true,
  })
  cityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  countryId: string;

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
  enabled: number;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight: string;

  @Field(() => Number, {
    nullable: true,
  })
  prioritySearch: number;
}

@InputType()
export class CreateJobCityInput extends BaseJobCityInput {}

@InputType()
export class UpdateJobCityInput extends BaseJobCityInput {
  @Field()
  id!: string;
}

@InputType()
export class JobCityPaginationInput extends BasePaginationInput {}

@InputType()
export class JobCityConditionInput extends BaseConditionInput {}

@InputType()
export class JobCityQueryInput extends BaseQueryInput({
  conditionInput: JobCityConditionInput,
  paginationInput: JobCityPaginationInput,
})<JobCityConditionInput, JobCityPaginationInput> {}
