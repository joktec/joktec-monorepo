import { Options } from 'amqplib/properties';

export interface RabbitPublishOptions extends Options.Publish {
  channelKey?: string;
}

export interface RabbitPublishResult {
  success: number;
  failed: number;
  error?: Error;
}
