import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseTypedef } from '..';

@ObjectType()
export class JobStatus extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  id!: string;

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
  value!: string;
}
