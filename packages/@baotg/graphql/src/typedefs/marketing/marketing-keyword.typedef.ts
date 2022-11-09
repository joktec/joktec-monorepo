import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class MarketingKeyword extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  keywordType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;
}

@ObjectType()
export class MarketingKeywordDetail extends MarketingKeyword {}

@ObjectType()
export class MarketingKeywordListReponse extends BaseListResponse({
  viewDto: MarketingKeyword,
}) {}
