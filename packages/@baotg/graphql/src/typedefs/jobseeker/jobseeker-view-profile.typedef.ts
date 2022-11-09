import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerViewProfile extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  viewerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  viewerUsername!: string;

  @Field(() => String, {
    nullable: true,
  })
  profileId!: string;

  @Field(() => String, {
    nullable: true,
  })
  profileUsername!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdAt!: Date;

  @Field(() => String, {
    nullable: true,
  })
  viewAt!: Date;
}

@ObjectType()
export class JobSeekerViewProfileDetail extends JobSeekerViewProfile {}

@ObjectType()
export class JobSeekerViewProfileListReponse extends BaseListResponse({
  viewDto: JobSeekerViewProfile,
}) {}
