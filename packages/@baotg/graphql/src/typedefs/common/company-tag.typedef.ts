import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class CompanyTag {
  @Field(() => Number, {
    nullable: true,
  })
  id: number;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEn: string;

  @Field(() => String, {
    nullable: true,
  })
  value: string;
}

@ObjectType()
export class CompanyTagDetail extends CompanyTag {}

@ObjectType()
export class CompanyTagListResponse extends BaseListResponse({
  viewDto: CompanyTag,
}) {}
