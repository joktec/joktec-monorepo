import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopScoreNotificationMissingFieldInput {
  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => Int, {
    nullable: true,
  })
  groupId: number;
}

@InputType()
export class CreateJobhopScoreNotificationMissingFieldInput extends BaseJobhopScoreNotificationMissingFieldInput {}

@InputType()
export class UpdateJobhopScoreNotificationMissingFieldInput extends BaseJobhopScoreNotificationMissingFieldInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopScoreNotificationMissingFieldPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopScoreNotificationMissingFieldConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopScoreNotificationMissingFieldQueryInput extends BaseQueryInput({
  conditionInput: JobhopScoreNotificationMissingFieldConditionInput,
  paginationInput: JobhopScoreNotificationMissingFieldPaginationInput,
})<JobhopScoreNotificationMissingFieldConditionInput, JobhopScoreNotificationMissingFieldPaginationInput> {}
