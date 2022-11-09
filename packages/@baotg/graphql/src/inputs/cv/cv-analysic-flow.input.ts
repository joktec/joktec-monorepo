import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseCvAnalysicFlowInput {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  averageSalary!: number;

  @Field(() => String, {
    nullable: true,
  })
  averageSalaryCurrency!: string;

  @Field(() => Int, {
    nullable: true,
  })
  totalMatchJobs!: number;

  @Field(() => Int, {
    nullable: true,
  })
  totalMatchOrgs!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobsData!: string;

  @Field(() => String, {
    nullable: true,
  })
  orgsData!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isSuccess!: number;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  flow!: string;

  @Field(() => Date, {
    nullable: true,
  })
  aiTriggerAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  aiCallbackAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  aiCallbackData!: string;

  @Field(() => Date, {
    nullable: true,
  })
  timeoutAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date;
}

@InputType()
export class CreateCvAnalysicFlowInput extends BaseCvAnalysicFlowInput {}

@InputType()
export class UpdateCvAnalysicFlowInput extends BaseCvAnalysicFlowInput {
  @Field()
  id!: string;
}

@InputType()
export class CvAnalysicFlowPaginationInput extends BasePaginationInput {}

@InputType()
export class CvAnalysicFlowConditionInput extends BaseConditionInput {}

@InputType()
export class CvAnalysicFlowQueryInput extends BaseQueryInput({
  conditionInput: CvAnalysicFlowConditionInput,
  paginationInput: CvAnalysicFlowPaginationInput,
})<CvAnalysicFlowConditionInput, CvAnalysicFlowPaginationInput> {}
