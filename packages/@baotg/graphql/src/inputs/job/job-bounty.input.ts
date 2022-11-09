import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobBountyInput {
  @Field(() => Number, { nullable: true })
  bounty: number;

  @Field(() => Number, { nullable: true })
  bountyCurrency: number;

  @Field(() => Date, { nullable: true })
  bountyExpiration: Date;

  @Field(() => Number, { nullable: true })
  bountyVariation: number;

  @Field(() => String, { nullable: true })
  companyHighlight: string;

  @Field(() => String, { nullable: true })
  companyHighlightVi: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Number, { nullable: true })
  hotBounty: number;

  @Field(() => Number, { nullable: true })
  isActive: number;

  @Field(() => String, { nullable: true })
  jobId: string;

  @Field(() => Number, { nullable: true })
  percentageBountyVariation: number;

  @Field(() => String, { nullable: true })
  scInCharge: string;

  @Field(() => String, { nullable: true })
  tiInCharge: string;

  @Field(() => String, { nullable: true })
  tpInCharge: string;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

@InputType()
export class CreateJobBountyInput extends BaseJobBountyInput {}

@InputType()
export class UpdateJobBountyInput extends BaseJobBountyInput {
  @Field()
  id!: string;
}

@InputType()
export class JobBountyPaginationInput extends BasePaginationInput {}

@InputType()
export class JobBountyConditionInput extends BaseConditionInput {}

@InputType()
export class JobBountyQueryInput extends BaseQueryInput({
  conditionInput: JobBountyConditionInput,
  paginationInput: JobBountyPaginationInput,
})<JobBountyConditionInput, JobBountyPaginationInput> {}
