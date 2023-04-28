import { APP_FILTER, CoreModule, JwtModule, MicroExceptionFilter, Module } from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';
import { ProductModule } from './modules';

@Module({
  imports: [CoreModule, MysqlModule, JwtModule, ProductModule],
  providers: [{ provide: APP_FILTER, useValue: MicroExceptionFilter }],
})
export class AppModule {}
