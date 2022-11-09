import { BaseService } from '../../service/base.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GameLuckySpin } from './entities/game-lucky-spin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, IsNull, In } from 'typeorm';
import {
  ActionsTurnValue,
  ACTION_PLAY,
  GameTurnLogActions,
  LuckySpinItemTypes,
  QUIZZ_STATUS_FINISHED,
  QUIZZ_TYPE_TIMER,
  TURN_ACTION_PLAY_LUCKY_SPIN,
} from '../../contstants';
import * as moment from 'moment';
import { intToUuid, ListQuery, uuidToInt } from '@jobhopin/core';
import { GameLuckySpinItemService } from './../game-lucky-spin-item/game-lucky-spin-item.service';
import { GameLuckySpinMatchService } from '../game-lucky-spin-match/game-lucky-spin-match.service';
import { GameLuckySpinHistoryService } from '../game-lucky-spin-history/game-lucky-spin-history.service';
import { JobseekerService } from '../jobseeker/jobseeker.service';
import { GameScoreTurnLogService } from '../game-score-turn-log/game-score-turn-log.service';
import { QuizzService } from '../quizz/quizz.service';


@Injectable()
export class GameLuckySpinService extends BaseService<GameLuckySpin> {
  constructor(
    @InjectRepository(GameLuckySpin)
    private gameLuckySpinRepository: Repository<GameLuckySpin>,
    @Inject(forwardRef(() => GameLuckySpinItemService))
    private gameLuckySpinItemService: GameLuckySpinItemService,
    @Inject(forwardRef(() => GameLuckySpinMatchService))
    private gameLuckySpinMatchService: GameLuckySpinMatchService,
    @Inject(forwardRef(() => GameLuckySpinHistoryService))
    private gameLuckySpinHistoryService: GameLuckySpinHistoryService,
    @Inject(forwardRef(() => JobseekerService))
    private jobseekerService: JobseekerService,
    @Inject(forwardRef(() => GameScoreTurnLogService))
    private gameScoreTurnLogService: GameScoreTurnLogService,
    @Inject(forwardRef(() => QuizzService))
    private quizzService: QuizzService,
  ) {
    super(gameLuckySpinRepository);
  }

