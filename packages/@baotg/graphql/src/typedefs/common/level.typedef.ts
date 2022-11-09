import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseTypedef } from '..';

@ObjectType()
export class Level extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  id!: string;

  @Field(() => String, {
    nullable: true,
  })
  code!: string;

  @Field(() => String, {
    nullable: true,
  })
  level_id!: string;

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
}
