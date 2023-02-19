import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobTitle extends BaseTypedef {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  nameEn: string;

  @Field(() => Number, { nullable: true })
  priority: number;
}

@ObjectType()
export class JobTitleDetail extends JobTitle {}

@ObjectType()
export class JobTitleListResponse extends BaseListResponse({
  viewDto: JobTitle,
}) {}