  async play({ luckySpinId, userId }) {
    console.log(luckySpinId, userId)
    // check jobseeker info
    const jobseekerInfo = await this.jobseekerService.getByUserId(userId);
    const jobseekerId = jobseekerInfo.jobseekerId;

    const gameLuckySpin = await this.findById(luckySpinId);
    const gameLuckySpinItems = await this.gameLuckySpinItemService.findBy({ luckySpinId });
    let ratioItemData = [];
    let quoteObj = null;
    let randomItem = null;
    let remainingAmountItem = {};
    let itemDict = {}
    let currentTotalPlayed = 0;
    gameLuckySpinItems.forEach(item => {
      itemDict[item.id] = item;
      ratioItemData.push(...Array(Math.round(item.ratio * 100)).fill(item.id));
      remainingAmountItem[item.id] = item.amount;
      if (item.itemType === LuckySpinItemTypes.QUOTE) {
        quoteObj = item;
      }
    });
    console.log('quoteObj', quoteObj)
    randomItem = ratioItemData[Math.floor(ratioItemData.length * Math.random())];

    let gameStatObj = await this.gameScoreTurnLogService.getOrCreateWithInitTurn({ jobseekerId, userId });
    if (gameStatObj.remainingTurn <= 0) {
      throw new Error('You do not have enough turn')
    }
    console.log('gameScoreTurnLog', gameStatObj)

    // lucky spin match
    const luckySpinMatch = await this.gameLuckySpinMatchService.getOrCreateWithInitTurn({ jobseekerId, luckySpinId })
    console.log('luckySpinMatch', luckySpinMatch);

    // lucky spin history
    let luckySpinHistories = [];
    if (luckySpinMatch) {
      luckySpinHistories = await this.gameLuckySpinHistoryService.findBy({ luckySpinItemId: In(gameLuckySpinItems.map(it => it.id)) })
    }
    console.log('luckySpinHistories', luckySpinHistories);

    luckySpinHistories.forEach(history => {
      const itemId = history.luckySpinItemId;
      let currentAmount = remainingAmountItem[itemId]
      currentAmount = currentAmount - history.amount;
      if (currentAmount < 0) {
        currentAmount = 0;
      }
      remainingAmountItem[itemId] = currentAmount;
      if (history.luckySpinMatchId === luckySpinMatch.id) {
        currentTotalPlayed += 1;
      }
    })

    const remainingItemAmount = remainingAmountItem[randomItem];
    let randomQuote = null;
    let item = itemDict[randomItem];
    let saveHistory = true;
    if (!item) {
      throw new Error('Invalid lucky spin');
    }
    // nếu số lượng ko đủ hoặc (có cấu hình whitelistToWin nhưng ko nằm trong list whitelistToWin) thì mặc định sẽ quay trúng Quote
    // amount = 0 ~ infinite amount
    console.log(`check quantity: remainingItemAmount: ${remainingItemAmount} < quantity: ${item.quantity}`)
    if ((item.amount != 0 && remainingItemAmount < item.quantity) ||
      (gameLuckySpin.whitelistToWin && !(gameLuckySpin.whitelistToWin || "").split(';').map(v => v.trim()).filter(v => v).includes(jobseekerInfo.username))) {
      item = quoteObj;
      console.log('Default Quote')
    }
    if (item.itemType === LuckySpinItemTypes.QUOTE) {
      const quoteOptions = item.itemDescription.split(';').map(v => v.trim()).filter(v => v);
      randomQuote = quoteOptions[Math.floor(quoteOptions.length * Math.random())];
    }
    if (gameLuckySpin.maximumTurnPerUser && gameLuckySpin.maximumTurnPerUser <= currentTotalPlayed) {
      item = quoteObj;
      randomQuote = gameLuckySpin.runOfTurnMessage;
      item.itemDescription = randomQuote;
      saveHistory = false
    }
    // create lucky spin history
    let metaData: any = {
      "item_type": item.itemType,
      "name": item.name,
      "quantity": item.quantity,
      "amount": item.mount,
      "ratio": item.Ratio,
      "item_data": item.itemData,
      "item_description": item.itemDescription
    }
    if (randomQuote) metaData.selected_quote = randomQuote;
    let history = null;
    if (saveHistory) {
      history = await this.gameLuckySpinHistoryService.create({
        createdAt: new Date(),
        updatedAt: new Date(),
        amount: item.quantity,
        itemMetaData: JSON.stringify(metaData),
        luckySpinItemId: item.id,
        luckySpinMatchId: luckySpinMatch.id
      })
      console.log('history', history)
    }

    // -1 turn for action PLAY_LUCKY_SPIN
    this.quizzService.handleGameTopUp({
      jobseekerId,
      action: GameTurnLogActions.TURN_ACTION_PLAY_LUCKY_SPIN,
      turn: ActionsTurnValue["TURN_ACTION_PLAY_LUCKY_SPIN"],
      extraData: JSON.stringify({
        lucky_spin_match_id: luckySpinMatch.id
      }),
      hiddenTopUp: true
    })

    if (item.itemType === LuckySpinItemTypes.ADDITIONAL_TURN) {
      this.quizzService.handleGameTopUp({
        jobseekerId,
        action: GameTurnLogActions.TURN_ACTION_PLAY_LUCKY_SPIN_AWARD_TURN,
        turn: history.amount,
        extraData: JSON.stringify({
          lucky_spin_match_id: luckySpinMatch.id,
          lucky_spin_history_id: history.id
        }),
        hiddenTopUp: true
      })
    }

    console.log('luckySpinInfo', {
      gameLuckySpin,
      ratioItemData,
      randomItem,
      remainingAmountItem,
      itemDict,
      currentTotalPlayed
    })

    return {
      "id": item.id,
      "name": item.name,
      "itemType": item.itemType,
      "quantity": item.quantity,
      "itemDescription": item.itemDescription,
      "itemData": item.itemData,
      "itemImage": item.itemImage,
      "numberOfPieces": item.numberOfPieces
    }
  }
}
