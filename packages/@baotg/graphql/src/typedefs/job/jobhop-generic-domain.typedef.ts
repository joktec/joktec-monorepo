import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopGenericDomain extends BaseTypedef {
  @Field(() => String, { nullable: true })
  domain: string;
}

@ObjectType()
export class JobhopGenericDomainDetail extends JobhopGenericDomain {}

@ObjectType()
export class JobhopGenericDomainListResponse extends BaseListResponse({
  viewDto: JobhopGenericDomain,
}) {}
