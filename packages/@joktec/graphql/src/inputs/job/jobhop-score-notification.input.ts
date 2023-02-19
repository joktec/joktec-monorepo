import { Field, Int, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobhopScoreNotificationInput {
  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => Int, {
    nullable: true,
  })
  priority2: number;

  @Field(() => Int, {
    nullable: true,
  })
  screenCode: number;

  @Field(() => String, {
    nullable: true,
  })
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  body: string;

  @Field(() => String, {
    nullable: true,
  })
  titleVi: string;

  @Field(() => String, {
    nullable: true,
  })
  bodyVi: string;

  @Field(() => Int, {
    nullable: true,
  })
  active: number;

  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  emailVi: string;
}

@InputType()
export class CreateJobhopScoreNotificationInput extends BaseJobhopScoreNotificationInput {}

@InputType()
export class UpdateJobhopScoreNotificationInput extends BaseJobhopScoreNotificationInput {
  @Field()
  id!: string;
}

@InputType()
export class JobhopScoreNotificationPaginationInput extends BasePaginationInput {}

@InputType()
export class JobhopScoreNotificationConditionInput extends BaseConditionInput {}

@InputType()
export class JobhopScoreNotificationQueryInput extends BaseQueryInput({
  conditionInput: JobhopScoreNotificationConditionInput,
  paginationInput: JobhopScoreNotificationPaginationInput,
})<JobhopScoreNotificationConditionInput, JobhopScoreNotificationPaginationInput> {}
