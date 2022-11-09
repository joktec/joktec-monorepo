import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Benefit extends BaseTypedef {
  @Field(() => Number, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, { nullable: true })
  code: string;

  @Field(() => String, { nullable: true })
  createBy: string;

  @Field(() => String, { nullable: true })
  createDate: Date;

  @Field(() => String, { nullable: true })
  lastUpdate: Date;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  engName: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, { nullable: true })
  updateBy: Date;

  @Field(() => Number, { nullable: true })
  priority: number;

  @Field(() => Number, { nullable: true })
  enabled: number;

  @Field(() => String, { nullable: true })
  image: string;

  @Field(() => String, { nullable: true })
  value: string;
}

@ObjectType()
export class BenefitDetail extends Benefit {}

@ObjectType()
export class BenefitListResponse extends BaseListResponse({
  viewDto: Benefit,
}) {}
