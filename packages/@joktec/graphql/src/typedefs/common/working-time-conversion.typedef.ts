import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class MiscWorkingTimeConversion {
  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  DAY!: object;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  MONTH!: object;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  QUARTER!: object;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  YEAR!: object;
}
