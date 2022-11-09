import {
  GameScoreTurnLogMessagePattern,
  LuckySpinMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateGameScoreTurnLogInput,
  UpdateGameScoreTurnLogInput,
  GameScoreTurnLogQueryInput,
  GameScoreTurnLogListReponse,
  GameScoreTurnLog,
} from '@jobhopin/graphql';

const luckySpinMicroserviceConfig = new LuckySpinMicroserviceConfig();
@Resolver(() => GameScoreTurnLog)
export class GameScoreTurnLogResolver extends BaseResolver<
  CreateGameScoreTurnLogInput,
  UpdateGameScoreTurnLogInput,
  GameScoreTurnLogQueryInput
>({
  viewDto: GameScoreTurnLog,
  createInput: CreateGameScoreTurnLogInput,
  updateInput: UpdateGameScoreTurnLogInput,
  listQueryInput: GameScoreTurnLogQueryInput,
  listViewDto: GameScoreTurnLogListReponse,
  name: 'gameScoreTurnLog',
  pluralName: 'gameScoreTurnLogs',
}) {
  constructor(
    @Inject(luckySpinMicroserviceConfig.name)
    private readonly luckySpinMicroservice: ClientProxy,
  ) {
    super(luckySpinMicroservice, GameScoreTurnLogMessagePattern);
  }
}
