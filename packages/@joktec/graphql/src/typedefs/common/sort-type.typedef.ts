import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseTypedef } from '..';

@ObjectType()
export class SortType extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  id!: number;

  @Field(() => Boolean, {
    nullable: true,
  })
  isDefault!: boolean;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  localizedName!: object;

  @Field(() => String, {
    nullable: true,
  })
  value!: string;
}
