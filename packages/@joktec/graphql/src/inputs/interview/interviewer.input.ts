import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseInterviewerInput {
  @Field(() => String, {
    nullable: true,
  })
  interviewerId: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  fullName: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy: string;

  @Field(() => String, {
    nullable: true,
  })
  username: string;
}

@InputType()
export class CreateInterviewerInput extends BaseInterviewerInput {}

@InputType()
export class UpdateInterviewerInput extends BaseInterviewerInput {
  @Field()
  id!: string;
}

@InputType()
export class InterviewerPaginationInput extends BasePaginationInput {}

@InputType()
export class InterviewerConditionInput extends BaseConditionInput {}

@InputType()
export class InterviewerQueryInput extends BaseQueryInput({
  conditionInput: InterviewerConditionInput,
  paginationInput: InterviewerPaginationInput,
})<InterviewerConditionInput, InterviewerPaginationInput> {}
