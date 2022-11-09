import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopUserManualInput {
  @Field(() => String, {
    nullable: true,
  })
  manualEn: string;

  @Field(() => String, {
    nullable: true,
  })
  manualVi: string;

  @Field(() => String, {
    nullable: true,
  })
  url: string;
}

@InputType()
export class CreateJobhopUserManualInput extends BaseJobhopUserManualInput {}

@InputType()
export class UpdateJobhopUserManualInput extends BaseJobhopUserManualInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopUserManualPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopUserManualConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopUserManualQueryInput extends BaseQueryInput({
  conditionInput: JobhopUserManualConditionInput,
  paginationInput: JobhopUserManualPaginationInput,
})<JobhopUserManualConditionInput, JobhopUserManualPaginationInput> {}
