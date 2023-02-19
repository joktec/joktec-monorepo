import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class BlogPostDigest extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  postId: number;

  @Field(() => String, {
    nullable: true,
  })
  createDate: Date;
}

@ObjectType()
export class BlogPostDigestDetail extends BlogPostDigest {}

@ObjectType()
export class BlogPostDigestListReponse extends BaseListResponse({
  viewDto: BlogPostDigest,
}) {}
