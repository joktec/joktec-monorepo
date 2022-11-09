import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerJobSaved extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;
}

@ObjectType()
export class JobSeekerJobSavedDetail extends JobSeekerJobSaved {}

@ObjectType()
export class JobSeekerJobSavedListReponse extends BaseListResponse({
  viewDto: JobSeekerJobSaved,
}) {}
