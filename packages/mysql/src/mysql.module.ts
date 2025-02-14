import { DEFAULT_CON_ID, DynamicModule, Global, Module, toArray } from '@joktec/core';
import { isEmpty } from 'lodash';
import {
  MODEL_REGISTRY_KEY,
  MysqlModelRegistry,
  MysqlModuleOptions,
  MysqlSubscriberRegistry,
  SUBSCRIBER_REGISTRY_KEY,
} from './mysql.client';
import { MysqlService } from './mysql.service';

@Global()
@Module({
  providers: [
    MysqlService,
    { provide: MODEL_REGISTRY_KEY, useValue: { [DEFAULT_CON_ID]: [] } },
    { provide: SUBSCRIBER_REGISTRY_KEY, useValue: { [DEFAULT_CON_ID]: [] } },
  ],
  exports: [MysqlService],
})
export class MysqlModule {
  static forRoot(...opts: MysqlModuleOptions[]): DynamicModule {
    const modelProviders: MysqlModelRegistry = toArray(opts).reduce((curr: object, acc: MysqlModuleOptions) => {
      curr[acc.conId || DEFAULT_CON_ID] = toArray(acc.models);
      return curr;
    }, {});

    const subscriberProviders: MysqlSubscriberRegistry = toArray(opts).reduce(
      (curr: object, acc: MysqlModuleOptions) => {
        curr[acc.conId || DEFAULT_CON_ID] = toArray(acc.subscribers);
        return curr;
      },
      {},
    );

    if (isEmpty(modelProviders)) modelProviders[DEFAULT_CON_ID] = [];
    if (isEmpty(subscriberProviders)) subscriberProviders[DEFAULT_CON_ID] = [];

    return {
      module: MysqlModule,
      providers: [
        MysqlService,
        { provide: MODEL_REGISTRY_KEY, useValue: modelProviders },
        { provide: SUBSCRIBER_REGISTRY_KEY, useValue: subscriberProviders },
      ],
      exports: [MysqlService],
    };
  }
}
