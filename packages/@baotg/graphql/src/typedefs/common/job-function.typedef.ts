import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseTypedef } from '..';

@ObjectType()
export class JobFunction extends BaseTypedef {
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

  @Field(() => String, {
    nullable: true,
  })
  value!: string;
}
