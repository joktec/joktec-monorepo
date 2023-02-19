import { BaseListResponse, BaseTypedef } from '../base.typedef';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobIndustry extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  industryId!: string;

  @Field(() => String, {
    nullable: true,
  })
  code: string;

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
  prioritySearch: number;

  @Field(() => Number, {
    nullable: true,
  })
  priority: number;

  @Field(() => Number, {
    nullable: true,
  })
  isTpActive: number;

  @Field(() => Number, {
    nullable: true,
  })
  platform: number;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoActive: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityTop: number;

  @Field(() => Number, {
    nullable: true,
  })
  isFptoTop: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityFooter: number;

  @Field(() => String, {
    nullable: true,
  })
  hlLogo: string;

  @Field(() => String, {
    nullable: true,
  })
  hlLogoColor: string;

  @Field(() => String, {
    nullable: true,
  })
  hlImage: string;

  @Field(() => String, {
    nullable: true,
  })
  hlImageHighlight: string;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlight: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlightFpto: number;

  @Field(() => String, {
    nullable: true,
  })
  urlCode: string;
}

@ObjectType()
export class JobIndustryDetail extends JobIndustry {}

@ObjectType()
export class JobIndustryListResponse extends BaseListResponse({
  viewDto: JobIndustry,
}) {}
