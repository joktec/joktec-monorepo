import amqp, { Options } from 'amqplib';

export interface RabbitBaseOptions {
  channelKey?: string;
}

export interface RabbitRejectOptions {
  channelKey?: string;
  requeue?: boolean;
}

export interface RabbitAssertOptions extends Options.AssertQueue {
  channelKey?: string;
}

export type RabbitAssertQueue = amqp.Replies.AssertQueue;

export enum RabbitExchangeType {
  DIRECT = 'direct',
  TOPIC = 'topic',
  HEADERS = 'headers',
  FANOUT = 'fanout',
  MATCH = 'match',
}

export interface RabbitAssertExchangeOptions extends Options.AssertExchange {
  channelKey?: string;
}

export interface RabbitBindingOptions {
  channelKey?: string;
  queueOptions?: RabbitAssertOptions;
  exchangeOptions?: RabbitAssertExchangeOptions;
}

export type RabbitAssertExchange = amqp.Replies.AssertExchange;

export type RabbitPurgeQueue = amqp.Replies.PurgeQueue;

export type RabbitEmpty = amqp.Replies.Empty;
