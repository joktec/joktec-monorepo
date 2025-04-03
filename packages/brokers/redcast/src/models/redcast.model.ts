import { Clazz } from '@joktec/core';

export type SubscriberInfoType = { [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[] };

export type RedcastSubscribeOptions = {
  pattern?: boolean;
};

export type RedcastSubscribeCallback = (channel: string, message: string) => Promise<void>;

export type RedcastPSubscribeCallback = (pattern: string, channel: string, message: string) => Promise<void>;

export type RedcastConsumeCallback = (queue: string, message: string) => Promise<void>;

export interface RedcastConsumeOptions {
  /**
   * Timeout for blocking pop operations (e.g. BRPOP, BRPOPLPUSH).
   * Unit: seconds.
   * @default 0 (block indefinitely)
   */
  timeout?: number;

  /**
   * Enable reliable consumption using RPOPLPUSH.
   * @default false (use BRPOP instead)
   */
  reliable?: boolean;

  ttl?: boolean;
}

export interface RedcastStreamOptions {
  /**
   * Name of the consumer group. Required when using XREADGROUP.
   */
  groupId?: string;

  /**
   * Unique consumer ID within the group.
   */
  consumerId?: string;

  /**
   * Whether to automatically acknowledge (XACK) after processing.
   * @default true
   */
  autoAck?: boolean;

  /**
   * Blocking timeout in milliseconds. Use 0 to block indefinitely.
   * @default 0
   */
  timeout?: number;
}
