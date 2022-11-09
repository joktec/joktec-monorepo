import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerJobAlert extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  key!: string;

  @Field(() => String, {
    nullable: true,
  })
  frequency!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

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
  locationIds!: string;

  @Field(() => String, {
    nullable: true,
  })
  alertVia!: string;

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
  isGuest!: number;
}

@ObjectType()
export class JobSeekerJobAlertDetail extends JobSeekerJobAlert {}

@ObjectType()
export class JobSeekerJobAlertListReponse extends BaseListResponse({
  viewDto: JobSeekerJobAlert,
}) {}
