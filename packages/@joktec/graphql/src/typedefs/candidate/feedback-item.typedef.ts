import { GraphQLJSON } from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '..';

@ObjectType()
export class FeedbackItem extends BaseTypedef {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => GraphQLJSON, { nullable: true })
  locales: object;

  @Field(() => GraphQLJSON, { nullable: true })
  group: object;
}

@ObjectType()
export class FeedbackItemDetail extends FeedbackItem {}

@ObjectType()
export class FeedbackItemListResponse extends BaseListResponse({
  viewDto: FeedbackItem,
}) {}
