import { CoreModule, Module } from '@joktec/core';
import { MysqlModule } from '@joktec/mysql';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [CoreModule, MysqlModule, ProductModule],
  exports: [],
})
export class AppModule {}
