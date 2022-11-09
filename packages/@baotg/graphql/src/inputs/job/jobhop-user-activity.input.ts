import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopUserActivityInput {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated: Date;

  @Field(() => Int, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  extraData: string;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  eventType: string;
}

@InputType()
export class CreateJobhopUserActivityInput extends BaseJobhopUserActivityInput {}

@InputType()
export class UpdateJobhopUserActivityInput extends BaseJobhopUserActivityInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopUserActivityPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopUserActivityConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopUserActivityQueryInput extends BaseQueryInput({
  conditionInput: JobhopUserActivityConditionInput,
  paginationInput: JobhopUserActivityPaginationInput,
})<JobhopUserActivityConditionInput, JobhopUserActivityPaginationInput> {}
