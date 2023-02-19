import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Organization } from '../organization';

@ObjectType()
export class JobAiLysis extends BaseTypedef {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => Number, { nullable: true })
  credits: number;

  @Field(() => String, { nullable: true })
  expiryDate: Date;

  @Field(() => Number, { nullable: true })
  isVerified: number;

  @Field(() => String, { nullable: true })
  organizationId: string;

  @Field(() => Number, { nullable: true })
  remainingCredits: number;

  @Field(() => String, { nullable: true })
  sapCompanyId: string;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  updatedBy: string;
}

@ObjectType()
export class JobAiLysisDetail extends JobAiLysis {
  @Field(() => Organization, {
    nullable: true,
  })
  organization: Organization;
}

@ObjectType()
export class JobAiLysisListResponse extends BaseListResponse({
  viewDto: JobAiLysis,
}) {}
