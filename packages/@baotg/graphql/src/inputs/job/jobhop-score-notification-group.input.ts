import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopScoreNotificationGroupInput {
  @Field(() => String, {
    nullable: true,
  })
  name: string;
}

@InputType()
export class CreateJobhopScoreNotificationGroupInput extends BaseJobhopScoreNotificationGroupInput {}

@InputType()
export class UpdateJobhopScoreNotificationGroupInput extends BaseJobhopScoreNotificationGroupInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopScoreNotificationGroupPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopScoreNotificationGroupConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopScoreNotificationGroupQueryInput extends BaseQueryInput({
  conditionInput: JobhopScoreNotificationGroupConditionInput,
  paginationInput: JobhopScoreNotificationGroupPaginationInput,
})<JobhopScoreNotificationGroupConditionInput, JobhopScoreNotificationGroupPaginationInput> {}
