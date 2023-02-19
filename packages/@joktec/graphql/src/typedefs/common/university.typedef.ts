import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseTypedef } from '..';

@ObjectType()
export class University extends BaseTypedef {
  @Field(() => Int, {
    nullable: true,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  nameEng!: string;

  @Field(() => String, {
    nullable: true,
  })
  value!: string;
}
