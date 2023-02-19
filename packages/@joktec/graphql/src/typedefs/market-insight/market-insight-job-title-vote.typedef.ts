import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class MarketInsightJobTitleVote extends BaseTypedef {
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
  identityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  feedback!: string;

  @Field(() => Int, {
    nullable: true,
  })
  vote!: number;
}

@ObjectType()
export class MarketInsightJobTitleVoteDetail extends MarketInsightJobTitleVote {}

@ObjectType()
export class MarketInsightJobTitleVoteListReponse extends BaseListResponse({
  viewDto: MarketInsightJobTitleVote,
}) {}
