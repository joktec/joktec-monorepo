import { Clazz } from '@joktec/core';

export type SubscriberInfoType = { [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[] };

export type RedcastSubscribeOptions = {
  pattern?: boolean;
};

export type SubscribeCallback = (channel: string, message: string) => Promise<void>;

export type PSubscribeCallback = (pattern: string, channel: string, message: string) => Promise<void>;
