import { Client } from '@joktec/core';
import { ConfirmChannel, Connection } from 'amqplib';
import { RabbitConsumeOptions, RabbitMessage, RabbitPublishOptions } from './models';
import { RabbitConfig } from './rabbit.config';

export interface RabbitClient extends Client<RabbitConfig, Connection> {
  sendToQueue(queue: string, messages: string[], opts?: RabbitPublishOptions, conId?: string): Promise<void>;

  publish(
    exchange: string,
    messages: { key: string; content: string }[],
    opts?: RabbitPublishOptions,
    conId?: string,
  ): Promise<void>;

  consume(
    queue: string,
    callback: (msg: RabbitMessage) => Promise<void>,
    options: RabbitConsumeOptions,
    conId: string,
  ): Promise<void>;
}

export interface RabbitProp {
  channels: { [channelKey: string]: ConfirmChannel };
  hooks: { [channelKey: string]: ((channel: ConfirmChannel) => Promise<void>)[] };
}
