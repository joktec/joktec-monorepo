import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class CvAnalysicFlow extends BaseTypedef {
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

  @Field(() => String, {
    nullable: true,
  })
  aiTriggerAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  aiCallbackAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  aiCallbackData!: string;

  @Field(() => String, {
    nullable: true,
  })
  timeoutAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;
}

@ObjectType()
export class CvAnalysicFlowDetail extends CvAnalysicFlow {}

@ObjectType()
export class CvAnalysicFlowListReponse extends BaseListResponse({
  viewDto: CvAnalysicFlow,
}) {}
