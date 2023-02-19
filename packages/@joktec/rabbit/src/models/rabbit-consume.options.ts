import { Options } from 'amqplib/properties';

export interface RabbitConsumeOptions extends Options.Consume {
  consumerTag?: string;
  autoCommit?: boolean;
  prefetchMessages?: number;
  requeue?: boolean;
}
