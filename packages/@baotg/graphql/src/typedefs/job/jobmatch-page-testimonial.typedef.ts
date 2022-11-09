import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseTypedef } from '..';
import { BaseListResponse } from '../base.typedef';

@ObjectType()
export class JobMatchPageTestimonial extends BaseTypedef {
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
  avatar: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => String, {
    nullable: true,
  })
  page: string;
}

@ObjectType()
export class JobMatchPageTestimonialDetail extends JobMatchPageTestimonial {}

@ObjectType()
export class JobMatchPageTestimonialListResponse extends BaseListResponse({
  viewDto: JobMatchPageTestimonial,
}) {}
