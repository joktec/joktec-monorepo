import { DEFAULT_CON_ID, DynamicModule, Global, Module, toArray } from '@joktec/core';
import { MODEL_REGISTRY_KEY, MysqlModelRegistry, MysqlModuleOptions } from './mysql.client';
import { MysqlService } from './mysql.service';

@Global()
@Module({
  providers: [MysqlService, { provide: MODEL_REGISTRY_KEY, useValue: { [DEFAULT_CON_ID]: [] } }],
  exports: [MysqlService],
})
export class MysqlModule {
  static forRoot(opts?: MysqlModuleOptions | MysqlModuleOptions[]): DynamicModule {
    const providers: MysqlModelRegistry = toArray(opts).reduce((curr: object, acc: MysqlModuleOptions) => {
      curr[acc.conId || DEFAULT_CON_ID] = acc.models;
      return curr;
    }, {});

    return {
      module: MysqlModule,
      providers: [MysqlService, { provide: MODEL_REGISTRY_KEY, useValue: providers }],
      exports: [MysqlService],
    };
  }
}
