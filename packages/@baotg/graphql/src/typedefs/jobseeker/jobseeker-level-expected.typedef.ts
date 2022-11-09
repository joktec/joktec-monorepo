import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerLevelExpected extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  levelId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@ObjectType()
export class JobSeekerLevelExpectedDetail extends JobSeekerLevelExpected {}

@ObjectType()
export class JobSeekerLevelExpectedListReponse extends BaseListResponse({
  viewDto: JobSeekerLevelExpected,
}) {}
