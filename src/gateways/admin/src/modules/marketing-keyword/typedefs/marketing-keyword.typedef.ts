import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class MarketingKeywordTypedef extends BaseTypedef {
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

  @Field(() => Number, {
    nullable: true,
  })
  priority!: number;
}

@ObjectType()
export class MarketingKeywordDetailTypedef extends MarketingKeywordTypedef {}

@ObjectType()
export class MarketingKeywordListResponseTypedef extends BaseListResponse({
  viewDto: MarketingKeywordTypedef,
}) {}
