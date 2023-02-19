import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class TagFunction {
  @Field(() => Int, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  code!: string;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

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
  priority!: number;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  tag_sub_function!: object;

  @Field(() => String, {
    nullable: true,
  })
  value!: string;
}
