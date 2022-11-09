import { firstValueFrom } from 'rxjs';
import {
  CurrentUser,
  GameLuckySpinItemMessagePattern,
  GameLuckySpinMessagePattern,
  GraphqlJwtAuthGuard,
  LuckySpinMicroserviceConfig,
  MysqlMicroserviceConfig,
  UserMessagePattern,
  JobSeekerMessagePattern,
  GameLuckySpinMatchMessagePattern,
  GameLuckySpinHistoryMessagePattern,
  UserMicroserviceConfig,
  JobseekerMicroserviceConfig,
} from '@jobhopin/core';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import {
  BaseResolver,
  CreateGameLuckySpinInput,
  UpdateGameLuckySpinInput,
  GameLuckySpinQueryInput,
  GameLuckySpinListReponse,
  GameLuckySpin,
} from '@jobhopin/graphql';
import { PlayGameLuckySpinResponse } from './typedefs';
import { PlayGameLuckySpinInput } from './inputs';

const luckySpinMicroserviceConfig = new LuckySpinMicroserviceConfig();
const mysqlMicroserviceConfig = new MysqlMicroserviceConfig();
const userMicroserviceConfig = new UserMicroserviceConfig();
const jobseekerMicroserviceConfig = new JobseekerMicroserviceConfig();

@UseGuards(GraphqlJwtAuthGuard)
@Resolver(() => GameLuckySpin)
export class GameLuckySpinResolver extends BaseResolver<
  CreateGameLuckySpinInput,
  UpdateGameLuckySpinInput,
  GameLuckySpinQueryInput
>({
  viewDto: GameLuckySpin,
  createInput: CreateGameLuckySpinInput,
  updateInput: UpdateGameLuckySpinInput,
  listQueryInput: GameLuckySpinQueryInput,
  listViewDto: GameLuckySpinListReponse,
  name: 'gameLuckySpin',
  pluralName: 'gameLuckySpins',
}) {
  constructor(
    @Inject(luckySpinMicroserviceConfig.name)
    private readonly luckySpinMicroservice: ClientProxy,
    @Inject(mysqlMicroserviceConfig.name)
    private readonly mysqlMicroservice: ClientProxy,
    @Inject(userMicroserviceConfig.name)
    private readonly userMicroservice: ClientProxy,
    @Inject(jobseekerMicroserviceConfig.name)
    private readonly jobseekerMicroservice: ClientProxy,
  ) {
    super(luckySpinMicroservice, GameLuckySpinMessagePattern);
  }

  @ResolveField()
  async luckySpinItems(@Parent() gameLuckySpin: GameLuckySpin) {
    const { items } = (await firstValueFrom(this.baseMicroservice.send(GameLuckySpinItemMessagePattern.LIST, {
      condition: { luckySpinId: gameLuckySpin.sqlId }
    }))) as any
    return items.map(it => ({
      id: it.sqlId,
      name: it.name,
      itemType: it.itemType,
      quantity: it.quantity,
      amount: it.amount,
      itemDescription: it.itemDescription,
      itemData: it.itemData,
      itemImage: it.itemImage,
      numberOfPieces: it.numberOfPieces,
    }))
  }

  @ResolveField()
  async histories(@Parent() gameLuckySpin: GameLuckySpin, @CurrentUser() user) {
    try {
      const userId: string = user.id;
      console.log('userId', userId);

      const userInfo = (await firstValueFrom(this.userMicroservice.send(UserMessagePattern.GET, {
        id: userId
      }))) as any
      console.log('userInfo', userInfo)

      const jobseekerInfo = (await firstValueFrom(this.jobseekerMicroservice.send(JobSeekerMessagePattern.GET_BY_USERNAME, {
        username: userInfo.username
      }))) as any
      console.log('jobseekerInfo', jobseekerInfo)

      const luckySpinMatch = (await firstValueFrom(this.baseMicroservice.send(GameLuckySpinMatchMessagePattern.GET_BY_JOBSEEKER, {
        luckySpinId: gameLuckySpin._id,
        jobseekerId: jobseekerInfo.sqlId
      }))) as any
      console.log('luckySpinMatch', luckySpinMatch)

      const luckySpinHistories = (await firstValueFrom(this.baseMicroservice.send(GameLuckySpinHistoryMessagePattern.LIST, {
        condition: {
          luckySpinMatchId: luckySpinMatch.sqlId,
        },
        pagination: { sortBy: "createdAt", orderBy: "desc", pageSize: 0 }
      }))) as any
      console.log('luckySpinHistories', luckySpinHistories)

      const luckySpinItems = (await firstValueFrom(this.baseMicroservice.send(GameLuckySpinItemMessagePattern.LIST, {
        condition: {
          _id: luckySpinHistories.items.map(it => it.luckySpinItem)
        },
        pagination: { sortBy: "createdAt", orderBy: "desc", pageSize: 0 }
      }))) as any
      console.log('luckySpinItems', luckySpinItems)

      return luckySpinHistories?.items.map(history => {
        const luckySpinItem = luckySpinItems?.items.find(i => i._id === history.luckySpinItem)
        return {
          "id": history.sqlId,
          "name": luckySpinItem.name,
          "itemType": luckySpinItem.itemType,
          "quantity": history.amount,
          "itemDescription": luckySpinItem.itemDescription,
          "itemData": luckySpinItem.itemData,
          "itemImage": luckySpinItem.itemImage,
          "numberOfPieces": luckySpinItem.numberOfPieces,
          "createdAt": history.createdAt
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => PlayGameLuckySpinResponse, { name: 'playLuckySpin' })
  async playLuckySpin(@Args('input') input: PlayGameLuckySpinInput, @CurrentUser() user) {
    try {
      const userId: string = user.id;
      const { luckySpinId } = input;
      return await firstValueFrom(
        this.mysqlMicroservice.send(GameLuckySpinMessagePattern.PLAY, {
          luckySpinId,
          userId,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
