import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopScoreNotification extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  priority: number;

  @Field(() => Int, {
    nullable: true,
  })
  priority2: number;

  @Field(() => Int, {
    nullable: true,
  })
  screenCode: number;

  @Field(() => String, {
    nullable: true,
  })
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  body: string;

  @Field(() => String, {
    nullable: true,
  })
  titleVi: string;

  @Field(() => String, {
    nullable: true,
  })
  bodyVi: string;

  @Field(() => Int, {
    nullable: true,
  })
  active: number;

  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  emailVi: string;
}

@ObjectType()
export class JobhopScoreNotificationDetail extends JobhopScoreNotification {}

@ObjectType()
export class JobhopScoreNotificationListResponse extends BaseListResponse({
  viewDto: JobhopScoreNotification,
}) {}
