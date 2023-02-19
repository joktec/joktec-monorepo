import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerCareerInterestCard extends BaseTypedef {
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
  jobTitle!: string;

  @Field(() => String, {
    nullable: true,
  })
  locationId!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updatedAt!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  isDeleted!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobExpectId!: string;
}

@ObjectType()
export class JobSeekerCareerInterestCardDetail extends JobSeekerCareerInterestCard {}

@ObjectType()
export class JobSeekerCareerInterestCardListReponse extends BaseListResponse({
  viewDto: JobSeekerCareerInterestCard,
}) {}
