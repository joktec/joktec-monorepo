import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerTitleCase extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;
}

@ObjectType()
export class JobSeekerTitleCaseDetail extends JobSeekerTitleCase {}

@ObjectType()
export class JobSeekerTitleCaseListReponse extends BaseListResponse({
  viewDto: JobSeekerTitleCase,
}) {}
