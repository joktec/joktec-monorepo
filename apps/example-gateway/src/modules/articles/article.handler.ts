import { DEFAULT_CON_ID, Injectable, LogService } from '@joktec/core';
import { KafkaEachMessage } from '@joktec/kafka';
import { RabbitMessage } from '@joktec/rabbit';
import { RedcastConsume } from '@joktec/redcast';
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

  // @KafkaConsume('test_topic', 'joktec', {}, DEFAULT_CON_ID)
  async testKafka(msg: KafkaEachMessage) {
    await this.userRepo.find({});
    await sleep(1000);
  }

  // @RabbitConsume('test_queue', { channelKey: 'joktec', consumerTag: 'joktec' }, DEFAULT_CON_ID)
  async testRabbit(msg: RabbitMessage) {
    await this.userRepo.find({});
    await sleep(1000);
  }

  // @RedcastSubscribe('test_channel', { pattern: false }, DEFAULT_CON_ID)
  async testPubSub(msg: string, channel?: string, pattern?: string) {
    this.logService.info('testPubSub data: %j', { msg, channel, pattern });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RedcastConsume('test_queue', { timeout: 0 }, DEFAULT_CON_ID)
  async testRedisQueue(msg: string, queue?: string) {
    this.logService.info('testRedisQueue data: %j', { msg, queue });
    await this.userRepo.find({});
    await sleep(1000);
  }

  // @RedcastConsumeStream('test_stream_key', { groupId: 'joktec', consumerId: 'joktec', timeout: 0 }, DEFAULT_CON_ID)
  async testRedisStream(msg: string, streamKey?: string) {
    this.logService.info('testRedisStream data: %j', { msg, streamKey });
    await this.userRepo.find({});
    await sleep(1000);
  }
}
