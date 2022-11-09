import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerEmailSegment extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  segmentName!: string;

  @Field(() => String, {
    nullable: true,
  })
  latestTrigger!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  routineId!: string;
}

@ObjectType()
export class JobSeekerEmailSegmentDetail extends JobSeekerEmailSegment {}

@ObjectType()
export class JobSeekerEmailSegmentListReponse extends BaseListResponse({
  viewDto: JobSeekerEmailSegment,
}) {}
