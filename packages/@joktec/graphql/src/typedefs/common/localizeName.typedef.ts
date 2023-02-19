import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocalizedName {
  @Field(() => String, {
    nullable: true,
  })
  vi!: string;

  @Field(() => String, {
    nullable: true,
  })
  en!: string;
}
