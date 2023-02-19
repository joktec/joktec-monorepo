import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse } from '../base.typedef';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class FaqContentType {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;
}

@ObjectType()
export class FaqContentTypeDetail extends FaqContentType {}

@ObjectType()
export class FaqContentTypeListResponse extends BaseListResponse({
  viewDto: FaqContentType,
}) {}
