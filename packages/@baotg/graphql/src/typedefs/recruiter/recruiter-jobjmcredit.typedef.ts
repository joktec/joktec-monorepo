import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseListResponse, BaseTypedef } from '../base.typedef';

@ObjectType()
export class RecruiterJobjmcredit extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  file!: string;

  @Field(() => String, {
    nullable: true,
  })
  lang!: string;

  @Field(() => String, {
    nullable: true,
  })
  link!: string;

  @Field(() => String, {
    nullable: true,
  })
  position!: string;

  @Field(() => String, {
    nullable: true,
  })
  page!: string;

  @Field(() => String, {
    nullable: true,
  })
  validFrom!: Date;

  @Field(() => String, {
    nullable: true,
  })
  validUntil!: Date;

  @Field(() => Int, {
    nullable: true,
  })
  active!: number;

  @Field(() => String, {
    nullable: true,
  })
  description!: string;
}

@ObjectType()
export class RecruiterJobjmcreditDetail extends RecruiterJobjmcredit {}

@ObjectType()
export class RecruiterJobjmcreditListReponse extends BaseListResponse({
  viewDto: RecruiterJobjmcredit,
}) {}
