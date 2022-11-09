import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobhopUserJobSentrecc extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  created: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobId: string;

  @Field(() => String, {
    nullable: true,
  })
  userId: string;
}

@ObjectType()
export class JobhopUserJobSentreccDetail extends JobhopUserJobSentrecc {}

@ObjectType()
export class JobhopUserJobSentreccListResponse extends BaseListResponse({
  viewDto: JobhopUserJobSentrecc,
}) {}
