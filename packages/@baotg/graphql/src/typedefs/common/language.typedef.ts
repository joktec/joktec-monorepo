import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseTypedef } from '..';

@ObjectType()
export class Language extends BaseTypedef {
  @Field(() => String, {
    nullable: true,
  })
  id!: string;

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
  value!: string;
}
