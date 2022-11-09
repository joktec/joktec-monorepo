import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerEntityView extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  keyword!: string;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  image!: string;

  @Field(() => Int, {
    nullable: true,
  })
  confidential!: number;

  @Field(() => String, {
    nullable: true,
  })
  entityType!: string;

  @Field(() => String, {
    nullable: true,
  })
  entityId!: string;

  @Field(() => String, {
    nullable: true,
  })
  publicId!: string;

  @Field(() => String, {
    nullable: true,
  })
  subTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  customUrlCompany!: string;
}

@ObjectType()
export class JobSeekerEntityViewDetail extends JobSeekerEntityView {}

@ObjectType()
export class JobSeekerEntityViewListReponse extends BaseListResponse({
  viewDto: JobSeekerEntityView,
}) {}
