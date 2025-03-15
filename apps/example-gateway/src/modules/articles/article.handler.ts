import { Injectable, LogService, sleep } from '@joktec/core';
import { KafkaConsume, KafkaEachMessage } from '@joktec/kafka';
import { RabbitConsume, RabbitMessage } from '@joktec/rabbit';
import { UserRepo } from '../../repositories';

@Injectable()
export class ArticleHandler {
  constructor(
    private logService: LogService,
    private userRepo: UserRepo,
  ) {
    this.logService.setContext(ArticleHandler.name);
  }

  @KafkaConsume('test_topic', 'joktec')
  async testKafka(msg: KafkaEachMessage) {
    await this.userRepo.find({});
    if (msg.message.value) {
      this.logService.info('Handle message %s from topic %s', msg.message.value.toString(), msg.topic);
    }
    await sleep(1000);
  }

  @RabbitConsume('test_queue', { channelKey: 'joktec', consumerTag: 'joktec' })
  async testRabbit(msg: RabbitMessage) {
    await this.userRepo.find({});
    this.logService.info('Handle message %s from queue', msg.content.toString());
    await sleep(1000);
  }
}
