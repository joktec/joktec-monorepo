import { SNS } from '@aws-sdk/client-sns';
import { Message, SQS } from '@aws-sdk/client-sqs';
import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';
import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable, Retry } from '@joktec/core';
import { sleep, toArray, toBool } from '@joktec/utils';
import { has } from 'lodash';
import {
  SnsPublishOptions,
  SnsPublishResult,
  SQS_AUTO_BINDING,
  SqsAssertOptions,
  SqsAssertTopicOptions,
  SqsAutoBindingRegistry,
  SqsBindingOptions,
  SqsConsumeOptions,
  SqsMessage,
  SqsProduceOptions,
  SqsProduceResult,
} from './models';
import { SqsClient, SqsInstance } from './sqs.client';
import { SqsConfig } from './sqs.config';
import { SqsMetricService, SqsMetricStatus, SqsSendMetric } from './sqs.metric';

const RETRY_OPTS = 'sqs.retry';

@Injectable()
export class SqsService extends AbstractClientService<SqsConfig, SqsInstance> implements SqsClient {
  private readonly INFINITY_LOOP = true;
  private isShuttingDown = false;

  constructor(
    @Inject(SQS_AUTO_BINDING) private autoBindingRegistry: SqsAutoBindingRegistry,
    @Inject() private sqsMetricService: SqsMetricService,
  ) {
    super('sqs', SqsConfig);
    this.setupGracefulShutdown();
  }

  protected async validateConfig(config: SqsConfig): Promise<SqsConfig> {
    if (config.assumeRole) {
      const sts = new STSClient({ region: config.region });
      const command = new AssumeRoleCommand({
        RoleArn: config.assumeRole.roleArn!,
        RoleSessionName: config.assumeRole.roleSessionName || 'AssumeRoleSession',
        DurationSeconds: config.assumeRole.durationSeconds || 3600,
        ExternalId: config.assumeRole.externalId,
      });

      const resp = await sts.send(command);
      config.accessKey = resp.Credentials?.AccessKeyId;
      config.secretKey = resp.Credentials?.SecretAccessKey;
      config.sessionToken = resp.Credentials?.SessionToken;
    }

    return super.validateConfig(config);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: SqsConfig): Promise<SqsInstance> {
    if (config.assumeRole) {
      const sts = new STSClient({ region: config.region });
      const command = new AssumeRoleCommand({
        RoleArn: config.assumeRole.roleArn!,
        RoleSessionName: config.assumeRole.roleSessionName || 'AssumeRoleSession',
        DurationSeconds: config.assumeRole.durationSeconds || 3600,
        ExternalId: config.assumeRole.externalId,
      });

      const resp = await sts.send(command);
      config.accessKey = resp.Credentials?.AccessKeyId;
      config.secretKey = resp.Credentials?.SecretAccessKey;
      config.sessionToken = resp.Credentials?.SessionToken;
    }

    const awsConfig = {
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKey,
        secretAccessKey: config.secretKey,
        sessionToken: config.sessionToken,
      },
      logger: config.debug && config.bindingLogger(this.logService),
    };

