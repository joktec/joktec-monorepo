import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopInternalUserEmail extends BaseTypedef {
  @Field(() => String, { nullable: true })
  created: Date;

  @Field(() => String, { nullable: true })
  updated: Date;

  @Field(() => String, { nullable: true })
  emailTiopsTeam: string;

  @Field(() => String, { nullable: true })
  emailHiringTeam: string;

  @Field(() => String, { nullable: true })
  cc: string;

  @Field(() => Number, { nullable: true })
  disabled: number;
}

@ObjectType()
export class JobhopInternalUserEmailDetail extends JobhopInternalUserEmail {}

@ObjectType()
export class JobhopInternalUserEmailListResponse extends BaseListResponse({
  viewDto: JobhopInternalUserEmail,
}) {}
