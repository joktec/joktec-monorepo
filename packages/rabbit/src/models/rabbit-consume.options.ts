import { Options } from 'amqplib/properties';

export interface RabbitConsumeOptions extends Options.Consume {
  autoCommit?: boolean;
  prefetchMessages?: number;
  requeue?: boolean;
}
