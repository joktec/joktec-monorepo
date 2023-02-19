import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerMarketValue extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isJhProfile!: number;

  @Field(() => Int, {
    nullable: true,
  })
  marketValue!: number;

  @Field(() => Int, {
    nullable: true,
  })
  nearestMarketValue!: number;

  @Field(() => String, {
    nullable: true,
  })
  metaData!: string;

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
export class JobSeekerMarketValueDetail extends JobSeekerMarketValue {}

@ObjectType()
export class JobSeekerMarketValueListReponse extends BaseListResponse({
  viewDto: JobSeekerMarketValue,
}) {}
