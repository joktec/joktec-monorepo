import { CoreModule, Module } from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';
import { ProductModule } from './modules';

@Module({
  imports: [CoreModule, MysqlModule, ProductModule],
})
export class AppModule {}
