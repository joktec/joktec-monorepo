import { Options } from 'amqplib/properties';

export interface RabbitConsumeOptions extends Options.Consume {
  channelKey?: string;
  autoCommit?: boolean;
  prefetchMessages?: number;
  requeue?: boolean;
}
