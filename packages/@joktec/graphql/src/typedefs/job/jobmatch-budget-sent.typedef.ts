import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseTypedef } from '..';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobMatchBudgetSent extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated: Date;

  @Field(() => Int, {
    nullable: true,
  })
  sent: number;

  @Field(() => String, {
    nullable: true,
  })
  organizationId: string;

  @Field(() => Int, {
    nullable: true,
  })
  staffSent: number;
}

@ObjectType()
export class JobMatchBudgetSentDetail extends JobMatchBudgetSent {}

@ObjectType()
export class JobMatchBudgetSentListResponse extends BaseListResponse({
  viewDto: JobMatchBudgetSent,
}) {}
