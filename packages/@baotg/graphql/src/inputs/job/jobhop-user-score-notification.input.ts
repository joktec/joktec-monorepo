import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopUserScoreNotificationInput {
  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => Int, {
    nullable: true,
  })
  sent: number;

  @Field(() => Int, {
    nullable: true,
  })
  stopped: number;

  @Field(() => String, {
    nullable: true,
  })
  createdAt: Date;

  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => Int, {
    nullable: true,
  })
  scoreNotificationId: number;
}

@InputType()
export class CreateJobhopUserScoreNotificationInput extends BaseJobhopUserScoreNotificationInput {}

@InputType()
export class UpdateJobhopUserScoreNotificationInput extends BaseJobhopUserScoreNotificationInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopUserScoreNotificationPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopUserScoreNotificationConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopUserScoreNotificationQueryInput extends BaseQueryInput({
  conditionInput: JobhopUserScoreNotificationConditionInput,
  paginationInput: JobhopUserScoreNotificationPaginationInput,
})<JobhopUserScoreNotificationConditionInput, JobhopUserScoreNotificationPaginationInput> {}
