import { APP_FILTER, CoreModule, MicroExceptionFilter, Module } from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';
import { ProductModule } from './modules';

@Module({
  imports: [CoreModule, MysqlModule, ProductModule],
  providers: [{ provide: APP_FILTER, useValue: MicroExceptionFilter }],
})
export class AppModule {}
