import { Injectable, LogService, sleep } from '@joktec/core';
import { KafkaConsume, KafkaEachMessage, KafkaService } from '@joktec/kafka';
import { UserRepo } from '../../repositories';

@Injectable()
export class ArticleHandler {
  constructor(
    private logService: LogService,
    private userRepo: UserRepo,
    private kafkaService: KafkaService,
  ) {
    this.logService.setContext(ArticleHandler.name);
  }

  @KafkaConsume('test_topic', 'joktec')
  async testKafka(msg: KafkaEachMessage) {
    await this.userRepo.find({});
    if (msg.message.value) {
      this.logService.info('Handle message %s from topic %s', msg.message.value.toString(), msg.topic);
    } else {
      this.logService.info('Not found message from topic %s', msg.topic);
    }
    await sleep(1000);
  }

  @KafkaConsume('test_topic_2', 'joktec2')
  async testKafka2(msg: KafkaEachMessage) {
    if (msg.message.value) {
      this.logService.info('Handle message %s from topic %s', msg.message.value.toString(), msg.topic);
    } else {
      this.logService.info('Not found message from topic %s', msg.topic);
    }
    await this.kafkaService.publish({ topic: 'test_topic', messages: [{ value: 'Hello my friend' }] });
  }
}
