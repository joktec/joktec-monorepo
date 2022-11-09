import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobSeekerAddressGPlaceInput {
  @Field(() => String, {
    nullable: true,
  })
  country!: string;

  @Field(() => String, {
    nullable: true,
  })
  formattedAddress!: string;

  @Field(() => String, {
    nullable: true,
  })
  placeId!: string;

  @Field(() => String, {
    nullable: true,
  })
  administrativeAreaLevel1!: string;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  countryShortCode!: string;
}

@InputType()
export class CreateJobSeekerAddressGPlaceInput extends BaseJobSeekerAddressGPlaceInput {}

@InputType()
export class UpdateJobSeekerAddressGPlaceInput extends BaseJobSeekerAddressGPlaceInput {
  @Field()
  id!: string;
}

@InputType()
export class JobSeekerAddressGPlacePaginationInput extends BasePaginationInput {}

@InputType()
export class JobSeekerAddressGPlaceConditionInput extends BaseConditionInput {}

@InputType()
export class JobSeekerAddressGPlaceQueryInput extends BaseQueryInput({
  conditionInput: JobSeekerAddressGPlaceConditionInput,
  paginationInput: JobSeekerAddressGPlacePaginationInput,
})<JobSeekerAddressGPlaceConditionInput, JobSeekerAddressGPlacePaginationInput> {}
