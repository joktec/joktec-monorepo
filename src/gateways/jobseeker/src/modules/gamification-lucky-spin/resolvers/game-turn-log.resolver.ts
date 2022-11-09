import {
  GameTurnLogMessagePattern,
  LuckySpinMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateGameTurnLogInput,
  UpdateGameTurnLogInput,
  GameTurnLogQueryInput,
  GameTurnLogListReponse,
  GameTurnLog,
} from '@jobhopin/graphql';

const luckySpinMicroserviceConfig = new LuckySpinMicroserviceConfig();
@Resolver(() => GameTurnLog)
export class GameTurnLogResolver extends BaseResolver<
  CreateGameTurnLogInput,
  UpdateGameTurnLogInput,
  GameTurnLogQueryInput
>({
  viewDto: GameTurnLog,
  createInput: CreateGameTurnLogInput,
  updateInput: UpdateGameTurnLogInput,
  listQueryInput: GameTurnLogQueryInput,
  listViewDto: GameTurnLogListReponse,
  name: 'gameTurnLog',
  pluralName: 'gameTurnLogs',
}) {
  constructor(
    @Inject(luckySpinMicroserviceConfig.name)
    private readonly luckySpinMicroservice: ClientProxy,
  ) {
    super(luckySpinMicroservice, GameTurnLogMessagePattern);
  }
}
