import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '../base.typedef';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class JobBadge {
  @Field(() => String, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => String, {
    nullable: true,
  })
  value: string;
}

@ObjectType()
export class JobBadgeDetail extends JobBadge {}

@ObjectType()
export class JobBadgeListResponse extends BaseListResponse({
  viewDto: JobBadge,
}) {}
