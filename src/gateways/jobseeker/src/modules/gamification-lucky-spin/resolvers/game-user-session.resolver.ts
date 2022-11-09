import {
  GameUserSessionMessagePattern,
  LuckySpinMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateGameUserSessionInput,
  UpdateGameUserSessionInput,
  GameUserSessionQueryInput,
  GameUserSessionListReponse,
  GameUserSession,
} from '@jobhopin/graphql';

const luckySpinMicroserviceConfig = new LuckySpinMicroserviceConfig();
@Resolver(() => GameUserSession)
export class GameUserSessionResolver extends BaseResolver<
  CreateGameUserSessionInput,
  UpdateGameUserSessionInput,
  GameUserSessionQueryInput
>({
  viewDto: GameUserSession,
  createInput: CreateGameUserSessionInput,
  updateInput: UpdateGameUserSessionInput,
  listQueryInput: GameUserSessionQueryInput,
  listViewDto: GameUserSessionListReponse,
  name: 'gameUserSession',
  pluralName: 'gameUserSessions',
}) {
  constructor(
    @Inject(luckySpinMicroserviceConfig.name)
    private readonly luckySpinMicroservice: ClientProxy,
  ) {
    super(luckySpinMicroservice, GameUserSessionMessagePattern);
  }
}
