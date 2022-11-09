import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerActivityDate extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  device!: string;

  @Field(() => String, {
    nullable: true,
  })
  referer!: string;

  @Field(() => String, {
    nullable: true,
  })
  status!: string;

  @Field(() => String, {
    nullable: true,
  })
  createdDate!: Date;

  @Field(() => String, {
    nullable: true,
  })
  messageType!: string;

  @Field(() => String, {
    nullable: true,
  })
  servletPath!: string;

  @Field(() => Int, {
    nullable: true,
  })
  statusCode!: number;
}

@ObjectType()
export class JobSeekerActivityDateDetail extends JobSeekerActivityDate {}

@ObjectType()
export class JobSeekerActivityDateListReponse extends BaseListResponse({
  viewDto: JobSeekerActivityDate,
}) {}
