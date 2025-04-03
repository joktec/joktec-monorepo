import { DEFAULT_CON_ID, Injectable, LogService } from '@joktec/core';
import { CronExpression, Crontab } from '@joktec/cron';
import { KafkaPublish, KafkaService } from '@joktec/kafka';
import { RabbitPublish, RabbitService } from '@joktec/rabbit';
import { RedcastPublish, RedcastService } from '@joktec/redcast';
import { generateUUID, rand } from '@joktec/utils';

@Injectable()
export class ArticleHandler {
  constructor(
    private logService: LogService,
    private kafkaService: KafkaService,
    private rabbitService: RabbitService,
    private redcastService: RedcastService,
  ) {
    this.logService.setContext(ArticleHandler.name);
  }

  @Crontab(CronExpression.EVERY_MINUTE)
  @KafkaPublish('test_topic', 'joktec', {}, DEFAULT_CON_ID)
  @RabbitPublish('test_queue', { channelKey: 'joktec' }, DEFAULT_CON_ID)
  @RabbitPublish('order_exchange', 'order.new', { channelKey: 'joktec' }, DEFAULT_CON_ID)
  @RedcastPublish('test_channel', DEFAULT_CON_ID)
  async sendToBroker() {
    const randNumber = rand(1000, 9999);
    return { success: true, randNumber };
  }

  // @Crontab(CronExpression.EVERY_MINUTE)
  async customSendToBroker() {
    const randUuid = generateUUID();
    const result = { success: true, randUuid };
    const message: string = JSON.stringify(result);

    await this.kafkaService.publish(
      { topic: 'test_topic', producerKey: 'joktec', messages: [{ value: message }], },
      {},
      DEFAULT_CON_ID,
    );
    await this.rabbitService.sendToQueue('test_queue', [message], { channelKey: 'joktec' }, DEFAULT_CON_ID);
    await this.redcastService.publish('test_channel', [message], DEFAULT_CON_ID);

    return result;
  }
}
