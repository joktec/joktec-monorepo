import { Clazz } from '@joktec/core';
import { Options } from 'amqplib/properties';

export type ConsumerInfoType = {
  [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[];
};

export interface RabbitConsumeOptions extends Options.Consume {
  channelKey?: string;
  autoCommit?: boolean;
  prefetchMessages?: number;
  requeue?: boolean;
}
