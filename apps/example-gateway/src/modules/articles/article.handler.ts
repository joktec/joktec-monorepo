import { DEFAULT_CON_ID, Injectable, LogService } from '@joktec/core';
import { KafkaConsume, KafkaEachMessage } from '@joktec/kafka';
import { RabbitConsume, RabbitMessage } from '@joktec/rabbit';
import { RedcastSubscribe } from '@joktec/redcast';
import { sleep } from '@joktec/utils';
import { UserRepo } from '../../repositories';

@Injectable()
export class ArticleHandler {
  constructor(
    private logService: LogService,
    private userRepo: UserRepo,
  ) {
    this.logService.setContext(ArticleHandler.name);
  }

  @KafkaConsume('test_topic', 'joktec', {}, DEFAULT_CON_ID)
  async testKafka(msg: KafkaEachMessage) {
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RabbitConsume('test_queue', { channelKey: 'joktec', consumerTag: 'joktec' }, DEFAULT_CON_ID)
  async testRabbit(msg: RabbitMessage) {
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RedcastSubscribe('test_channel', { pattern: false }, DEFAULT_CON_ID)
  async testPubSub(msg: string) {
    await this.userRepo.find({});
    await sleep(1000);
  }
}
