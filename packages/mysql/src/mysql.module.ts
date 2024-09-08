import { DynamicModule, Global, Module } from '@joktec/core';
import { ModelCtor } from 'sequelize-typescript';
import { MysqlService } from './mysql.service';

@Global()
@Module({
  providers: [MysqlService, { provide: 'MODELS', useValue: [] }],
  exports: [MysqlService],
})
export class MysqlModule {
  static forRoot(models: ModelCtor[] = []): DynamicModule {
    return {
      module: MysqlModule,
      providers: [MysqlService, { provide: 'MODELS', useValue: models }],
      exports: [MysqlService],
    };
  }
}
