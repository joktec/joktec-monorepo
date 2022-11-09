import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobGroup extends BaseTypedef {
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => String, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  organizationId: string;
}

@ObjectType()
export class JobGroupDetail extends JobGroup {}

@ObjectType()
export class JobGroupListResponse extends BaseListResponse({
  viewDto: JobGroup,
}) {}
