import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobCountryInput {
  @Field(() => String, {
    nullable: true,
  })
  countryId!: string;

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
}

@InputType()
export class CreateJobCountryInput extends BaseJobCountryInput {}

@InputType()
export class UpdateJobCountryInput extends BaseJobCountryInput {
  @Field()
  id!: string;
}

@InputType()
export class JobCountryPaginationInput extends BasePaginationInput {}

@InputType()
export class JobCountryConditionInput extends BaseConditionInput {}

@InputType()
export class JobCountryQueryInput extends BaseQueryInput({
  conditionInput: JobCountryConditionInput,
  paginationInput: JobCountryPaginationInput,
})<JobCountryConditionInput, JobCountryPaginationInput> {}
