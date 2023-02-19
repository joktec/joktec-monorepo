import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerCvEmailSegment extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  cvId!: string;

  @Field(() => String, {
    nullable: true,
  })
  fullName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  accountActivated!: number;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;
}

@ObjectType()
export class JobSeekerCvEmailSegmentDetail extends JobSeekerCvEmailSegment {}

@ObjectType()
export class JobSeekerCvEmailSegmentListReponse extends BaseListResponse({
  viewDto: JobSeekerCvEmailSegment,
}) {}
