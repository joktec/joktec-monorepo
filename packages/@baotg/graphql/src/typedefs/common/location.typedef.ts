import { GraphQLJSON } from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class Location extends BaseTypedef {
  @Field(() => Number, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  level: string;

  @Field(() => String, {
    nullable: true,
  })
  value: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  type: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, {
    nullable: true,
  })
  nameEn: string;

  @Field(() => String, {
    nullable: true,
  })
  shortName: string;

  @Field(() => String, {
    nullable: true,
  })
  shortNameEn: string;

  @Field(() => String, {
    nullable: true,
  })
  slug: string;

  @Field(() => String, {
    nullable: true,
  })
  image: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight: string;

  @Field(() => String, {
    nullable: true,
  })
  priority: string;

  @Field(() => String, {
    nullable: true,
  })
  locationTypeId: string;

  @Field(() => Number, {
    nullable: true,
  })
  parentId: number;

  @Field(() => String, {
    nullable: true,
  })
  imageKyc: string;

  @Field(() => Number, {
    nullable: true,
  })
  default_district: number;

  @Field(() => String, {
    nullable: true,
  })
  askLocationSelectionImage: string;

  @Field(() => Number, {
    nullable: true,
  })
  isActiveAskLocation: number;
}

@ObjectType()
export class LocationDetail extends Location {}

@ObjectType()
export class LocationListResponse extends BaseListResponse({
  viewDto: Location,
}) {}
