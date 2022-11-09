import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerAward extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  organization!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  createBy!: string;

  @Field(() => String, {
    nullable: true,
  })
  createDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastUpdate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  receiveTime!: Date;

  @Field(() => String, {
    nullable: true,
  })
  updateBy!: string;
}

@ObjectType()
export class JobSeekerAwardDetail extends JobSeekerAward {}

@ObjectType()
export class JobSeekerAwardListReponse extends BaseListResponse({
  viewDto: JobSeekerAward,
}) {}
