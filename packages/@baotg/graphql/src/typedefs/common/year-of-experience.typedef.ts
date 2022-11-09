import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class YearOfExperience {
  @Field(() => String, {
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

  @Field(() => Int, {
    nullable: true,
  })
  priority!: number;

  @Field(() => String, {
    nullable: true,
  })
  value!: string;
}
