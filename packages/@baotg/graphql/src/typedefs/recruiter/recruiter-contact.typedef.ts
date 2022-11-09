import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RecruiterContact extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  fullName!: string;

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber!: string;

  @Field(() => String, {
    nullable: true,
  })
  email!: string;

  @Field(() => String, {
    nullable: true,
  })
  company!: string;

  @Field(() => String, {
    nullable: true,
  })
  location!: string;

  @Field(() => String, {
    nullable: true,
  })
  referralEmail!: string;
}

@ObjectType()
export class RecruiterContactDetail extends RecruiterContact {}

@ObjectType()
export class RecruiterContactListReponse extends BaseListResponse({
  viewDto: RecruiterContact,
}) {}
