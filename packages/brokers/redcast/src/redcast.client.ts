import { Client } from '@joktec/core';
import { Redis } from 'ioredis';
import { PSubscribeCallback, SubscribeCallback } from './models';
import { RedcastConfig } from './redcast.config';

export class Redcast extends Redis {}

export interface RedcastClient extends Client<RedcastConfig, Redcast> {
  publish(channel: string, messages: string[], conId?: string): Promise<number>;

  subscribe(channel: string, callback: SubscribeCallback, conId?: string): Promise<void>;

  unsubscribe(channel: string, conId?: string): Promise<void>;

  pSubscribe(pattern: string, callback: PSubscribeCallback, conId?: string): Promise<void>;

  pUnsubscribe(pattern: string, conId?: string): Promise<void>;

  quit(conId?: string): Promise<void>;

  reset(conId?: string): Promise<void>;
}

export interface RedcastProp {
  publisher: Redcast;
  subscriber: Redcast;
}
