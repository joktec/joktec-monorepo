import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PlayQuizzInput {
  @Field(() => String, {
    nullable: false,
  })
  quiz: string;
}

@InputType()
export class QuizzMyOverallInput {
  @Field(() => String, {
    nullable: false,
  })
  quiz: string;
}

@InputType()
export class QuizzCheckInInput {
  @Field(() => String, {
    nullable: false,
  })
  quiz: string;
}

@InputType()
export class VoteQuizzInput {
  @Field(() => String, {
    nullable: false,
  })
  quiz: string;

  @Field(() => String, {
    nullable: false,
  })
  voteStatus: string;
}

@InputType()
export class MyVoteQuizzInput {
  @Field(() => String, {
    nullable: false,
  })
  quiz: string;
}

