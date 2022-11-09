import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { BaseTypedef } from '..';

@ObjectType()
export class Salary extends BaseTypedef {
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

  @Field(() => Int, {
    nullable: true,
  })
  relatedId!: number;

  @Field(() => String, {
    nullable: true,
  })
  salaryCurrency!: string;

  @Field(() => Int, {
    nullable: true,
  })
  salaryMax!: number;

  @Field(() => Int, {
    nullable: true,
  })
  salaryMin!: number;
}
