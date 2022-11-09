import { BaseListResponse, BaseTypedef } from '..';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ThumbdownReason extends BaseTypedef {
  @Field(() => String, { nullable: true })
  code: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  nameEn: string;

  @Field(() => Number, { nullable: true })
  deleted: number;

  @Field(() => Number, { nullable: true })
  isActive: number;

  @Field(() => String, { nullable: true })
  updateBy: string;

  @Field(() => String, { nullable: true })
  createdBy: string;

  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class ThumbdownReasonDetail extends ThumbdownReason {}

@ObjectType()
export class ThumbdownReasonListResponse extends BaseListResponse({
  viewDto: ThumbdownReason,
}) {}
