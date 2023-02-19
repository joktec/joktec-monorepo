import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class MarketInsightJobTitle extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  function!: string;

  @Field(() => String, {
    nullable: true,
  })
  isTop!: number;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  trendingFunctionPriority!: number;

  @Field(() => Int, {
    nullable: true,
  })
  isTrendingFunction!: number;

  @Field(() => String, {
    nullable: true,
  })
  trendingFunctionName!: string;

  @Field(() => String, {
    nullable: true,
  })
  trendingFunctionIcon!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitleVi!: string;

  @Field(() => String, {
    nullable: true,
  })
  trendingFunctionNameVi!: string;

  @Field(() => Int, {
    nullable: true,
  })
  averageSalary!: number;
}

@ObjectType()
export class MarketInsightJobTitleDetail extends MarketInsightJobTitle {}

@ObjectType()
export class MarketInsightJobTitleListReponse extends BaseListResponse({
  viewDto: MarketInsightJobTitle,
}) {}
