import { DEFAULT_CON_ID, Injectable, LogService } from '@joktec/core';
import { KafkaConsume, KafkaEachMessage } from '@joktec/kafka';
import { RabbitConsume, RabbitMessage } from '@joktec/rabbit';
import { RedcastConsume, RedcastConsumeStream, RedcastMessagePayload, RedcastSubscribe } from '@joktec/redcast';
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
    this.logService.info('testKafka data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RabbitConsume('test_queue', { channelKey: 'joktec', consumerTag: 'joktec' }, DEFAULT_CON_ID)
  async testRabbit(msg: RabbitMessage) {
    this.logService.info('testRabbit data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RedcastSubscribe('test_channel', { pattern: false }, DEFAULT_CON_ID)
  async testPubSub(msg: RedcastMessagePayload) {
    this.logService.info('testPubSub data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RedcastConsume('test_queue', { timeout: 0 }, DEFAULT_CON_ID)
  async testRedisQueue(msg: RedcastMessagePayload) {
    this.logService.info('testRedisQueue data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RedcastConsumeStream('test_stream_key', { groupId: 'joktec', consumerId: 'joktec', timeout: 0 }, DEFAULT_CON_ID)
  async testRedisStream(msg: RedcastMessagePayload) {
    this.logService.info('testRedisStream data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }
}
