import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class FptoCity extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  cityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  id!: string;

  @Field(() => String, {
    nullable: true,
  })
  value!: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, {
    nullable: true,
  })
  slug!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  countryId: string;

  @Field(() => String, {
    nullable: true,
  })
  lateUpdate: Date;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;

  @Field(() => Number, {
    nullable: true,
  })
  enabled: number;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight: string;

  @Field(() => Number, {
    nullable: true,
  })
  prioritySearch: number;
}

@ObjectType()
export class FptoCityDetail extends FptoCity {}

@ObjectType()
export class FptoCityListResponse extends BaseListResponse({
  viewDto: FptoCity,
}) {}