    const sqs = new SQS(awsConfig);
    const sns = new SNS(awsConfig);
    this.logService.info('`%s` SQS client initialized for region `%s`', config.conId, config.region);
    return { dispatcher: sqs, broadcaster: sns };
  }

  async start(client: SqsInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    if (has(this.autoBindingRegistry, conId)) {
      const autoBinding = toArray(this.autoBindingRegistry[conId]);
      for (const { queue, topic, opts } of autoBinding) {
        await this.bindQueueToTopic(queue, topic, opts, conId);
      }
    }

    const isPing = this.getConfig(conId).ping;
    isPing && (await client.dispatcher.listQueues());
    isPing && (await client.broadcaster.listTopics());
    this.logService.info('`%s` SQS client connected', conId);
  }

  async stop(client: SqsInstance, conId: string = DEFAULT_CON_ID): Promise<void> {
    this.isShuttingDown = true;
    client.dispatcher.destroy();
    client.broadcaster.destroy();
    this.logService.info('`%s` SQS client disconnected', conId);
  }

  private setupGracefulShutdown(): void {
    process.on('SIGTERM', () => {
      this.isShuttingDown = true;
    });
  }

  async assert(queue: string, options: SqsAssertOptions = {}, conId: string = DEFAULT_CON_ID): Promise<string> {
    const dispatcher = this.getClient(conId).dispatcher;
    try {
      const res = await dispatcher.getQueueUrl({ ...options, QueueName: queue });
      if (res?.QueueUrl) return res.QueueUrl;
      this.logService.warn('`%s` sqs failed to get queue url:', conId, queue);
    } catch (err) {
      this.logService.error(err, '`%s` sqs error to get queue url:', conId, queue);
    }
    return null;
  }

  async assertTopic(
    topic: string,
    options: SqsAssertTopicOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<string> {
    const broadcaster = this.getClient(conId).broadcaster;
    try {
      const res = await broadcaster.createTopic({ ...options, Name: topic });
      if (res?.TopicArn) return res.TopicArn;
      this.logService.warn('`%s` sqs failed to create or get topic:', conId, topic);
    } catch (err) {
      this.logService.error(err, '`%s` sqs error to create or get topic:', conId, topic);
    }
    return null;
  }

  @SqsSendMetric()
  async sendToQueue(
    queue: string,
    messages: string[],
    options: SqsProduceOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<SqsProduceResult[]> {
    const dispatcher = this.getClient(conId).dispatcher;
    const queueUrl = await this.assert(queue, options, conId);
    if (!queueUrl) return [];

    const results: SqsProduceResult[] = [];
    for (const message of messages) {
      const res = await dispatcher.sendMessage({ QueueUrl: queueUrl, MessageBody: message, ...options });
      results.push(res);
    }
    return results;
  }

  @SqsSendMetric()
  async publish(
    topic: string,
    messages: string[],
    options: SnsPublishOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<SnsPublishResult[]> {
    const broadcaster = this.getClient(conId).broadcaster;
    const topicArn = await this.assertTopic(topic, options, conId);
    if (!topicArn) return [];

    const results: SnsPublishResult[] = [];
    for (const message of messages) {
      const res = await broadcaster.publish({ ...options, TopicArn: topicArn, Message: message });
      results.push(res);
    }
    return results;
  }

  async consume(
    queue: string,
    callback: (message: SqsMessage) => Promise<void>,
    options: SqsConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const dispatcher = this.getClient(conId).dispatcher;
    const queueUrl = await this.assert(queue, options, conId);
    const autoCommit = toBool(options.AutoCommit, true);

    const onMessageFn = async (msg: Message): Promise<void> => {
      try {
        this.logService.debug('`%s` [%s] sqs consumed message: %s', conId, queueUrl, msg.Body);
        await callback(msg);
        this.sqsMetricService.receive('consume', SqsMetricStatus.SUCCESS, queueUrl, conId);
        autoCommit && (await dispatcher.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: msg.ReceiptHandle }));
      } catch (error) {
        this.logService.error(error, '`%s` [%s] sqs handle message fail', conId, queueUrl);
        this.sqsMetricService.receive('consume', SqsMetricStatus.ERROR, queueUrl, conId);
      }
    };

    const loop = async () => {
      while (this.INFINITY_LOOP && !this.isShuttingDown) {
        try {
          const res = await dispatcher.receiveMessage({ QueueUrl: queueUrl, ...options });
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

  async bindQueueToTopic(
    topic: string,
    queue: string,
    options: SqsBindingOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<string> {
    const { broadcaster, dispatcher } = this.getClient(conId);
    const [queueUrl, topicArn] = await Promise.all([
      this.assert(queue, options.assert, conId),
      this.assertTopic(topic, options.assertTopic, conId),
    ]);

    const queueAttrs = await dispatcher.getQueueAttributes({ QueueUrl: queueUrl, AttributeNames: ['QueueArn'] });
    const queueArn = queueAttrs?.Attributes?.QueueArn;
    if (!queueArn) {
      this.logService.error('`%s` sqs failed to bind because queue ARN not found: %s', conId, queue);
      return null;
    }

    const subscription = await broadcaster.subscribe({
      TopicArn: topicArn,
      Protocol: 'sqs',
      Endpoint: queueArn,
      ReturnSubscriptionArn: true,
    });
    if (!subscription.SubscriptionArn) {
      this.logService.error('`%s` sqs failed to bind topic [%s] to queue [%s]', conId, topic, queue);
      return null;
    }

    await dispatcher.setQueueAttributes({
      QueueUrl: queueUrl,
      Attributes: {
        Policy: JSON.stringify({
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: '*',
              Action: 'SQS:SendMessage',
              Resource: queueArn,
              Condition: { ArnEquals: { 'aws:SourceArn': topicArn } },
            },
          ],
        }),
      },
    });

    this.logService.info('`%s` sqs bound topic [%s] to queue [%s]', conId, topicArn, queueArn);
    return subscription.SubscriptionArn;
  }
}
