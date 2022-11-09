import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopNotiMessageDetail extends BaseTypedef {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  subject: string;

  @Field(() => String, { nullable: true })
  subjectEn: string;

  @Field(() => String, { nullable: true })
  body: string;

  @Field(() => String, { nullable: true })
  bodyEn: string;

  @Field(() => String, { nullable: true })
  msgType: string;

  @Field(() => Number, { nullable: true })
  iconType: number;

  @Field(() => String, { nullable: true })
  extraData: string;
}

@ObjectType()
export class JobhopNotiMessageDetailDetail extends JobhopNotiMessageDetail {}

@ObjectType()
export class JobhopNotiMessageDetailListResponse extends BaseListResponse({
  viewDto: JobhopNotiMessageDetail,
}) {}
