import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class BlogContent extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  contentId: string;

  @Field(() => String, {
    nullable: true,
  })
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  link: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy: string;

  @Field(() => String, {
    nullable: true,
  })
  updateDate: Date;

  @Field(() => String, {
    nullable: true,
  })
  company: string;

  @Field(() => String, {
    nullable: true,
  })
  urlImage: string;
}

@ObjectType()
export class BlogContentDetail extends BlogContent {}

@ObjectType()
export class BlogContentListReponse extends BaseListResponse({
  viewDto: BlogContent,
}) {}
