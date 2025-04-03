import { Clazz } from '@joktec/core';

export type SubscriberInfoType = { [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[] };

export type RedcastSubscribeOptions = {
  pattern?: boolean;
};

export type RedcastSubscribeCallback = (channel: string, message: string) => Promise<void>;

export type RedcastPSubscribeCallback = (pattern: string, channel: string, message: string) => Promise<void>;

export type RedcastConsumeCallback = (queue: string, message: string) => Promise<void>;
