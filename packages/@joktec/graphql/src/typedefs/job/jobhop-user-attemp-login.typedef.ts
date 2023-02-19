import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopUserAttemptLogin extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  updated: Date;

  @Field(() => Int, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;
}

@ObjectType()
export class JobhopUserAttemptLoginDetail extends JobhopUserAttemptLogin {}

@ObjectType()
export class JobhopUserAttemptLoginListResponse extends BaseListResponse({
  viewDto: JobhopUserAttemptLogin,
}) {}
