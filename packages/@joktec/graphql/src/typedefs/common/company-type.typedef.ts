import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class CompanyType extends BaseTypedef {
  @Field(() => Number, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => String, {
    nullable: true,
  })
  value: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName: object;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;
}

@ObjectType()
export class CompanyTypeDetail extends CompanyType {}

@ObjectType()
export class CompanyTypeListResponse extends BaseListResponse({
  viewDto: CompanyType,
}) {}
