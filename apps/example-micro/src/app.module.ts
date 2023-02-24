import { CoreModule, Module } from '@joktec/core';
import { MongoModule } from '@joktec/mongo';
import { MysqlModule } from '@joktec/mysql';
import { CategoryModule, ProductModule } from './modules';

@Module({
  imports: [
    // Libs
    CoreModule,
    MysqlModule,
    MongoModule,
    // Modules
    ProductModule,
    CategoryModule,
  ],
})
export class AppModule {}
