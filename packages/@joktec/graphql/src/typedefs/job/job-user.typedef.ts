import { Field, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class JobUser extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  userId!: string;

  @Field(() => Number, {
    nullable: true,
  })
  active: number;

  @Field(() => String, {
    nullable: true,
  })
  address: string;

  @Field(() => String, {
    nullable: true,
  })
  avatar: string;

  @Field(() => String, {
    nullable: true,
  })
  birthday: Date;

  @Field(() => String, {
    nullable: true,
  })
  cvChoose: string;

  @Field(() => Number, {
    nullable: true,
  })
  deleted: number;

  @Field(() => String, {
    nullable: true,
  })
  detail: string;

  @Field(() => String, {
    nullable: true,
  })
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  experience: string;

  @Field(() => String, {
    nullable: true,
  })
  firstName: string;

  @Field(() => String, {
    nullable: true,
  })
  fullName: string;

  @Field(() => Number, {
    nullable: true,
  })
  gender: number;

  @Field(() => String, {
    nullable: true,
  })
  lastLogin: Date;

  @Field(() => String, {
    nullable: true,
  })
  lastName: string;

  @Field(() => Number, {
    nullable: true,
  })
  locked: number;

  @Field(() => String, {
    nullable: true,
  })
  password: string;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber: string;

  @Field(() => String, {
    nullable: true,
  })
  position: string;

  @Field(() => String, {
    nullable: true,
  })
  status: string;

  @Field(() => String, {
    nullable: true,
  })
  title: string;

  @Field(() => String, {
    nullable: true,
  })
  username: string;

  @Field(() => String, {
    nullable: true,
  })
  expireResetPass: Date;

  @Field(() => String, {
    nullable: true,
  })
  tokenResetPass: string;

  @Field(() => String, {
    nullable: true,
  })
  socialLink: string;

  @Field(() => String, {
    nullable: true,
  })
  logo: string;

  @Field(() => String, {
    nullable: true,
  })
  name: string;

  @Field(() => Number, {
    nullable: true,
  })
  isAutoCreated: number;

  @Field(() => String, {
    nullable: true,
  })
  legacyPassword: string;

  @Field(() => Number, {
    nullable: true,
  })
  memberRoleId: number;

  @Field(() => Number, {
    nullable: true,
  })
  platform: number;

  @Field(() => String, {
    nullable: true,
  })
  fbId: string;

  @Field(() => String, {
    nullable: true,
  })
  vneId: string;

  @Field(() => Number, {
    nullable: true,
  })
  unlockConfirmShown: number;

  @Field(() => String, {
    nullable: true,
  })
  emailVerification: string;

  @Field(() => String, {
    nullable: true,
  })
  lockedReasonCode: string;

  @Field(() => Number, {
    nullable: true,
  })
  syncedPlatform: number;
}

@ObjectType()
export class JobUserDetail extends JobUser {}

@ObjectType()
export class JobUserListResponse extends BaseListResponse({
  viewDto: JobUser,
}) {}
