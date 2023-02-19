import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class MiscWorkplaceType {
  @Field(() => String, {
    nullable: true,
  })
  id!: string;

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
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  value!: string;
}
