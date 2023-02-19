import { Field, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class SalaryReviewFilterData {
  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  averageSalaryDetailApi!: object;

  @Field(() => GraphQLJSON, {
    nullable: true,
  })
  topAverageApi!: object;
}
