import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseTypedef } from '..';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobMatchPageTestimonialContent extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated: Date;

  @Field(() => String, {
    nullable: true,
  })
  lang: string;

  @Field(() => String, {
    nullable: true,
  })
  jobTitle: string;

  @Field(() => String, {
    nullable: true,
  })
  content: string;

  @Field(() => String, {
    nullable: true,
  })
  testimonialId: number;
}

@ObjectType()
export class JobMatchPageTestimonialContentDetail extends JobMatchPageTestimonialContent {}

@ObjectType()
export class JobMatchPageTestimonialContentListResponse extends BaseListResponse({
  viewDto: JobMatchPageTestimonialContent,
}) {}
