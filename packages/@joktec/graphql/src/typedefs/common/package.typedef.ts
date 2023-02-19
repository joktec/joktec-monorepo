import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseTypedef } from '..';

@ObjectType()
export class Package extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  bonusCreditPerentage!: number;

  @Field(() => Int, {
    nullable: true,
  })
  credits!: number;

  @Field(() => Boolean, {
    nullable: true,
  })
  enabled!: boolean;

  @Field(() => Int, {
    nullable: true,
  })
  expiryMonth!: number;

  @Field(() => Int, {
    nullable: true,
  })
  id!: number;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedPrice!: object;

  @Field(() => Int, {
    nullable: true,
  })
  maxAdmin!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxCandidate!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxHiringManager!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxHrMember!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxJob!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxJobInterview!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxTiAssistedJob!: number;

  @Field(() => Int, {
    nullable: true,
  })
  maxUser!: number;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  name_eng!: string;

  @Field(() => Int, {
    nullable: true,
  })
  price!: number;

  @Field(() => Int, {
    nullable: true,
  })
  priceUsd!: number;

  @Field(() => String, {
    nullable: true,
  })
  value!: string;
}
