import { Options } from 'amqplib/properties';

export interface RabbitPublishOptions extends Options.Publish {
  channelKey?: string;
}

export interface RabbitPublishDecoratorOptions extends RabbitPublishOptions {
  useEnv?: boolean | { exchange?: boolean; routingKey: boolean };
}

export interface RabbitPublishResult {
  success: number;
  failed: number;
  error?: Error;
}
