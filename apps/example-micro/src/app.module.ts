import { CoreModule, JwtModule, Module } from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';
import { ProductModule } from './modules';

@Module({
  imports: [CoreModule, MysqlModule, JwtModule, ProductModule],
})
export class AppModule {}
