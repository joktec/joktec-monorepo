import { Clazz } from '@joktec/core';

export type SubscriberInfoType = { [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[] };

export interface RedcastSubscribeOptions {
  pattern?: boolean;
}

export interface RedcastSubscribeDecoratorOptions extends RedcastSubscribeOptions {
  useEnv?: boolean;
}
