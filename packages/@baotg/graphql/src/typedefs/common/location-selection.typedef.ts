import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class LocationSelection {
  @Field(() => String, {
    nullable: true,
  })
  askLocationSelectionImage!: string;

  @Field(() => Int, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  code!: string;

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
  value!: string;

  @Field(() => String, {
    nullable: true,
  })
  type!: string;
}
