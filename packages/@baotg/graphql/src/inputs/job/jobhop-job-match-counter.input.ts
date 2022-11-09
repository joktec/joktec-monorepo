import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopJobMatchCounterInput {
  @Field(() => Number, { nullable: true })
  recuiterCount: number;

  @Field(() => Number, { nullable: true })
  candidateCount: number;

  @Field(() => Date, { nullable: true })
  created: Date;

  @Field(() => Date, { nullable: true })
  update: Date;
}

@InputType()
export class CreateJobhopJobMatchCounterInput extends BaseJobhopJobMatchCounterInput {}

@InputType()
export class UpdateJobhopJobMatchCounterInput extends BaseJobhopJobMatchCounterInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopJobMatchCounterPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopJobMatchCounterConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopJobMatchCounterQueryInput extends BaseQueryInput({
  conditionInput: JobhopJobMatchCounterConditionInput,
  paginationInput: JobhopJobMatchCounterPaginationInput,
})<JobhopJobMatchCounterConditionInput, JobhopJobMatchCounterPaginationInput> {}
