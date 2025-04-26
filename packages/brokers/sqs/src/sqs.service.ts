import { Message, SQS } from '@aws-sdk/client-sqs';
import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable, Retry } from '@joktec/core';
import { sleep, toBool } from '@joktec/utils';
import { SqsAssertOptions, SqsConsumeOptions, SqsMessage, SqsProduceOptions, SqsProduceResult } from './models';
import { SqsClient } from './sqs.client';
import { SqsConfig } from './sqs.config';
import { SqsMetricService, SqsMetricStatus, SqsSendMetric } from './sqs.metric';

const RETRY_OPTS = 'sqs.retry';

@Injectable()
export class SqsService extends AbstractClientService<SqsConfig, SQS> implements SqsClient {
  private readonly INFINITY_LOOP = true;
  private isShuttingDown = false;

  constructor(@Inject() private sqsMetricService: SqsMetricService) {
    super('sqs', SqsConfig);
    this.setupGracefulShutdown();
  }

  @Retry(RETRY_OPTS)
  protected async init(config: SqsConfig): Promise<SQS> {
    const sqs = new SQS({
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey,
      },
      logger: config.debug && config.bindingLogger(this.logService),
    });
    this.logService.info('`%s` SQS client initialized for region `%s`', config.conId, config.region);
    return sqs;
  }

  async start(client: SQS, conId: string = DEFAULT_CON_ID): Promise<void> {
    try {
      // const res = await client.listQueues({});
      this.logService.info('`%s` SQS client connected', conId);
    } catch (err) {
      this.logService.error(err, '`%s` SQS client connect failed', conId);
      throw err;
    }
  }

  async stop(client: SQS, conId: string = DEFAULT_CON_ID): Promise<void> {
    this.isShuttingDown = true;
    client.destroy();
    this.logService.info('`%s` SQS client disconnected', conId);
  }

  private setupGracefulShutdown(): void {
    process.on('SIGTERM', () => {
      this.isShuttingDown = true;
    });
  }

  async assert(queue: string, options: SqsAssertOptions = {}, conId: string = DEFAULT_CON_ID): Promise<string> {
    const client = this.getClient(conId);
    const queueOutput = await client.getQueueUrl({ QueueName: queue, ...options });
    return queueOutput.QueueUrl;
  }

  @SqsSendMetric()
  async send(
    queue: string,
    messages: string[],
    options: SqsProduceOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<SqsProduceResult[]> {
    const client = this.getClient(conId);
    const queueUrl = await this.assert(queue, options, conId);
    const results: SqsProduceResult[] = [];

    for (const message of messages) {
      const res = await client.sendMessage({ QueueUrl: queueUrl, MessageBody: message, ...options });
      results.push(res);
    }

    this.logService.debug('`%s` sqs sent %d messages to queue [%s]', conId, results.length, queueUrl);
    return results;
  }

  async consume(
    queue: string,
    callback: (message: SqsMessage) => Promise<void>,
    options: SqsConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const client = this.getClient(conId);
    const queueUrl = await this.assert(queue, options, conId);
    const autoCommit = toBool(options.AutoCommit, true);

    const onMessageFn = async (msg: Message): Promise<void> => {
      try {
        this.logService.debug('`%s` [%s] sqs consumed message: %s', conId, queueUrl, msg.Body);
        await callback(msg);
        this.sqsMetricService.receive('consume', SqsMetricStatus.SUCCESS, queueUrl, conId);
        autoCommit && (await client.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: msg.ReceiptHandle }));
      } catch (error) {
        this.logService.error(error, '`%s` [%s] sqs handle message fail', conId, queueUrl);
        this.sqsMetricService.receive('consume', SqsMetricStatus.ERROR, queueUrl, conId);
      }
    };

    const loop = async () => {
      while (this.INFINITY_LOOP && !this.isShuttingDown) {
        try {
          const res = await client.receiveMessage({ QueueUrl: queueUrl, ...options });
          if (res.Messages?.length) {
            for (const msg of res.Messages) {
              if (!msg.Body || !msg.ReceiptHandle) continue;
              await onMessageFn(msg);
            }
          }
        } catch (err) {
          this.logService.error(err, '`%s` sqs failed to receive from queue [%s]', conId, queueUrl);
        } finally {
          await sleep(1000);
        }
      }
    };

    loop().catch(err => this.logService.error(err, '`%s` sqs consumer crashed for queue [%s]', conId, queueUrl));
  }
}
