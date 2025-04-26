import { ConfigService, DEFAULT_CON_ID, Injectable, LogService } from '@joktec/core';
import { CronExpression, Crontab } from '@joktec/cron';
import { KafkaSend, KafkaService } from '@joktec/kafka';
import { RabbitExchange, RabbitSend, RabbitService } from '@joktec/rabbit';
import { RedcastPublish, RedcastSend, RedcastService, RedcastStream } from '@joktec/redcast';
import { SqsSend, SqsService } from '@joktec/sqs';
import { generateUUID, rand } from '@joktec/utils';

@Injectable()
export class ArticleHandler {
  constructor(
    private configService: ConfigService,
    private logService: LogService,
    private kafkaService: KafkaService,
    private rabbitService: RabbitService,
    private redcastService: RedcastService,
    private sqsService: SqsService,
  ) {
    this.logService.setContext(ArticleHandler.name);
  }

  @Crontab(CronExpression.EVERY_MINUTE)
  @KafkaSend('test_topic', { record: { producerKey: 'joktec' } }, DEFAULT_CON_ID)
  async sendToKafka() {
    const randNumber = rand(1000, 9999);
    return { success: true, action: 'sendToKafka', randNumber };
  }

  @Crontab(CronExpression.EVERY_MINUTE)
  @RabbitSend('test_queue', { channelKey: 'joktec' }, DEFAULT_CON_ID)
  @RabbitExchange('order_exchange', 'order.new', { channelKey: 'joktec' }, DEFAULT_CON_ID)
  async sendToRabbit() {
    const randNumber = rand(1000, 9999);
    return { success: true, action: 'sendToRabbit', randNumber };
  }

  @Crontab(CronExpression.EVERY_MINUTE)
  @RedcastSend('test_queue', DEFAULT_CON_ID)
  @RedcastPublish('test_channel', DEFAULT_CON_ID)
  @RedcastStream('test_stream_key', DEFAULT_CON_ID)
  async sendToRedis() {
    const randNumber = rand(1000, 9999);
    return { success: true, action: 'sendToRedis', randNumber };
  }

  @Crontab(CronExpression.EVERY_MINUTE)
  @SqsSend('sqs.queues.testQueue', { UseEnv: true }, DEFAULT_CON_ID)
  async sendToSqs() {
    const randNumber = rand(1000, 9999);
    return { success: true, action: 'sendToSqs', randNumber };
  }

  // @Crontab(CronExpression.EVERY_MINUTE)
  async customSendToBroker() {
    const randUuid = generateUUID();
    const result = { success: true, randUuid };
    const message: string = JSON.stringify(result);

    await this.kafkaService.send('test_topic', [message], { record: { producerKey: 'joktec' } }, DEFAULT_CON_ID);
    await this.rabbitService.sendToQueue('test_queue', [message], { channelKey: 'joktec' }, DEFAULT_CON_ID);
    await this.redcastService.publish('test_channel', [message], DEFAULT_CON_ID);

    const sqsQueueName = this.configService.resolveConfigValue('sqs.queues.sendPlan');
    await this.sqsService.send(sqsQueueName, [message], {}, DEFAULT_CON_ID);

    return result;
  }
}
