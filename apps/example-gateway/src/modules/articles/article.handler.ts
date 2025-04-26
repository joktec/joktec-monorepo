import { DEFAULT_CON_ID, Injectable, LogService } from '@joktec/core';
import { KafkaConsume, KafkaEachMessage } from '@joktec/kafka';
import { RabbitConsume, RabbitMessage } from '@joktec/rabbit';
import { RedcastConsume, RedcastMessage, RedcastSubscribe } from '@joktec/redcast';
import { SqsConsume, SqsMessage } from '@joktec/sqs';
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

  @KafkaConsume('kafka.topics.testTopic', 'joktec', { useEnv: true }, DEFAULT_CON_ID)
  async testKafka(msg: KafkaEachMessage) {
    this.logService.info('testKafka data: %j', { ...msg, message: msg.message.value.toString() });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RabbitConsume('test_queue', { channelKey: 'joktec', consumerTag: 'joktec' }, DEFAULT_CON_ID)
  async testRabbit(msg: RabbitMessage) {
    this.logService.info('testRabbit data: %j', { ...msg, content: msg.content.toString() });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RedcastSubscribe('test_channel', { pattern: false }, DEFAULT_CON_ID)
  async testPubSub(msg: RedcastMessage) {
    this.logService.info('testPubSub data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RedcastConsume('test_queue', { timeout: 0 }, DEFAULT_CON_ID)
  async testRedisQueue(msg: RedcastMessage) {
    this.logService.info('testRedisQueue data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @RedcastConsume('test_stream_key', { groupId: 'joktec', timeout: 0, mode: 'stream' }, DEFAULT_CON_ID)
  async testRedisStream(msg: RedcastMessage) {
    this.logService.info('testRedisStream data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }

  @SqsConsume('sqs.queues.testQueue', { UseEnv: true }, DEFAULT_CON_ID)
  async testSqs(msg: SqsMessage) {
    this.logService.info('testSqs data: %j', { ...msg });
    await this.userRepo.find({});
    await sleep(1000);
  }
}
