import {
  GameLeaderBoardBotMessagePattern,
  LuckySpinMicroserviceConfig,
} from '@jobhopin/core';
import { Inject } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateGameLeaderBoardBotInput,
  UpdateGameLeaderBoardBotInput,
  GameLeaderBoardBotQueryInput,
  GameLeaderBoardBotListReponse,
  GameLeaderBoardBot,
} from '@jobhopin/graphql';
import { cdnUrl, assetUrl } from './../../../utils/url';
import { AVATART_LEADER_BOARD_BOT } from './../../../constants';

const luckySpinMicroserviceConfig = new LuckySpinMicroserviceConfig();
@Resolver(() => GameLeaderBoardBot)
export class GameLeaderBoardBotResolver extends BaseResolver<
  CreateGameLeaderBoardBotInput,
  UpdateGameLeaderBoardBotInput,
  GameLeaderBoardBotQueryInput
>({
  viewDto: GameLeaderBoardBot,
  createInput: CreateGameLeaderBoardBotInput,
  updateInput: UpdateGameLeaderBoardBotInput,
  listQueryInput: GameLeaderBoardBotQueryInput,
  listViewDto: GameLeaderBoardBotListReponse,
  name: 'gameLeaderBoardBot',
  pluralName: 'gameLeaderBoardBots',
}) {
  constructor(
    @Inject(luckySpinMicroserviceConfig.name)
    private readonly luckySpinMicroservice: ClientProxy,
  ) {
    super(luckySpinMicroservice, GameLeaderBoardBotMessagePattern);
  }

  @ResolveField()
  avatar(@Parent() gameLeaderBoardBot: GameLeaderBoardBot) {
    return gameLeaderBoardBot.avatar
      ? cdnUrl(gameLeaderBoardBot.avatar)
      : assetUrl(AVATART_LEADER_BOARD_BOT);
  }
}
