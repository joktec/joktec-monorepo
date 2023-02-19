import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class MarketInsightCity {
  @Field(() => String, {
    nullable: true,
  })
  id!: string;

  @Field(() => String, {
    nullable: true,
  })
  image!: string;

  @Field(() => String, {
    nullable: true,
  })
  imageHighlight!: string;

  @Field(() => String, {
    nullable: true,
  })
  imageKyc!: string;

  @Field(() => Int, {
    nullable: true,
  })
  level!: number;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;

  @Field(() => String, {
    nullable: true,
  })
  slug!: string;

  @Field(() => String, {
    nullable: true,
  })
  type!: string;

  @Field(() => String, {
    nullable: true,
  })
  value!: string;
}
