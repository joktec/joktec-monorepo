import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerJobExpected extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  aiStatusCode!: number;

  @Field(() => String, {
    nullable: true,
  })
  aiUpdatedAt!: string;

  @Field(() => String, {
    nullable: true,
  })
  skillsVectorEmbedding!: string;

  @Field(() => String, {
    nullable: true,
  })
  vectorEmbedding!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;
}

@ObjectType()
export class JobSeekerJobExpectedDetail extends JobSeekerJobExpected {}

@ObjectType()
export class JobSeekerJobExpectedListReponse extends BaseListResponse({
  viewDto: JobSeekerJobExpected,
}) {}
