import { Field, ObjectType } from '@nestjs/graphql';
import { BaseTypedef, BaseListResponse } from '..';

@ObjectType()
export class JobhopBlackListDomain extends BaseTypedef {
  @Field(() => String, { nullable: true })
  domain: string;
}

@ObjectType()
export class JobhopBackListDomainDetail extends JobhopBlackListDomain {}

@ObjectType()
export class JobhopBlackListDomainListResponse extends BaseListResponse({
  viewDto: JobhopBlackListDomain,
}) {}
