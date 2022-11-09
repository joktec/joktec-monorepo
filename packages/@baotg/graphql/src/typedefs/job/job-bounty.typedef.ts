import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobBounty extends BaseTypedef {
  @Field(() => Number, { nullable: true })
  bounty: number;

  @Field(() => Number, { nullable: true })
  bountyCurrency: number;

  @Field(() => String, { nullable: true })
  bountyExpiration: Date;

  @Field(() => Number, { nullable: true })
  bountyVariation: number;

  @Field(() => String, { nullable: true })
  companyHighlight: string;

  @Field(() => String, { nullable: true })
  companyHighlightVi: string;

  @Field(() => String, { nullable: true })
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

  @Field(() => String, { nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class JobBountyDetail extends JobBounty {}

@ObjectType()
export class JobBountyListResponse extends BaseListResponse({
  viewDto: JobBounty,
}) {}
