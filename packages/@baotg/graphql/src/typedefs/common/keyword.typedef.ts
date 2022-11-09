import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class Keyword extends BaseTypedef {
  @Field(() => String, { nullable: true })
  code: string;

  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => Number, { nullable: true })
  score: number;

  @Field(() => String, { nullable: true })
  industryId: string;

  @Field(() => String, { nullable: true })
  publicId: string;

  @Field(() => String, { nullable: true })
  type: string;

  @Field(() => Number, { nullable: true })
  isActive: number;

  @Field(() => String, { nullable: true })
  contentEng: string;

  @Field(() => String, { nullable: true })
  customUrl: string;

  @Field(() => String, { nullable: true })
  sqlId: string;
}

@ObjectType()
export class KeywordDetail extends Keyword {}

@ObjectType()
export class KeywordListResponse extends BaseListResponse({
  viewDto: Keyword,
}) {}
