import { DEFAULT_CON_ID, DynamicModule, Global, Module, toArray } from '@joktec/core';
import { MODEL_REGISTRY_KEY, MongoModelRegistry, MongoModuleOptions } from './mongo.client';
import { MongoService } from './mongo.service';

@Global()
@Module({
  imports: [],
  providers: [MongoService, { provide: MODEL_REGISTRY_KEY, useValue: { [DEFAULT_CON_ID]: [] } }],
  exports: [MongoService],
})
export class MongoModule {
  static forRoot(opts: MongoModuleOptions | MongoModuleOptions[]): DynamicModule {
    const providers: MongoModelRegistry = toArray(opts).reduce((curr: object, acc: MongoModuleOptions) => {
      curr[acc.conId || DEFAULT_CON_ID] = acc.models;
      return curr;
    }, {});

    return {
      module: MongoModule,
      providers: [MongoService, { provide: MODEL_REGISTRY_KEY, useValue: providers }],
      exports: [MongoService],
    };
  }
}
