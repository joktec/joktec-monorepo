import { GraphQLJSON } from 'graphql-type-json';
import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Field, ObjectType } from '@nestjs/graphql';
import { Country } from '..';

@ObjectType()
export class Industry extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  code!: string;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  urlCode!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => String, {
    nullable: true,
  })
  logo!: string;

  @Field(() => String, {
    nullable: true,
  })
  logoColor!: string;

  @Field(() => String, {
    nullable: true,
  })
  image!: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight!: string;

  @Field(() => String, {
    nullable: true,
  })
  hlLogo!: string;

  @Field(() => String, {
    nullable: true,
  })
  hlLogoColor!: string;

  @Field(() => String, {
    nullable: true,
  })
  hlImage!: string;

  @Field(() => String, {
    nullable: true,
  })
  hlImageHighlight!: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority!: number;

  @Field(() => Number, {
    nullable: true,
  })
  platform!: number;

  @Field(() => Number, {
    nullable: true,
  })
  isTpActive!: number;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoActive!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityTop!: number;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoTop!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityFooter!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlight!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlightFpto!: number;
}

@ObjectType()
export class IndustryDetail extends Industry {
  @Field(() => Country, {
    nullable: true,
  })
  country: Country;
}

@ObjectType()
export class FptoTopIndustry {
  @Field(() => String, {
    nullable: true,
  })
  id: string;

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
  code: string;

  @Field(() => String, {
    nullable: true,
  })
  urlCode: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName: object;

  @Field(() => String, {
    nullable: true,
  })
  logo: string;

  @Field(() => String, {
    nullable: true,
  })
  logoColor: string;

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
  priority: number;

  @Field(() => String, {
    nullable: true,
  })
  industryCode: string;

  @Field(() => Number, {
    nullable: true,
  })
  isActive: number;
}

@ObjectType()
export class IndustryListResponse extends BaseListResponse({
  viewDto: Industry,
}) {}
