import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseResponse {
  @Field(() => String, {
    nullable: true,
  })
  id: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => Int, {
    nullable: true,
  })
  active!: string;

  @Field(() => String, {
    nullable: true,
  })
  username!: string;

  @Field(() => String, {
    nullable: true,
  })
  firstName!: string;

  @Field(() => String, {
    nullable: true,
  })
  lastName!: string;

  @Field(() => Int, {
    nullable: true,
  })
  gender!: number;

  @Field(() => String, {
    nullable: true,
  })
  title!: string;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => String, {
    nullable: true,
  })
  address!: string;

  @Field(() => String, {
    nullable: true,
  })
  socialLink!: string;

  @Field(() => Int, {
    nullable: true,
  })
  locked!: number;

  @Field(() => Int, {
    nullable: true,
  })
  platform!: number;

  @Field(() => String, {
    nullable: true,
  })
  emailVerification!: string;

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
export class LoginResponse extends BaseResponse {
  @Field(() => String, {
    nullable: true,
  })
  accessToken!: string;
}

@ObjectType()
export class RegisterResponse extends BaseResponse {}

@ObjectType()
export class UserResponse extends BaseResponse {}
