import { firstValueFrom } from 'rxjs';
import {
  QuizzMessagePattern,
  QuizzMicroserviceConfig,
  MysqlMicroserviceConfig,
  GraphqlJwtAuthGuard,
  CurrentUser,
  QuizzVoteLogMessagePattern,
} from '@jobhopin/core';
import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Context,
} from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateQuizzInput,
  UpdateQuizzInput,
  QuizzQueryInput,
  QuizzListReponse,
  Quizz,
} from '@jobhopin/graphql';
import { assetUrl, cdnUrl } from './../../../utils';
import { QUIZZ_BANNER_DEFAULT, QUIZZ_LOGO_DEFAULT } from './../../../constants';
import {
  QuizzMyOverallInput,
  PlayQuizzInput,
  QuizzCheckInInput,
  VoteQuizzInput,
  MyVoteQuizzInput,
} from './inputs';
import {
  QuizzMyOverallResponse,
  PlayQuizzResponse,
  CheckInResponse,
  VoteQuizzResponse,
  MyVoteQuizzResponse,
} from './typedefs';

const quizzMicroserviceConfig = new QuizzMicroserviceConfig();
const mysqlMicroserviceConfig = new MysqlMicroserviceConfig();
@Resolver(() => Quizz)
@UseGuards(GraphqlJwtAuthGuard)
export class QuizzResolver extends BaseResolver<
  CreateQuizzInput,
  UpdateQuizzInput,
  QuizzQueryInput
>({
  viewDto: Quizz,
  createInput: CreateQuizzInput,
  updateInput: UpdateQuizzInput,
  listQueryInput: QuizzQueryInput,
  listViewDto: QuizzListReponse,
  name: 'quizz',
  pluralName: 'quizzes',
}) {
  constructor(
    @Inject(quizzMicroserviceConfig.name)
    private readonly quizzMicroservice: ClientProxy,
    @Inject(mysqlMicroserviceConfig.name)
    private readonly mysqlMicroservice: ClientProxy,
  ) {
    super(quizzMicroservice, QuizzMessagePattern);
  }

  @ResolveField()
  async category(@Parent() quizz: Quizz, @Context() { loaders }) {
    return loaders.quizzCategory.load(quizz.category);
  }

  @ResolveField()
  banner(@Parent() quizz: Quizz) {
    return quizz.banner ? cdnUrl(quizz.banner) : assetUrl(QUIZZ_BANNER_DEFAULT);
  }

  @ResolveField()
  logo(@Parent() quizz: Quizz) {
    return quizz.logo ? cdnUrl(quizz.logo) : assetUrl(QUIZZ_LOGO_DEFAULT);
  }

  @Query(() => QuizzMyOverallResponse, { name: 'quizzMyOverall' })
  async quizzMyOverall(
    @Args('query', { type: () => QuizzMyOverallInput })
    query: QuizzMyOverallInput,
    @CurrentUser() user,
  ) {
    const userId: string = user.id;
    const { quiz } = query as any;
    return await firstValueFrom(
      this.baseMicroservice.send(QuizzMessagePattern.MY_OVERALL, {
        quiz,
        userId,
      }),
    );
  }

  @Mutation(() => PlayQuizzResponse, { name: 'playQuizz' })
  async playQuizz(@Args('input') input: PlayQuizzInput, @CurrentUser() user) {
    const userId: string = user.id;
    const { quiz } = input;
    return await firstValueFrom(
      this.mysqlMicroservice.send(QuizzMessagePattern.PLAY, {
        quiz,
        userId,
      }),
    );
  }

  @Mutation(() => CheckInResponse, { name: 'checkInQuizz' })
  async checkIn(@Args('input') input: QuizzCheckInInput, @CurrentUser() user) {
    const userId: string = user.id;
    const { quiz } = input;
    return await firstValueFrom(
      this.mysqlMicroservice.send(QuizzMessagePattern.CHECKIN, {
        quiz,
        userId,
      }),
    );
  }

  @Mutation(() => VoteQuizzResponse, { name: 'voteQuizz' })
  async voteQuizz(@Args('input') input: VoteQuizzInput, @CurrentUser() user) {
    const userId: string = user.id;
    const { quiz, voteStatus } = input;
    return await firstValueFrom(
      this.mysqlMicroservice.send(QuizzVoteLogMessagePattern.VOTE, {
        quiz,
        userId,
        voteStatus,
      }),
    );
  }

  @Mutation(() => MyVoteQuizzResponse, { name: 'myVoteQuizz' })
  async myVoteQuizz(
    @Args('input') input: MyVoteQuizzInput,
    @CurrentUser() user,
  ) {
    const userId: string = user.id;
    const { quiz } = input;
    return await firstValueFrom(
      this.mysqlMicroservice.send(QuizzVoteLogMessagePattern.MY_VOTE, {
        quiz,
        userId,
      }),
    );
  }
}
