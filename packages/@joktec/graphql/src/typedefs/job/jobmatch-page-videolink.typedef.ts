import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobMatchPageVideoLink extends BaseTypedef {
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
  link: string;

  @Field(() => String, {
    nullable: true,
  })
  page: string;
}

@ObjectType()
export class JobMatchPageVideoLinkDetail extends JobMatchPageVideoLink {}

@ObjectType()
export class JobMatchPageVideoLinkListResponse extends BaseListResponse({
  viewDto: JobMatchPageVideoLink,
}) {}
