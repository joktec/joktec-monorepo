import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerLocation extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  createdOn!: Date;

  @Field(() => String, {
    nullable: true,
  })
  userId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  locationId!: number;

  @Field(() => String, {
    nullable: true,
  })
  jobseekerId!: string;
}

@ObjectType()
export class JobSeekerLocationDetail extends JobSeekerLocation {}

@ObjectType()
export class JobSeekerLocationListReponse extends BaseListResponse({
  viewDto: JobSeekerLocation,
}) {}
