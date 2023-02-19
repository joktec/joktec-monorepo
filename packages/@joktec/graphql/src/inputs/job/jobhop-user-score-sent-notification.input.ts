import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopUserScoreSentNotificationInput {
  @Field(() => String, {
    nullable: true,
  })
  userId: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt: Date;

  @Field(() => Int, {
    nullable: true,
  })
  scoreNotificationId: number;

  @Field(() => Int, {
    nullable: true,
  })
  clicked: number;
}

@InputType()
export class CreateJobhopUserScoreSentNotificationInput extends BaseJobhopUserScoreSentNotificationInput {}

@InputType()
export class UpdateJobhopUserScoreSentNotificationInput extends BaseJobhopUserScoreSentNotificationInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopUserScoreSentNotificationPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopUserScoreSentNotificationConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopUserScoreSentNotificationQueryInput extends BaseQueryInput({
  conditionInput: JobhopUserScoreSentNotificationConditionInput,
  paginationInput: JobhopUserScoreSentNotificationPaginationInput,
})<JobhopUserScoreSentNotificationConditionInput, JobhopUserScoreSentNotificationPaginationInput> {}
