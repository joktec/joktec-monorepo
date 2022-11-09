import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopUserJobSentreccInput {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobId: string;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;
}

@InputType()
export class CreateJobhopUserJobSentreccInput extends BaseJobhopUserJobSentreccInput {}

@InputType()
export class UpdateJobhopUserJobSentreccInput extends BaseJobhopUserJobSentreccInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopUserJobSentreccPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopUserJobSentreccConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopUserJobSentreccQueryInput extends BaseQueryInput({
  conditionInput: JobhopUserJobSentreccConditionInput,
  paginationInput: JobhopUserJobSentreccPaginationInput,
})<JobhopUserJobSentreccConditionInput, JobhopUserJobSentreccPaginationInput> {}
