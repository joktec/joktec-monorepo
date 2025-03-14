import { DEFAULT_CON_ID, generateUUID, Injectable, LogService, rand } from '@joktec/core';
import { Crontab } from '@joktec/cron';
import { KafkaPublish, KafkaService } from '@joktec/kafka';
import { CronExpression } from '@nestjs/schedule';

@Injectable()
export class ArticleHandler {
  constructor(
    private logService: LogService,
    private kafkaService: KafkaService,
  ) {
    this.logService.setContext(ArticleHandler.name);
  }

  @Crontab(CronExpression.EVERY_MINUTE)
  @KafkaPublish('test_topic', 'joktec', {}, DEFAULT_CON_ID)
  async sendToBroker() {
    const randNumber = rand(1000, 9999);
    return { success: true, randNumber };
  }

  @Crontab(CronExpression.EVERY_MINUTE)
  async customSendToBroker() {
    const randUuid = generateUUID();
    const result = { success: true, randUuid };
    await this.kafkaService.publish({
      topic: 'test_topic',
      producerKey: 'joktec',
      messages: [{ value: JSON.stringify(result) }],
    });
    return result;
  }
}
