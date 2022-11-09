import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PlayGameLuckySpinInput {
  @Field(() => Number, {
    nullable: false,
  })
  luckySpinId: number;
}