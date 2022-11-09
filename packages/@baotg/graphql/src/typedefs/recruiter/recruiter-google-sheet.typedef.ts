import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CrawlDataResponse {
  @Field(() => Boolean, { nullable: true })
  isSuccess: boolean;
}
