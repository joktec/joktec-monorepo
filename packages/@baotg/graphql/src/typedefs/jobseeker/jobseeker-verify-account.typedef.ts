import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobSeekerVerifyAccount extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  note!: string;

  @Field(() => String, {
    nullable: true,
  })
  verifyMethod!: string;

  @Field(() => String, {
    nullable: true,
  })
  identityCardId!: string;

  @Field(() => Int, {
    nullable: true,
  })
  isVerified!: number;

  @Field(() => String, {
    nullable: true,
  })
  approvedById!: string;

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
  jobseekerId!: string;

  @Field(() => String, {
    nullable: true,
  })
  companyEmail!: string;

  @Field(() => String, {
    nullable: true,
  })
  updatedBy!: string;
}

@ObjectType()
export class JobSeekerVerifyAccountDetail extends JobSeekerVerifyAccount {}

@ObjectType()
export class JobSeekerVerifyAccountListReponse extends BaseListResponse({
  viewDto: JobSeekerVerifyAccount,
}) {}
