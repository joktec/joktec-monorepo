import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class MarketingSeoKeyword extends BaseTypedef {
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
export class MarketingSeoKeywordDetail extends MarketingSeoKeyword {}

@ObjectType()
export class MarketingSeoKeywordListReponse extends BaseListResponse({
  viewDto: MarketingSeoKeyword,
}) {}
