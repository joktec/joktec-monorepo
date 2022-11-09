import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class MarketingSeoKeywordTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  keyword!: string;

  @Field(() => String, {
    nullable: true,
  })
  templateName!: string;
}

@ObjectType()
export class MarketingSeoKeywordDetailTypedef extends MarketingSeoKeywordTypedef {}

@ObjectType()
export class MarketingSeoKeywordListResponseTypedef extends BaseListResponse({
  viewDto: MarketingSeoKeywordTypedef,
}) {}
