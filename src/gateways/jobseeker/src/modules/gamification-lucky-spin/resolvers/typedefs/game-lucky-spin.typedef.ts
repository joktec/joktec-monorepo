import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlayGameLuckySpinResponse {
  @Field(() => Number, {
    nullable: false,
  })
  id!: number;

  @Field(() => String, {
    nullable: true,
  })
  name!: string;

  @Field(() => String, {
    nullable: true,
  })
  itemType!: string;

  @Field(() => Int, {
    nullable: true,
  })
  quantity!: number;

  @Field(() => String, {
    nullable: true,
  })
  itemDescription!: string;

  @Field(() => String, {
    nullable: true,
  })
  itemData!: string;

  @Field(() => String, {
    nullable: true,
  })
  itemImage!: string;

  @Field(() => Number, {
    nullable: true,
  })
  numberOfPieces!: number;
}
