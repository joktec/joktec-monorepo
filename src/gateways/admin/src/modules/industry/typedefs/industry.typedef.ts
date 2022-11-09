import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '@jobhopin/graphql';

@ObjectType()
export class IndustryTypedef extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  code!: string;

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
  image!: string;

  @Field(() => Number, {
    nullable: true,
  })
  priority!: number;

  @Field(() => Number, {
    nullable: true,
  })
  platform!: number;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight!: string;

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
  priorityHighlight!: number;

  @Field(() => Number, {
    nullable: true,
  })
  priorityHighlightFpto!: number;

  @Field(() => String, {
    nullable: true,
  })
  urlCode!: string;
}

@ObjectType()
export class IndustryDetailTypedef extends IndustryTypedef {}

@ObjectType()
export class IndustryListResponseTypedef extends BaseListResponse({
  viewDto: IndustryTypedef,
}) {}
