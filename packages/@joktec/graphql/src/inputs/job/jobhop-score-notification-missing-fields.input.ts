import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopScoreNotificationMissingFieldsInput {
  @Field(() => Int, {
    nullable: true,
  })
  scorenotificationId: number;

  @Field(() => Int, {
    nullable: true,
  })
  scorenotificationmissingfieldId: number;
}

@InputType()
export class CreateJobhopScoreNotificationMissingFieldsInput extends BaseJobhopScoreNotificationMissingFieldsInput {}

@InputType()
export class UpdateJobhopScoreNotificationMissingFieldsInput extends BaseJobhopScoreNotificationMissingFieldsInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopScoreNotificationMissingFieldsPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopScoreNotificationMissingFieldsConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopScoreNotificationMissingFieldsQueryInput extends BaseQueryInput({
  conditionInput: JobhopScoreNotificationMissingFieldsConditionInput,
  paginationInput: JobhopScoreNotificationMissingFieldsPaginationInput,
})<JobhopScoreNotificationMissingFieldsConditionInput, JobhopScoreNotificationMissingFieldsPaginationInput> {}
