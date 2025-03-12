import { Options } from 'amqplib/properties';

export interface RabbitPublishOptions extends Options.Publish {
  channelKey?: string;
}
