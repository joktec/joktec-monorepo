import { Field, InputType } from '@nestjs/graphql';
import { BaseConditionInput, BasePaginationInput, BaseQueryInput } from '../base.input';

@InputType()
export class BaseJobUserInput {
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

  @Field(() => Date, {
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

  @Field(() => Date, {
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

  @Field(() => Date, {
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

@InputType()
export class CreateJobUserInput extends BaseJobUserInput {}

@InputType()
export class UpdateJobUserInput extends BaseJobUserInput {
  @Field()
  id!: string;
}

@InputType()
export class JobUserPaginationInput extends BasePaginationInput {}

@InputType()
export class JobUserConditionInput extends BaseConditionInput {}

@InputType()
export class JobUserQueryInput extends BaseQueryInput({
  conditionInput: JobUserConditionInput,
  paginationInput: JobUserConditionInput,
})<JobUserPaginationInput, JobUserConditionInput> {}
