import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerMatchScore extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  matchScore!: number;

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
  createdBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;
}

@ObjectType()
export class JobSeekerMatchScoreDetail extends JobSeekerMatchScore {}

@ObjectType()
export class JobSeekerMatchScoreListReponse extends BaseListResponse({
  viewDto: JobSeekerMatchScore,
}) {}
